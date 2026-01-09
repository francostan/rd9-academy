## Complete Backend Implementation Guide (Vercel + AI SDK)

---

### 1. Shared Types (`/lib/types/document.ts`)

```typescript
export type SectionType =
  | 'title'
  | 'heading'
  | 'subheading'
  | 'paragraph'
  | 'numbered-list'
  | 'bullet-list'
  | 'clause'
  | 'signature-block'
  | 'date-location';

export interface SectionStyle {
  bold?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  alignment?: 'left' | 'center' | 'right' | 'justify';
}

export interface DocumentSection {
  id: string;
  type: SectionType;
  content: string;
  level?: number;
  number?: string;
  style?: SectionStyle;
  children?: DocumentSection[];
}

export interface DocumentMetadata {
  court?: string;
  caseNumber?: string;
  jurisdiction?: string;
  clientName?: string;
  createdAt: string;
  version: number;
}

export interface StructuredDocument {
  title: string;
  documentType: string;
  sections: DocumentSection[];
  metadata: DocumentMetadata;
}
```

---

### 2. Updated `saveDraftSection` Tool (`/lib/tools/saveDraftSection.ts`)

```typescript
import { tool } from 'ai';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// Recursive schema for sections with children
const sectionStyleSchema = z.object({
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  uppercase: z.boolean().optional(),
  alignment: z.enum(['left', 'center', 'right', 'justify']).optional(),
}).optional();

const baseSectionSchema = z.object({
  id: z.string().describe('Unique section identifier'),
  type: z.enum([
    'title',
    'heading',
    'subheading',
    'paragraph',
    'numbered-list',
    'bullet-list',
    'clause',
    'signature-block',
    'date-location'
  ]).describe('Section type'),
  content: z.string().describe('Text content of the section'),
  level: z.number().min(1).max(3).optional().describe('Heading level (1-3)'),
  number: z.string().optional().describe('Clause number (PRIMERA, SEGUNDA, 1.1, etc.)'),
  style: sectionStyleSchema,
});

// Use lazy for recursive children
const sectionSchema: z.ZodType = baseSectionSchema.extend({
  children: z.lazy(() => z.array(sectionSchema)).optional(),
});

const metadataSchema = z.object({
  court: z.string().optional().describe('Court/Juzgado name'),
  caseNumber: z.string().optional().describe('Case number/expediente'),
  jurisdiction: z.string().optional().describe('Jurisdiction'),
  clientName: z.string().optional().describe('Client name'),
});

export const saveDraftSection = tool({
  description: `Save a structured legal document to the database. Use this tool after generating document content.

IMPORTANT: Always generate complete documents with proper structure:
- Start with 'title' section (centered, uppercase)
- Use 'heading' for major sections (level 1-3)
- Use 'clause' with 'number' field for numbered clauses (PRIMERA, SEGUNDA, etc.)
- Use 'paragraph' for body text
- End with 'signature-block' if needed`,

  parameters: z.object({
    documentId: z.string().describe('The document ID to update'),
    title: z.string().describe('Document title'),
    documentType: z.string().describe('Document type: demanda, amparo, contrato, contestacion, recurso, escrito'),
    sections: z.array(sectionSchema).describe('Array of document sections'),
    metadata: metadataSchema.optional().describe('Document metadata'),
  }),

  execute: async ({ documentId, title, documentType, sections, metadata }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Build structured document object
    const structuredDoc = {
      title,
      documentType,
      sections,
      metadata: {
        ...metadata,
        createdAt: new Date().toISOString(),
        version: 1,
      },
    };

    // Generate plain text for backward compatibility and search
    const plainTextContent = generatePlainText(sections);

    const { error } = await supabase
      .from('documents')
      .update({
        title,
        sections: structuredDoc,      // Structured JSON in jsonb column
        content: plainTextContent,     // Plain text fallback
        updated_at: new Date().toISOString(),
      })
      .eq('id', documentId);

    if (error) {
      console.error('Error saving document:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }

    return { 
      success: true, 
      message: `Documento "${title}" guardado con ${sections.length} secciones`,
      documentId,
      sectionCount: sections.length,
    };
  },
});

// Helper function to convert structured sections to plain text
function generatePlainText(sections: any[]): string {
  return sections.map(section => {
    let text = '';

    switch (section.type) {
      case 'title':
        text = section.content.toUpperCase();
        break;
      case 'heading':
        text = `\n${section.content}\n`;
        break;
      case 'clause':
        text = section.number 
          ? `${section.number}.- ${section.content}`
          : section.content;
        break;
      case 'signature-block':
        text = `\n________________________\n${section.content}`;
        break;
      case 'date-location':
        text = section.content;
        break;
      default:
        text = section.content;
    }

    // Process children if any
    if (section.children?.length) {
      text += '\n' + generatePlainText(section.children);
    }

    return text;
  }).join('\n\n');
}
```

---

### 3. Agent System Prompt (`/lib/prompts/documentDrafting.ts`)

```typescript
export const DOCUMENT_DRAFTING_SYSTEM_PROMPT = `
Eres un asistente legal especializado en derecho mexicano. Tu función es ayudar a redactar documentos legales profesionales de alta calidad.

## REGLAS DE GENERACIÓN DE DOCUMENTOS

Cuando generes documentos legales, SIEMPRE usa la herramienta \`saveDraftSection\` con formato JSON estructurado.

### Tipos de Sección Disponibles:

| Tipo | Uso | Campos Especiales |
|------|-----|-------------------|
| \`title\` | Título del documento (centrado, mayúsculas) | - |
| \`heading\` | Secciones principales | \`level\`: 1, 2 o 3 |
| \`subheading\` | Subsecciones menores | - |
| \`clause\` | Cláusulas numeradas | \`number\`: "PRIMERA", "1.1" |
| \`paragraph\` | Texto de cuerpo | - |
| \`numbered-list\` | Lista numerada | Ítems separados por \\n |
| \`bullet-list\` | Lista con viñetas | Ítems separados por \\n |
| \`signature-block\` | Bloque de firma | - |
| \`date-location\` | Lugar y fecha | - |

### Estructura Estándar por Tipo de Documento:

#### DEMANDA:
1. date-location: "Ciudad, a [fecha]"
2. title: "DEMANDA DE [TIPO]"
3. heading (level 1): "C. JUEZ DE [MATERIA] EN TURNO"
4. paragraph: Proemio con datos del actor
5. heading (level 1): "PRESTACIONES"
6. numbered-list o clauses
7. heading (level 1): "HECHOS"
8. clauses numeradas (PRIMERO, SEGUNDO...)
9. heading (level 1): "DERECHO"
10. paragraphs con fundamentos
11. heading (level 1): "PRUEBAS"
12. bullet-list
13. heading (level 1): "PUNTOS PETITORIOS"
14. numbered-list
15. signature-block

#### AMPARO:
1. date-location
2. title: "DEMANDA DE AMPARO INDIRECTO"
3. heading: "C. JUEZ DE DISTRITO EN TURNO"
4. paragraph: Datos del quejoso
5. heading: "I. AUTORIDAD RESPONSABLE"
6. heading: "II. ACTO RECLAMADO"
7. heading: "III. ANTECEDENTES"
8. clauses numeradas
9. heading: "IV. CONCEPTOS DE VIOLACIÓN"
10. clauses numeradas
11. heading: "V. SUSPENSIÓN DEL ACTO"
12. signature-block

#### CONTRATO:
1. title: "CONTRATO DE [TIPO]"
2. paragraph: Declaraciones
3. heading: "DECLARACIONES"
4. clauses (I, II, III para cada parte)
5. heading: "CLÁUSULAS"
6. clauses numeradas (PRIMERA, SEGUNDA...)
7. signature-blocks (uno por parte)

### Ejemplo de Estructura JSON:

\`\`\`json
{
  "documentId": "uuid-del-documento",
  "title": "DEMANDA DE AMPARO INDIRECTO",
  "documentType": "amparo",
  "sections": [
    {
      "id": "1",
      "type": "date-location",
      "content": "Ciudad de México, a 6 de enero de 2026"
    },
    {
      "id": "2", 
      "type": "title",
      "content": "DEMANDA DE AMPARO INDIRECTO"
    },
    {
      "id": "3",
      "type": "heading",
      "content": "C. JUEZ DE DISTRITO EN MATERIA ADMINISTRATIVA EN TURNO",
      "level": 1
    },
    {
      "id": "4",
      "type": "paragraph",
      "content": "JUAN PÉREZ GARCÍA, mexicano, mayor de edad, señalando como domicilio para oír y recibir notificaciones el ubicado en Calle Ejemplo 123, Colonia Centro, Alcaldía Cuauhtémoc, C.P. 06000, Ciudad de México, ante usted con el debido respeto comparezco para exponer:"
    },
    {
      "id": "5",
      "type": "heading",
      "content": "I. AUTORIDAD RESPONSABLE",
      "level": 1
    },
    {
      "id": "6",
      "type": "paragraph",
      "content": "Señalo como autoridad responsable al Secretario de Hacienda y Crédito Público."
    },
    {
      "id": "7",
      "type": "heading", 
      "content": "II. ACTO RECLAMADO",
      "level": 1
    },
    {
      "id": "8",
      "type": "clause",
      "number": "PRIMERA",
      "content": "Reclamo la resolución de fecha 15 de diciembre de 2025, mediante la cual se determinó un crédito fiscal en mi contra por la cantidad de $500,000.00 (quinientos mil pesos 00/100 M.N.)."
    },
    {
      "id": "9",
      "type": "clause",
      "number": "SEGUNDA",
      "content": "Reclamo la orden de embargo sobre mis cuentas bancarias derivada de la resolución antes mencionada."
    },
    {
      "id": "10",
      "type": "heading",
      "content": "III. CONCEPTOS DE VIOLACIÓN",
      "level": 1
    },
    {
      "id": "11",
      "type": "clause",
      "number": "PRIMERO",
      "content": "La autoridad responsable viola en mi perjuicio los artículos 14 y 16 de la Constitución Política de los Estados Unidos Mexicanos, en virtud de que..."
    },
    {
      "id": "12",
      "type": "signature-block",
      "content": "JUAN PÉREZ GARCÍA"
    }
  ],
  "metadata": {
    "court": "Juzgado de Distrito en Materia Administrativa",
    "jurisdiction": "Ciudad de México",
    "clientName": "Juan Pérez García"
  }
}
\`\`\`

### Reglas Importantes:

1. **IDs únicos**: Cada sección debe tener un ID único (puede ser numérico secuencial)
2. **Cláusulas numeradas**: Usa formato mexicano: PRIMERA, SEGUNDA, TERCERA... o PRIMERO, SEGUNDO, TERCERO... según contexto
3. **Encabezados jerárquicos**: Usa level 1 para secciones principales, level 2 para subsecciones
4. **Texto formal**: Mantén lenguaje jurídico formal y preciso
5. **Estructura completa**: Incluye todas las secciones necesarias según el tipo de documento
6. **Datos del caso**: Integra la información del caso y cliente disponible

### Flujo de Trabajo:

1. Cuando el usuario pida generar un documento:
   - Usa \`getCaseDetails\` para obtener información del caso
   - Usa \`getClientDetails\` para obtener datos del cliente
   - Usa \`searchTemplates\` para encontrar plantillas relevantes
   - Usa \`createDocument\` si no existe el documento
   - Genera el contenido estructurado
   - Usa \`saveDraftSection\` para guardar

2. El usuario puede pedir modificaciones:
   - Usa \`getDocumentContent\` para ver el contenido actual
   - Modifica las secciones necesarias
   - Guarda con \`saveDraftSection\`

Responde siempre en español y mantén un tono profesional y servicial.
`;
```

---

### 4. Updated Agent Configuration (`/lib/agent.ts`)

```typescript
import { streamText, tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { DOCUMENT_DRAFTING_SYSTEM_PROMPT } from './prompts/documentDrafting';

// Import all tools
import { getCaseDetails } from './tools/getCaseDetails';
import { getClientDetails } from './tools/getClientDetails';
import { searchTemplates } from './tools/searchTemplates';
import { getTemplateContent } from './tools/getTemplateContent';
import { createDocument } from './tools/createDocument';
import { saveDraftSection } from './tools/saveDraftSection';
import { getDocumentContent } from './tools/getDocumentContent';
import { listCaseDocuments } from './tools/listCaseDocuments';

// Initialize model (use your preferred provider)
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runDraftingAgent(
  messages: any[],
  caseId: string,
  onChunk: (chunk: any) => void
) {
  const result = await streamText({
    model: openai('gpt-4o'), // or your preferred model
    system: DOCUMENT_DRAFTING_SYSTEM_PROMPT,
    messages,
    tools: {
      getCaseDetails,
      getClientDetails,
      searchTemplates,
      getTemplateContent,
      createDocument,
      saveDraftSection,
      getDocumentContent,
      listCaseDocuments,
    },
    maxSteps: 10, // Allow multi-step tool calling
    onChunk,
  });

  return result;
}
```

---

### 5. API Route (`/api/chat/route.ts`)

```typescript
import { runDraftingAgent } from '@/lib/agent';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { messages, caseId } = await request.json();

    // Get auth token from header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create readable stream for SSE
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const result = await runDraftingAgent(
            messages,
            caseId,
            (chunk) => {
              // Stream each chunk as SSE
              const data = JSON.stringify(chunk) + '\n';
              controller.enqueue(encoder.encode(`data: ${data}\n`));
            }
          );

          // Signal completion
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Agent error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

---

### 6. Environment Variables Required

```env
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://mqkuwhzxwqxiheyzbqoa.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

### File Structure Summary

```
/api
  └── chat
      └── route.ts          # Main API endpoint
/lib
  ├── agent.ts              # Agent configuration
  ├── prompts
  │   └── documentDrafting.ts  # System prompt
  ├── tools
  │   ├── getCaseDetails.ts
  │   ├── getClientDetails.ts
  │   ├── searchTemplates.ts
  │   ├── getTemplateContent.ts
  │   ├── createDocument.ts
  │   ├── saveDraftSection.ts  # ← UPDATED
  │   ├── getDocumentContent.ts
  │   └── listCaseDocuments.ts
  └── types
      └── document.ts       # Shared TypeScript interfaces
```

---

This gives your backend everything needed for structured document generation with the AI SDK!

Add Sample Templates to DB
