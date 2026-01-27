import { C } from './colors';

/**
 * RD-9 Academy Curriculum
 * 16 levels across 5 chapters
 * Bilingual: ES (primary) / EN
 */
export const LEVELS = [
  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER I: FUNDAMENTOS (Foundations)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 1,
    n: 'I',
    title: { es: 'PULSO', en: 'PULSE' },
    sub: { es: 'Antes de la máquina', en: 'Before the machine' },
    color: C.orange,
    intro: {
      es: `El ritmo precede al lenguaje. El corazón late antes de que el cerebro piense.
La danza existe antes de que existan instrumentos.
La TR-909 no inventó nada—recordó algo antiguo.`,
      en: `Rhythm precedes language. The heart beats before the brain thinks.
Dance exists before instruments exist.
The TR-909 invented nothing—it remembered something ancient.`,
    },
    exercises: [
      {
        id: 'pulse',
        title: { es: 'EL PULSO', en: 'THE PULSE' },
        text: {
          es: `Tu corazón: 60-80 latidos por minuto. Un compás de 4/4 a 120 BPM equivale a dos latidos por tiempo. El techno no es artificial—es fisiológico.

Cierra los ojos. Siente tu pulso. Cuenta hasta cuatro. Eso es todo.
Todo lo demás es ornamento sobre este fundamento.`,
          en: `Your heart: 60-80 beats per minute. A 4/4 bar at 120 BPM equals two heartbeats per beat. Techno isn't artificial—it's physiological.

Close your eyes. Feel your pulse. Count to four. That's all.
Everything else is ornament on this foundation.`,
        },
        tech: [
          {
            es: 'Conecta auriculares al jack PHONES (panel frontal, extremo derecho) → Sin auriculares o monitores conectados, no escucharás nada',
            en: 'Connect headphones to PHONES jack (front panel, far right) → Without headphones or monitors connected, you won\'t hear anything'
          },
          {
            es: 'Gira MASTER y PHONES a las 12:00 (knobs grandes en el centro del panel) → Controlan el volumen general. Empieza bajo para proteger tus oídos, sube gradualmente',
            en: 'Turn MASTER and PHONES to 12:00 (large knobs in center panel) → Control overall volume. Start low to protect your ears, increase gradually'
          },
          {
            es: 'Ajusta el tempo: pulsa TAP/HOLD varias veces al ritmo deseado, o gira el encoder principal → El display LED rojo muestra el BPM actual (rango: 60-200)',
            en: 'Set tempo: tap TAP/HOLD repeatedly at desired rhythm, or turn main encoder → Red LED display shows current BPM (range: 60-200)'
          },
          {
            es: 'Pulsa PLAY (botón grande verde, centro-derecha del panel) → El LED de PLAY se enciende. El secuenciador avanza pero aún no hay sonido (no hay pattern programado)',
            en: 'Press PLAY (large green button, center-right of panel) → PLAY LED lights up. Sequencer advances but no sound yet (no pattern programmed)'
          },
        ],
        type: 'theory',
        check: (s) => s.pulse,
      },
      {
        id: 'voices',
        title: { es: '11 VOCES', en: '11 VOICES' },
        text: {
          es: `El cuerpo primitivo tenía tres percusiones: golpe de pecho, palmas, pies contra tierra. La RD-9 expande este vocabulario:

BD = el peso, el ancla. CP = el gesto, la respuesta.
CH/OH = el aliento, la continuidad. Toms = el movimiento, la narrativa.
Cymbals = el metal, el brillo. RS = el chasquido, la punctuación.

Once voces. Un vocabulario completo para decir lo que las palabras no pueden.`,
          en: `The primitive body had three percussions: chest thump, claps, feet against earth. The RD-9 expands this vocabulary:

BD = the weight, the anchor. CP = the gesture, the response.
CH/OH = the breath, the continuity. Toms = movement, narrative.
Cymbals = the metal, the brightness. RS = the snap, the punctuation.

Eleven voices. A complete vocabulary to say what words cannot.`,
        },
        tech: [
          {
            es: 'Localiza la zona de instrumentos (fila superior del panel, 11 secciones con nombres: BD, SD, LT, MT, HT, RS, CP, CH, OH, CR, RD) → Cada sección tiene su propio color y controles dedicados',
            en: 'Locate the instrument zone (top row of panel, 11 sections with names: BD, SD, LT, MT, HT, RS, CP, CH, OH, CR, RD) → Each section has its own color and dedicated controls'
          },
          {
            es: 'Pulsa el botón de selección de cualquier instrumento (botón pequeño debajo del nombre) → El LED del instrumento se enciende indicando que está seleccionado',
            en: 'Press the selection button of any instrument (small button below the name) → The instrument LED lights up indicating it\'s selected'
          },
          {
            es: 'Pulsa TRIGGER (botón rojo, zona izquierda del panel) → Dispara el sonido del instrumento seleccionado. Escucha su timbre único',
            en: 'Press TRIGGER (red button, left zone of panel) → Fires the selected instrument\'s sound. Listen to its unique timbre'
          },
          {
            es: 'Recorre los 11 instrumentos uno por uno, disparando cada uno con TRIGGER → Familiarízate con la paleta sonora completa: BD (bombo), SD (caja), LT/MT/HT (toms), RS (rimshot), CP (clap), CH/OH (hi-hats), CR (crash), RD (ride)',
            en: 'Go through all 11 instruments one by one, triggering each with TRIGGER → Familiarize yourself with the complete sound palette: BD (bass drum), SD (snare), LT/MT/HT (toms), RS (rimshot), CP (clap), CH/OH (hi-hats), CR (crash), RD (ride)'
          },
        ],
        type: 'explore',
        check: (s) => s.voices >= 11,
      },
    ],
  },
  {
    id: 2,
    n: 'II',
    title: { es: 'ANATOMÍA', en: 'ANATOMY' },
    sub: { es: 'Cada knob, una decisión', en: 'Every knob, a decision' },
    color: C.orangeLight,
    intro: {
      es: `El instrumento es extensión del cuerpo. Cada knob es una pregunta:
¿más largo o más corto? ¿más brillante o más oscuro? ¿más aquí o más allá?

No memorices parámetros—desarrolla intuición.
Cuando DECAY se vuelva parte de tu vocabulario, no necesitarás recordar qué hace.`,
      en: `The instrument is an extension of the body. Each knob is a question:
longer or shorter? brighter or darker? more here or more there?

Don't memorize parameters—develop intuition.
When DECAY becomes part of your vocabulary, you won't need to remember what it does.`,
    },
    exercises: [
      {
        id: 'bd',
        title: { es: 'BASS DRUM', en: 'BASS DRUM' },
        text: {
          es: `El kick es el corazón del track. Seis controles para darle forma:

TUNE: ¿grave como un golpe de pecho, o medio como un tambor?
ATTACK: ¿aparece suave, o entra con un click que corta?
DECAY: ¿desaparece rápido, o resuena en el espacio?

En modo Enhanced—tres controles más:
PITCH: la frecuencia base del oscilador.
P.DEPTH: cuánto cae el tono al golpear.
Este "barrido" descendente es el sonido 909 clásico.

Dos filosofías:
Berlin: TUNE bajo, ATTACK alto, DECAY largo. Sub que sientes en el pecho.
House: TUNE medio, ATTACK suave, DECAY resonante. Groove que respira.`,
          en: `The kick is the heart of the track. Six controls to shape it:

TUNE: deep like a chest thump, or mid like a drum?
ATTACK: appears soft, or enters with a cutting click?
DECAY: disappears quickly, or resonates in space?

In Enhanced mode—three more controls:
PITCH: the oscillator's base frequency.
P.DEPTH: how much the tone drops on hit.
This descending "sweep" is the classic 909 sound.

Two philosophies:
Berlin: low TUNE, high ATTACK, long DECAY. Sub you feel in your chest.
House: mid TUNE, soft ATTACK, resonant DECAY. Groove that breathes.`,
        },
        tech: [
          {
            es: 'Selecciona BD (botón bajo "BASS DRUM", extremo izquierdo del panel de instrumentos) → El LED se enciende. Ahora todos los knobs de esa sección controlan el bombo',
            en: 'Select BD (button under "BASS DRUM", far left of instrument panel) → LED lights up. Now all knobs in that section control the bass drum'
          },
          {
            es: 'Gira TUNE (primer knob de BD) mientras disparas con TRIGGER → Bajo (30-50): sub profundo que sientes en el pecho. Alto (60-80): más pegada y definición, menos sub',
            en: 'Turn TUNE (first BD knob) while triggering with TRIGGER → Low (30-50): deep sub you feel in chest. High (60-80): more punch and definition, less sub'
          },
          {
            es: 'Gira ATTACK (segundo knob) → Bajo: el sonido aparece suave. Alto: añade un "click" transiente al inicio, el bombo corta mejor en la mezcla',
            en: 'Turn ATTACK (second knob) → Low: sound appears soft. High: adds a transient "click" at start, kick cuts better in mix'
          },
          {
            es: 'Gira DECAY (tercer knob) → Bajo (20-40): bombo corto, seco, industrial. Alto (60-80): cola resonante que llena el espacio',
            en: 'Turn DECAY (third knob) → Low (20-40): short, dry, industrial kick. High (60-80): resonant tail that fills space'
          },
          {
            es: 'Para acceder a PITCH y P.DEPTH: SETTINGS (botón arriba del encoder) → gira encoder hasta PREFS → ENTER → Enhanced Mode ON → Ahora BD tiene 6 parámetros en vez de 3',
            en: 'To access PITCH and P.DEPTH: SETTINGS (button above encoder) → turn encoder to PREFS → ENTER → Enhanced Mode ON → Now BD has 6 parameters instead of 3'
          },
          {
            es: 'En Enhanced Mode, gira P.DEPTH mientras disparas → Controla cuánto "baja" el tono al golpear. Este barrido descendente es EL sonido clásico 909',
            en: 'In Enhanced Mode, turn P.DEPTH while triggering → Controls how much the pitch "drops" on hit. This descending sweep IS the classic 909 sound'
          },
        ],
        presets: [
          { name: 'Berlin', v: 'TUNE 45 / ATK 70 / DEC 60 / P.DEPTH 80' },
          { name: 'House', v: 'TUNE 60 / ATK 50 / DEC 75 / P.DEPTH 60' },
        ],
        type: 'knobs',
        target: 'BD',
        check: (s) => {
          // Check if we match roughly either Berlin or House presets or general exploration
          const tune = s.knobValues?.BD_TUNE ?? 50;
          const atk = s.knobValues?.BD_ATTACK ?? 50;
          const dec = s.knobValues?.BD_DECAY ?? 50;
          const pdepth = s.knobValues?.['BD_P.DEPTH'] ?? 0;
          
          // Enhanced mode check
          const enhanced = s.knobValues?.['BD_P.DEPTH'] > 0;

          if (!s.bd) return { pass: false, message: { es: "Interactúa con los controles primero.", en: "Interact with the controls first." } };
          
          // Allow passing if they've explored the ranges significantly
          // Berlin: TUNE < 50, ATK > 60, DEC > 50
          const isBerlin = tune < 55 && atk > 60 && dec > 50;
          // House: TUNE > 55, ATK < 60, DEC > 60
          const isHouse = tune > 55 && atk < 60 && dec > 60;
          
          if (isBerlin || isHouse) return { pass: true };
          
          return { 
            pass: false, 
            message: { 
              es: "Intenta esculpir un sonido definido. \nPara Berlin: Tune bajo, Attack alto, Decay largo. \nPara House: Tune medio, Attack suave, Decay largo.", 
              en: "Try sculpting a defined sound. \nFor Berlin: Low Tune, High Attack, Long Decay. \nFor House: Mid Tune, Soft Attack, Long Decay." 
            } 
          };
        },
      },
      {
        id: 'sd',
        title: { es: 'SNARE DRUM', en: 'SNARE DRUM' },
        text: {
          es: `La caja es la voz del track. Cuatro controles:

TUNE: la afinación fundamental del cuerpo.
TONE: el balance entre lo tonal (cuerpo de madera) y el ruido (aire, sibilancia).
SNAPPY: la intensidad de la bordonera—los alambres que vibran debajo.

TONE alto + SNAPPY alto = crack (house, garage).
TONE bajo + SNAPPY bajo = tonal, seco (minimal, dub techno).

El snare dice más sobre tu intención que cualquier otro elemento.`,
          en: `The snare is the voice of the track. Four controls:

TUNE: the fundamental pitch of the body.
TONE: the balance between tonal (wood body) and noise (air, sibilance).
SNAPPY: the intensity of the snare wires—the wires vibrating underneath.

High TONE + high SNAPPY = crack (house, garage).
Low TONE + low SNAPPY = tonal, dry (minimal, dub techno).

The snare says more about your intention than any other element.`,
        },
        tech: [
          {
            es: 'Selecciona SD (botón bajo "SNARE DRUM", segunda sección desde la izquierda) → El LED se enciende. Los knobs de esa sección ahora controlan la caja',
            en: 'Select SD (button under "SNARE DRUM", second section from left) → LED lights up. Knobs in that section now control the snare'
          },
          {
            es: 'Gira TUNE mientras disparas con TRIGGER → Controla la afinación fundamental del cuerpo del tambor. Más bajo = más gordo, más alto = más tenso',
            en: 'Turn TUNE while triggering → Controls fundamental pitch of the drum body. Lower = fatter, higher = tighter'
          },
          {
            es: 'Gira TONE → Bajo: sonido tonal, cuerpo de madera dominante. Alto: más ruido/aire, más sibilancia y brillo',
            en: 'Turn TONE → Low: tonal sound, wood body dominant. High: more noise/air, more sibilance and brightness'
          },
          {
            es: 'Gira SNAPPY → Controla la intensidad de la bordonera (los alambres que vibran debajo del parche). Bajo: seco, tonal. Alto: ese "crack" característico del house y garage',
            en: 'Turn SNAPPY → Controls snare wire intensity (wires vibrating under the head). Low: dry, tonal. High: that characteristic house and garage "crack"'
          },
          {
            es: 'Prueba la combinación house: TONE 70 + SNAPPY 75 → Escucha el crack brillante. Luego minimal: TONE 30 + SNAPPY 25 → Escucha cómo se vuelve seco y tonal',
            en: 'Try house combo: TONE 70 + SNAPPY 75 → Hear the bright crack. Then minimal: TONE 30 + SNAPPY 25 → Hear how it becomes dry and tonal'
          },
        ],
        type: 'knobs',
        target: 'SD',
        check: (s) => {
          if (!s.sd) return { pass: false, message: { es: "Ajusta los controles de la caja (Snare).", en: "Adjust the Snare Drum controls." } };

          const tone = s.knobValues?.SD_TONE ?? 50;
          const snappy = s.knobValues?.SD_SNAPPY ?? 50;
          
          // Check for "House" (High Tone/Snappy) or "Minimal" (Low Tone/Snappy) settings
          const isHouse = tone > 60 && snappy > 60;
          const isMinimal = tone < 40 && snappy < 40;
          
          if (isHouse || isMinimal) return { pass: true };

          return { 
            pass: false, 
            message: { 
              es: "Intenta un extremo: 'House' (Tone y Snappy altos) o 'Minimal' (ambos bajos).", 
              en: "Try an extreme: 'House' (high Tone & Snappy) or 'Minimal' (both low)." 
            } 
          };
        },
      },
      {
        id: 'hh',
        title: { es: 'HI-HAT', en: 'HI-HAT' },
        text: {
          es: `Los hi-hats son las únicas voces digitales de la RD-9—samples, no síntesis.
Cerrado y abierto comparten la misma fuente. Son respiración: inhalar, exhalar.

CH = el pulso constante, el tic-tac, el paso.
OH = el suspiro, la apertura, el espacio entre pasos.

Comportamiento real de platillos: Open interrumpe Closed automáticamente.
Cuando programes ambos en el mismo step, solo suena Open.

CH DECAY bajo (20-30) = metálico, preciso, industrial.
OH DECAY alto (70+) = cola larga, reverberación implícita.`,
          en: `The hi-hats are the RD-9's only digital voices—samples, not synthesis.
Closed and open share the same source. They are breath: inhale, exhale.

CH = the constant pulse, the tick-tock, the step.
OH = the sigh, the opening, the space between steps.

Real cymbal behavior: Open automatically interrupts Closed.
When you program both on the same step, only Open sounds.

Low CH DECAY (20-30) = metallic, precise, industrial.
High OH DECAY (70+) = long tail, implied reverb.`,
        },
        tech: [
          {
            es: 'Selecciona CH (botón bajo "CLOSED HAT", zona derecha del panel) → El LED se enciende. Dispara con TRIGGER para escuchar el hi-hat cerrado',
            en: 'Select CH (button under "CLOSED HAT", right zone of panel) → LED lights up. Trigger to hear closed hi-hat'
          },
          {
            es: 'Gira CH DECAY mientras disparas → Bajo (20-30): click metálico corto y preciso, ideal para techno industrial. Alto (50+): más sustain, más "shhh"',
            en: 'Turn CH DECAY while triggering → Low (20-30): short precise metallic click, ideal for industrial techno. High (50+): more sustain, more "shhh"'
          },
          {
            es: 'Ahora selecciona OH (botón bajo "OPEN HAT", justo al lado de CH) → Dispara con TRIGGER. Escucha cómo el sonido es más largo y abierto',
            en: 'Now select OH (button under "OPEN HAT", right next to CH) → Trigger. Hear how the sound is longer and open'
          },
          {
            es: 'Gira OH DECAY → Bajo: open hat corto. Alto (70+): cola larga que crea reverberación implícita, el suspiro entre pasos',
            en: 'Turn OH DECAY → Low: short open hat. High (70+): long tail that creates implied reverb, the sigh between steps'
          },
          {
            es: 'Comportamiento real de platillos: programa OH y CH en el mismo step (en un pattern) → Solo suena OH. El Open interrumpe al Closed automáticamente, como platillos reales',
            en: 'Real cymbal behavior: program OH and CH on same step (in a pattern) → Only OH sounds. Open interrupts Closed automatically, like real cymbals'
          },
        ],
        type: 'knobs',
        target: 'CH',
        knobs: [
          { voice: 'CH', param: 'DECAY', label: 'CH DECAY' },
          { voice: 'OH', param: 'DECAY', label: 'OH DECAY' },
        ],
        check: (s) => {
          if (!s.hh) return { pass: false, message: { es: "Explora los hi-hats Cerrado (CH) y Abierto (OH).", en: "Explore both Closed (CH) and Open (OH) hi-hats." } };

          const chDecay = s.knobValues?.CH_DECAY ?? 50;
          const ohDecay = s.knobValues?.OH_DECAY ?? 50;

          // Require contrast: Short CH and Long OH
          if (chDecay < 40 && ohDecay > 60) return { pass: true };

          return {
            pass: false,
            message: {
              es: "Busca contraste: CH corto (bajo Decay) para el ritmo, OH largo (alto Decay) para el aire.",
              en: "Seek contrast: Short CH (low Decay) for rhythm, Long OH (high Decay) for air."
            }
          };
        },
      },
    ],
  },
  {
    id: 3,
    n: 'III',
    title: { es: 'VARIACIÓN', en: 'VARIATION' },
    sub: { es: 'Más allá de la repetición', en: 'Beyond repetition' },
    color: C.orange,
    intro: {
      es: `La repetición perfecta es artificial. El corazón no late exacto.
La respiración varía. El paso humano fluctúa.

El groove vive en la imperfección controlada.
La RD-9 tiene herramientas para añadir humanidad a la máquina.`,
      en: `Perfect repetition is artificial. The heart doesn't beat exactly.
Breathing varies. The human step fluctuates.

Groove lives in controlled imperfection.
The RD-9 has tools to add humanity to the machine.`,
    },
    exercises: [
      {
        id: 'flam',
        title: { es: 'FLAM', en: 'FLAM' },
        text: {
          es: `Dos baquetas golpean casi al mismo tiempo. El "casi" es el groove.

El flam simula este efecto. Un doble golpe con separación ajustable.
Rango 0-24: cuanto más alto, más ancho el flam.

Úsalo con moderación—un poco de flam añade vida.
Demasiado flam suena descuidado.`,
          en: `Two sticks hit almost at the same time. The "almost" is the groove.

Flam simulates this effect. A double hit with adjustable separation.
Range 0-24: the higher, the wider the flam.

Use sparingly—a little flam adds life.
Too much flam sounds sloppy.`,
        },
        tech: [
          {
            es: 'Pulsa SETTINGS (botón arriba del encoder principal) → Gira el encoder hasta ver "FLAM" en el display (posición 10) → Pulsa ENTER',
            en: 'Press SETTINGS (button above main encoder) → Turn encoder until you see "FLAM" on display (position 10) → Press ENTER'
          },
          {
            es: 'Ahora estás en modo FLAM. Selecciona un instrumento (ej: SD) → Los pads 1-16 muestran qué steps tienen flam activo (LED encendido = flam)',
            en: 'Now you\'re in FLAM mode. Select an instrument (e.g., SD) → Pads 1-16 show which steps have flam active (LED on = flam)'
          },
          {
            es: 'Pulsa los pads de los steps donde quieras flam (ej: 5 y 13 para el backbeat) → El LED del pad se enciende confirmando el flam',
            en: 'Press pads of steps where you want flam (e.g., 5 and 13 for backbeat) → Pad LED lights up confirming flam'
          },
          {
            es: 'Gira el knob DATA para ajustar el ancho del flam (0-24) → 0 = casi imperceptible. 12 = doble golpe claro. 24 = muy separado, casi como dos hits distintos',
            en: 'Turn DATA knob to adjust flam width (0-24) → 0 = barely perceptible. 12 = clear double hit. 24 = very separated, almost like two distinct hits'
          },
          {
            es: 'El flam es GLOBAL por instrumento: todos los steps marcados usan el mismo valor. Pulsa SETTINGS de nuevo para salir del modo FLAM',
            en: 'Flam is GLOBAL per instrument: all marked steps use the same value. Press SETTINGS again to exit FLAM mode'
          },
        ],
        type: 'theory',
        check: (s) => s.flam,
      },
      {
        id: 'prob',
        title: { es: 'PROBABILITY', en: 'PROBABILITY' },
        text: {
          es: `Cada step puede tener un porcentaje de probabilidad.
100% = siempre suena. 50% = moneda al aire. 0% = nunca.

La probabilidad añade variación orgánica.
Un hi-hat a 70% suena más humano que uno a 100%.
Un rimshot a 30% aparece como sorpresa ocasional.

El patrón nunca suena exactamente igual dos veces.`,
          en: `Each step can have a probability percentage.
100% = always sounds. 50% = coin flip. 0% = never.

Probability adds organic variation.
A hi-hat at 70% sounds more human than one at 100%.
A rimshot at 30% appears as an occasional surprise.

The pattern never sounds exactly the same twice.`,
        },
        tech: [
          {
            es: 'Pulsa SETTINGS → Gira encoder hasta "PROB" (posición 9) → Pulsa ENTER → Ahora estás en modo Probabilidad',
            en: 'Press SETTINGS → Turn encoder to "PROB" (position 9) → Press ENTER → Now you\'re in Probability mode'
          },
          {
            es: 'Selecciona un instrumento (ej: CH para hi-hats) → Los pads 1-16 representan los steps del pattern',
            en: 'Select an instrument (e.g., CH for hi-hats) → Pads 1-16 represent pattern steps'
          },
          {
            es: 'Pulsa un pad que YA tenga un step programado → El display muestra su probabilidad actual (por defecto 100%)',
            en: 'Press a pad that ALREADY has a step programmed → Display shows its current probability (default 100%)'
          },
          {
            es: 'Con el pad seleccionado, gira DATA knob → Ajusta 0-100%. Ejemplo: 70% significa que 7 de cada 10 veces ese step suena',
            en: 'With pad selected, turn DATA knob → Adjust 0-100%. Example: 70% means 7 out of 10 times that step sounds'
          },
          {
            es: 'Tip creativo: pon todos los CH en 16ths pero con probabilidades variadas (100, 80, 60, 80, 100...) → El hi-hat suena "humano", impredecible pero musical',
            en: 'Creative tip: put all CH on 16ths but with varied probabilities (100, 80, 60, 80, 100...) → Hi-hat sounds "human", unpredictable but musical'
          },
          {
            es: 'La probabilidad se guarda por pattern. Pulsa SETTINGS para salir del modo PROB',
            en: 'Probability is saved per pattern. Press SETTINGS to exit PROB mode'
          },
        ],
        type: 'theory',
        check: (s) => s.prob,
      },
      {
        id: 'poly',
        title: { es: 'POLYMETER', en: 'POLYMETER' },
        text: {
          es: `Polymeter: diferentes longitudes por voz.
BD en 16 steps. CH en 15. CP en 13.

El patrón evoluciona. Nunca repite exactamente igual.
Las voces se desfasan, creando nuevas combinaciones.
Después de muchos compases, vuelven a alinearse.

Técnica avanzada de las raíces africanas—múltiples ciclos superpuestos.`,
          en: `Polymeter: different lengths per voice.
BD at 16 steps. CH at 15. CP at 13.

The pattern evolves. Never repeats exactly the same.
Voices phase out, creating new combinations.
After many bars, they realign.

Advanced technique from African roots—multiple overlapping cycles.`,
        },
        tech: [
          {
            es: 'Pulsa SETTINGS → Gira encoder hasta "POLY" (posición 7) → Pulsa ENTER → Modo Polymeter activado',
            en: 'Press SETTINGS → Turn encoder to "POLY" (position 7) → Press ENTER → Polymeter mode activated'
          },
          {
            es: 'Selecciona un instrumento (ej: BD) → El display muestra la longitud actual de ese instrumento (por defecto = longitud del pattern, ej: 16)',
            en: 'Select an instrument (e.g., BD) → Display shows current length of that instrument (default = pattern length, e.g., 16)'
          },
          {
            es: 'Gira DATA knob para cambiar la longitud de SOLO ese instrumento (1-64) → Cada voz puede tener longitud diferente',
            en: 'Turn DATA knob to change length of ONLY that instrument (1-64) → Each voice can have different length'
          },
          {
            es: 'Ejemplo clásico: BD=16 (normal), CH=15 (un step menos), CP=13 (tres menos) → Las voces se desfasan gradualmente, creando nuevas combinaciones en cada repetición',
            en: 'Classic example: BD=16 (normal), CH=15 (one step less), CP=13 (three less) → Voices gradually phase, creating new combinations each repetition'
          },
          {
            es: 'Escucha: después de 16 repeticiones del BD, el pattern vuelve a alinearse completamente. Mientras tanto, cada vuelta suena diferente',
            en: 'Listen: after 16 BD repetitions, pattern realigns completely. Meanwhile, each cycle sounds different'
          },
          {
            es: 'NOTA: Step Repeat (repetición de step) no funciona cuando Polymeter está activo. Usa uno u otro',
            en: 'NOTE: Step Repeat doesn\'t work when Polymeter is active. Use one or the other'
          },
        ],
        type: 'theory',
        check: (s) => s.poly,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER II: TÉCNICA (Technique)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 4,
    n: 'IV',
    title: { es: 'PRIMER BEAT', en: 'FIRST BEAT' },
    sub: { es: 'Four-on-the-floor', en: 'Four-on-the-floor' },
    color: C.green,
    intro: {
      es: `Tu primer pattern no necesita ser complejo—necesita ser honesto.

Cuatro kicks. Un clap. Un hi-hat. El ADN del dance.
Millones de tracks construidos sobre esta base.
La simplicidad no es limitación—es fundamento.`,
      en: `Your first pattern doesn't need to be complex—it needs to be honest.

Four kicks. One clap. One hi-hat. The DNA of dance.
Millions of tracks built on this foundation.
Simplicity isn't limitation—it's foundation.`,
    },
    exercises: [
      {
        id: 'four',
        title: { es: 'FOUR-ON-THE-FLOOR', en: 'FOUR-ON-THE-FLOOR' },
        text: {
          es: `Cuatro kicks. Steps 1, 5, 9, 13 = los downbeats.
El corazón del house, techno, disco, trance.

No es aburrido—es fundamental.
Como respirar. Como caminar.`,
          en: `Four kicks. Steps 1, 5, 9, 13 = the downbeats.
The heart of house, techno, disco, trance.

It's not boring—it's fundamental.
Like breathing. Like walking.`,
        },
        tech: [
          {
            es: 'Asegúrate de estar en modo PATTERN (no SONG). Si no, pulsa PATTERN (botón en zona izquierda) → LED de PATTERN se enciende',
            en: 'Make sure you\'re in PATTERN mode (not SONG). If not, press PATTERN (button in left zone) → PATTERN LED lights up'
          },
          {
            es: 'Verifica LENGTH = 16: pulsa LENGTH → display muestra longitud actual → gira DATA hasta 16 si es diferente → pulsa LENGTH para confirmar',
            en: 'Verify LENGTH = 16: press LENGTH → display shows current length → turn DATA to 16 if different → press LENGTH to confirm'
          },
          {
            es: 'Selecciona BD (botón bajo BASS DRUM) → LED se enciende. Ahora los pads 1-16 programan el bombo',
            en: 'Select BD (button under BASS DRUM) → LED lights up. Now pads 1-16 program the bass drum'
          },
          {
            es: 'Pulsa pads 1, 5, 9 y 13 → Cada pad se enciende confirmando el step. Estos son los 4 downbeats del compás 4/4',
            en: 'Press pads 1, 5, 9 and 13 → Each pad lights up confirming step. These are the 4 downbeats of 4/4 bar'
          },
          {
            es: 'Pulsa PLAY → El secuenciador avanza. Los 4 LEDs de los steps parpadean al pasar. Escucha: kick-kick-kick-kick, el pulso fundamental',
            en: 'Press PLAY → Sequencer advances. The 4 step LEDs blink as they pass. Listen: kick-kick-kick-kick, the fundamental pulse'
          },
        ],
        type: 'pattern',
        target: { BD: [0, 4, 8, 12] },
        inst: ['BD', 'CP'],
        check: (s) => {
          const bd = s.p?.BD || [];
          const missing = [0, 4, 8, 12].filter(x => !bd.includes(x));
          
          if (missing.length === 0) return { pass: true };
          
          if (missing.length === 4) return { pass: false, message: { es: "El patrón está vacío. Marca los pasos 1, 5, 9 y 13.", en: "The pattern is empty. Mark steps 1, 5, 9, and 13." } };
          
          return { 
            pass: false, 
            message: { 
              es: `Faltan golpes en los steps: ${missing.map(m => m + 1).join(', ')}.`, 
              en: `Missing hits on steps: ${missing.map(m => m + 1).join(', ')}.` 
            } 
          };
        },
      },
      {
        id: 'back',
        title: { es: 'BACKBEAT', en: 'BACKBEAT' },
        text: {
          es: `El clap responde. Steps 5 y 13.
Llamada (kick) y respuesta (clap).

Este diálogo es el ADN del dance music.
Del gospel al disco al house. Siempre presente.`,
          en: `The clap responds. Steps 5 and 13.
Call (kick) and response (clap).

This dialogue is the DNA of dance music.
From gospel to disco to house. Always present.`,
        },
        tech: [
          {
            es: 'Con el pattern de BD ya sonando (four-on-the-floor), selecciona CP (botón bajo CLAP, zona central del panel) → LED se enciende',
            en: 'With BD pattern already playing (four-on-the-floor), select CP (button under CLAP, center zone) → LED lights up'
          },
          {
            es: 'Pulsa pads 5 y 13 → Estos son los beats 2 y 4 del compás, el "backbeat". El clap responde al kick',
            en: 'Press pads 5 and 13 → These are beats 2 and 4 of the bar, the "backbeat". The clap responds to kick'
          },
          {
            es: 'Escucha el diálogo: kick (1) - CLAP (5) - kick (9) - CLAP (13). Llamada y respuesta, el ADN del dance music',
            en: 'Listen to the dialogue: kick (1) - CLAP (5) - kick (9) - CLAP (13). Call and response, the DNA of dance music'
          },
          {
            es: 'Ajusta el volumen relativo: gira el knob LEVEL de CP (primer knob de la sección CP) → Encuentra el balance con el kick',
            en: 'Adjust relative volume: turn CP LEVEL knob (first knob of CP section) → Find the balance with kick'
          },
        ],
        type: 'pattern',
        target: { BD: [0, 4, 8, 12], CP: [4, 12] },
        inst: ['BD', 'CP'],
        check: (s) => {
          const bd = s.p?.BD || [];
          const cp = s.p?.CP || [];
          
          // Check if Kicks are still there (don't break the foundation)
          const missingKicks = [0, 4, 8, 12].filter(x => !bd.includes(x));
          if (missingKicks.length > 0) return { pass: false, message: { es: "¡Has perdido el bombo! Mantén los kicks en 1, 5, 9, 13.", en: "You lost the kick! Keep kicks on 1, 5, 9, 13." } };

          // Check Claps
          const missingClaps = [4, 12].filter(x => !cp.includes(x));
          if (missingClaps.length === 0) return { pass: true };

          return { 
            pass: false, 
            message: { 
              es: "El 'Backbeat' responde al kick. Coloca CLAPS en los steps 5 y 13.", 
              en: "The 'Backbeat' responds to the kick. Place CLAPS on steps 5 and 13." 
            } 
          };
        },
      },
      {
        id: 'acc',
        title: { es: 'ACENTOS', en: 'ACCENTS' },
        text: {
          es: `Sin acentos = máquina. Con acentos = humano.
El groove vive en las diferencias de volumen.

Presiona un step dos veces = accent (LED sólido).
TAP/HOLD + step = accent global ajustable.

Acentúa los downbeats (1, 9) para peso.
Deja los offbeats más suaves para movimiento.`,
          en: `Without accents = machine. With accents = human.
Groove lives in volume differences.

Press a step twice = accent (solid LED).
TAP/HOLD + step = adjustable global accent.

Accent the downbeats (1, 9) for weight.
Leave offbeats softer for movement.`,
        },
        tech: [
          {
            es: 'Con tu pattern sonando, selecciona BD → Pulsa el pad 1 DOS VECES rápido → El LED pasa de parpadear a estar FIJO. Esto indica ACCENT',
            en: 'With your pattern playing, select BD → Press pad 1 TWICE quickly → LED goes from blinking to SOLID. This indicates ACCENT'
          },
          {
            es: 'Haz lo mismo con el pad 9 (segundo downbeat fuerte) → Ahora los beats 1 y 9 tienen accent. Escucha: son más fuertes que 5 y 13',
            en: 'Do the same with pad 9 (second strong downbeat) → Now beats 1 and 9 have accent. Listen: they\'re louder than 5 and 13'
          },
          {
            es: 'Ajusta la intensidad del accent: localiza el knob ACCENT (zona master, cerca de MASTER volume) → Gira para controlar cuánto más fuerte suenan los pasos acentuados',
            en: 'Adjust accent intensity: locate ACCENT knob (master zone, near MASTER volume) → Turn to control how much louder accented steps are'
          },
          {
            es: 'Método alternativo: mantén TAP/HOLD + pulsa un step → Añade accent a ese step. Útil para añadir accents rápidamente mientras el pattern suena',
            en: 'Alternative method: hold TAP/HOLD + press a step → Adds accent to that step. Useful for quickly adding accents while pattern plays'
          },
          {
            es: 'Para quitar accent: pulsa el pad dos veces de nuevo → El LED vuelve a parpadear (step sin accent)',
            en: 'To remove accent: press pad twice again → LED returns to blinking (step without accent)'
          },
        ],
        type: 'pattern',
        target: { BD: [0, 4, 8, 12], CP: [4, 12] },
        inst: ['BD', 'CP'],
        check: (s) => s.acc,
      },
    ],
  },
  {
    id: 5,
    n: 'V',
    title: { es: 'MOVIMIENTO', en: 'MOVEMENT' },
    sub: { es: 'Hi-hats', en: 'Hi-hats' },
    color: '#48cae4',
    intro: {
      es: `Los hi-hats son el sistema nervioso del track.

El kick es el corazón. El clap es el gesto.
Pero los hi-hats son lo que hace que el cuerpo se mueva.
Sin ellos, el ritmo existe. Con ellos, el ritmo vive.`,
      en: `Hi-hats are the track's nervous system.

The kick is the heart. The clap is the gesture.
But hi-hats are what makes the body move.
Without them, rhythm exists. With them, rhythm lives.`,
    },
    exercises: [
      {
        id: 'h8',
        title: { es: 'OCTAVOS', en: 'EIGHTHS' },
        text: {
          es: `Escucha el objetivo ("OÍR META").
House clásico. 8 golpes por compás.
El hi-hat es corto, pero no seco. Tiene aire.

Tu misión:
1. Replica el patrón rítmico.
2. Ajusta el DECAY del Closed Hat (CH) hasta que coincida con la referencia.`,
          en: `Listen to the goal ("HEAR GOAL").
Classic House. 8 hits per bar.
The hi-hat is short, but not dry. It has air.

Your mission:
1. Replicate the rhythmic pattern.
2. Adjust the Closed Hat (CH) DECAY until it matches the reference.`,
        },
        targetPreview: {
          voice: 'CH',
          params: { decay: 30, tune: 50 },
          pattern: [0, 2, 4, 6, 8, 10, 12, 14]
        },
        tech: [
          {
            es: 'Usa el botón "OÍR META" para escuchar la referencia las veces que necesites',
            en: 'Use the "HEAR GOAL" button to listen to the reference as many times as needed'
          },
          {
            es: 'Selecciona CH → Marca los pads para crear el ritmo de octavos (1, 3, 5...)',
            en: 'Select CH → Mark pads to create the eighth-note rhythm (1, 3, 5...)'
          },
          {
            es: 'Gira CH DECAY mientras comparas con la referencia. ¿Demasiado largo ("shhh")? ¿Demasiado corto (click)?',
            en: 'Turn CH DECAY while comparing with reference. Too long ("shhh")? Too short (click)?'
          },
        ],
        type: 'pattern',
        target: { CH: [0, 2, 4, 6, 8, 10, 12, 14] },
        inst: ['BD', 'CP', 'CH', 'OH'],
        knobs: [
          { voice: 'CH', param: 'DECAY', label: 'CH DECAY' },
        ],
        check: (s) => {
          const ch = s.p?.CH || [];
          // Pattern check
          const hasPattern = [0, 2, 4, 6, 8, 10, 12, 14].every(x => ch.includes(x));
          if (!hasPattern) return { pass: false, message: { es: "El patrón rítmico no coincide. Escucha: son octavos constantes.", en: "Rhythmic pattern doesn't match. Listen: it's constant eighths." } };

          // Knob check
          const decay = s.knobValues?.CH_DECAY ?? 50;
          if (decay > 40) return { pass: false, message: { es: "El hi-hat es demasiado largo. Necesita ser más corto y preciso.", en: "Hi-hat is too long. Needs to be shorter and precise." } };
          if (decay < 20) return { pass: false, message: { es: "Demasiado seco. Dale un poco de aire.", en: "Too dry. Give it a little air." } };

          return { pass: true };
        },
      },
      {
        id: 'h16',
        title: { es: 'DIECISEISAVOS', en: 'SIXTEENTHS' },
        text: {
          es: `Cada step. Techno driving.

16 hi-hats constantes. Sin espacio. Sin respiro.
La línea de montaje. El pulso industrial.
CH DECAY muy bajo (20) = metálico, preciso.`,
          en: `Every step. Driving techno.

16 constant hi-hats. No space. No breath.
The assembly line. The industrial pulse.
CH DECAY very low (20) = metallic, precise.`,
        },
        tech: [
          {
            es: 'Borra el pattern de CH anterior: mantén CLEAR + pulsa el botón de CH → Todos los hi-hats se borran',
            en: 'Clear previous CH pattern: hold CLEAR + press CH button → All hi-hats are erased'
          },
          {
            es: 'Selecciona CH → Pulsa TODOS los pads del 1 al 16 → 16 hi-hats constantes, un muro de sonido',
            en: 'Select CH → Press ALL pads from 1 to 16 → 16 constant hi-hats, a wall of sound'
          },
          {
            es: 'Baja CH DECAY a 20 o menos → El hi-hat se vuelve un click metálico, preciso, industrial. Sin cola, sin aire',
            en: 'Lower CH DECAY to 20 or less → Hi-hat becomes a metallic click, precise, industrial. No tail, no air'
          },
          {
            es: 'Escucha: este es el pulso del techno driving. La línea de montaje. Sin espacio para respirar',
            en: 'Listen: this is the driving techno pulse. The assembly line. No space to breathe'
          },
          {
            es: 'Compara con los octavos: pulsa PLAY/STOP para alternar. Los 16ths son más intensos, los 8ths más relajados',
            en: 'Compare with eighths: press PLAY/STOP to alternate. 16ths are more intense, 8ths more relaxed'
          },
        ],
        type: 'pattern',
        target: { CH: Array.from({ length: 16 }, (_, i) => i) },
        inst: ['BD', 'CP', 'CH', 'OH'],
        check: (s) => (s.p?.CH || []).length >= 16,
      },
      {
        id: 'oh',
        title: { es: 'OPEN HATS', en: 'OPEN HATS' },
        text: {
          es: `Off-beats. El shuffle. El suspiro.

Steps 3, 7, 11, 15 = entre los downbeats.
OH DECAY = 60-80 para cola larga.
El espacio que hace que el groove respire.`,
          en: `Off-beats. The shuffle. The sigh.

Steps 3, 7, 11, 15 = between the downbeats.
OH DECAY = 60-80 for long tail.
The space that makes the groove breathe.`,
        },
        tech: [
          {
            es: 'Vuelve al pattern de octavos (CH en 1, 3, 5, 7, 9, 11, 13, 15). Ahora añadiremos open hats entre ellos',
            en: 'Return to eighths pattern (CH on 1, 3, 5, 7, 9, 11, 13, 15). Now we\'ll add open hats between them'
          },
          {
            es: 'Selecciona OH (botón bajo OPEN HAT, junto a CH) → LED se enciende',
            en: 'Select OH (button under OPEN HAT, next to CH) → LED lights up'
          },
          {
            es: 'Pulsa pads 3, 7, 11 y 15 → Estos son los off-beats, los puntos entre los downbeats principales',
            en: 'Press pads 3, 7, 11 and 15 → These are the off-beats, the points between main downbeats'
          },
          {
            es: 'Sube OH DECAY a 60-80 → Cola larga que crea una sensación de reverberación. El open hat "suspira" entre los kicks',
            en: 'Raise OH DECAY to 60-80 → Long tail creating a reverb-like feel. Open hat "sighs" between kicks'
          },
          {
            es: 'Escucha el shuffle: closed-OPEN-closed-OPEN... Este patrón es el corazón del disco, house y garage',
            en: 'Listen to the shuffle: closed-OPEN-closed-OPEN... This pattern is the heart of disco, house, and garage'
          },
          {
            es: 'Recuerda: donde CH y OH coinciden, solo suena OH (comportamiento real de platillos)',
            en: 'Remember: where CH and OH coincide, only OH sounds (real cymbal behavior)'
          },
        ],
        type: 'pattern',
        target: { OH: [2, 6, 10, 14] },
        inst: ['BD', 'CP', 'CH', 'OH'],
        check: (s) => [2, 6, 10, 14].every((x) => s.p?.OH?.includes(x)),
      },
    ],
  },
  {
    id: 6,
    n: 'VI',
    title: { es: 'FX', en: 'FX' },
    sub: { es: 'Filter + Wave Designer', en: 'Filter + Wave Designer' },
    color: C.orange,
    intro: {
      es: `La RD-9 tiene procesamiento que la 909 original no tenía.
El filtro y el Wave Designer son tu paleta de escultura sonora.

El sonido crudo es el material. Los FX son el cincel.`,
      en: `The RD-9 has processing the original 909 didn't have.
The filter and Wave Designer are your sonic sculpting palette.

Raw sound is the material. FX are the chisel.`,
    },
    exercises: [
      {
        id: 'flt',
        title: { es: 'ANALOG FILTER', en: 'ANALOG FILTER' },
        text: {
          es: `El filtro es arquitectura del espacio.

LPF (Low-Pass): quita agudos, deja graves. El sonido se aleja, se oscurece.
HPF (High-Pass): quita graves, deja agudos. El sonido adelgaza, se tensa.

El sweep de filtro = la respiración del track.
CUTOFF bajo en intro. CUTOFF alto en drop.`,
          en: `The filter is architecture of space.

LPF (Low-Pass): removes highs, leaves lows. Sound recedes, darkens.
HPF (High-Pass): removes lows, leaves highs. Sound thins, tenses.

The filter sweep = the track's breath.
Low CUTOFF in intro. High CUTOFF in drop.`,
        },
        tech: [
          {
            es: 'Localiza la sección ANALOG FILTER (panel frontal, zona izquierda, cerca de los knobs master) → Tiene botón ON/OFF, selector LPF/HPF, y knobs CUTOFF + RES',
            en: 'Locate ANALOG FILTER section (front panel, left zone, near master knobs) → Has ON/OFF button, LPF/HPF selector, and CUTOFF + RES knobs'
          },
          {
            es: 'Pulsa el botón FILTER para activarlo → LED se enciende. Ahora todo el audio pasa por el filtro',
            en: 'Press FILTER button to activate → LED lights up. Now all audio passes through the filter'
          },
          {
            es: 'Selecciona modo LPF (Low-Pass Filter) → Deja pasar graves, quita agudos. El sonido se "oscurece" al bajar CUTOFF',
            en: 'Select LPF mode (Low-Pass Filter) → Lets lows pass, removes highs. Sound "darkens" as you lower CUTOFF'
          },
          {
            es: 'Gira CUTOFF desde 100 hasta 0 mientras el pattern suena → Escucha cómo el sonido se aleja, se vuelve más oscuro, más "sumergido"',
            en: 'Turn CUTOFF from 100 to 0 while pattern plays → Hear how sound recedes, becomes darker, more "submerged"'
          },
          {
            es: 'Ahora gira RESONANCE a 70-90 → Aparece un silbido cerca de la frecuencia de corte. Este es el sonido "acid" característico',
            en: 'Now turn RESONANCE to 70-90 → A whistle appears near cutoff frequency. This is the characteristic "acid" sound'
          },
          {
            es: 'Mueve CUTOFF arriba/abajo con RES alto → El sweep de filtro. Usa esto en intros (cutoff bajo) y drops (cutoff alto)',
            en: 'Move CUTOFF up/down with high RES → The filter sweep. Use this in intros (low cutoff) and drops (high cutoff)'
          },
          {
            es: 'Prueba HPF (High-Pass Filter) → Quita graves, deja agudos. El sonido se adelgaza. Útil para buildups y breakdowns',
            en: 'Try HPF (High-Pass Filter) → Removes lows, keeps highs. Sound thins out. Useful for buildups and breakdowns'
          },
        ],
        type: 'filter',
        check: (s) => {
          if (!s.flt) return { pass: false, message: { es: "Activa el filtro y mueve el Cutoff.", en: "Enable the filter and move the Cutoff." } };
          
          const cutoff = s.knobValues?.flt_cutoff ?? 50;
          const res = s.knobValues?.flt_resonance ?? 30;
          
          // Allow if they have done a sweep (low or high cutoff) with some resonance
          const sweep = (cutoff < 30 || cutoff > 70) && res > 50;
          
          if (sweep) return { pass: true };
          
          return { 
            pass: false, 
            message: { 
              es: "Sube la Resonancia (>50) y barre la Frecuencia (Cutoff) de extremo a extremo.", 
              en: "Raise Resonance (>50) and sweep the Frequency (Cutoff) from end to end." 
            } 
          };
        },
      },
      {
        id: 'wave',
        title: { es: 'WAVE DESIGNER', en: 'WAVE DESIGNER' },
        text: {
          es: `Transiente = primer milisegundo del sonido.
Es lo que distingue un golpe de una nota sostenida.

ATTACK controla el "crack". SUSTAIN controla el "cuerpo".

ATTACK bajo (20-40) = transiente reducido, sonido suave.
ATTACK alto (70-100) = transiente exagerado, punch máximo.
SUSTAIN bajo = sonido corto, staccato.
SUSTAIN alto = sonido completo, resonante.`,
          en: `Transient = the first millisecond of sound.
It's what distinguishes a hit from a sustained note.

ATTACK controls the "crack". SUSTAIN controls the "body".

Low ATTACK (20-40) = reduced transient, soft sound.
High ATTACK (70-100) = exaggerated transient, maximum punch.
Low SUSTAIN = short sound, staccato.
High SUSTAIN = full sound, resonant.`,
        },
        tech: [
          {
            es: 'Localiza la sección WAVE DESIGNER (panel frontal, cerca del filtro) → Tiene dos knobs: ATTACK y SUSTAIN',
            en: 'Locate WAVE DESIGNER section (front panel, near filter) → Has two knobs: ATTACK and SUSTAIN'
          },
          {
            es: 'El Wave Designer procesa el TRANSIENTE (primer milisegundo del sonido). Afecta cómo "pega" cada golpe',
            en: 'Wave Designer processes the TRANSIENT (first millisecond of sound). Affects how each hit "punches"'
          },
          {
            es: 'Gira ATTACK mientras suena el kick → Bajo (20-40): transiente reducido, sonido suave, casi padded. Alto (70-100): exagera el "crack", el click inicial',
            en: 'Turn ATTACK while kick plays → Low (20-40): reduced transient, soft sound, almost padded. High (70-100): exaggerates the "crack", initial click'
          },
          {
            es: 'Gira SUSTAIN → Bajo: sonido cortado, staccato, el decay natural se trunca. Alto: sonido completo, todo el decay original',
            en: 'Turn SUSTAIN → Low: cut sound, staccato, natural decay is truncated. High: full sound, all original decay'
          },
          {
            es: 'Combinación para kicks que corten en la mezcla: ATTACK 70-80 (transiente exagerado) + SUSTAIN 40-50 (cola controlada)',
            en: 'Combination for kicks that cut through mix: ATTACK 70-80 (exaggerated transient) + SUSTAIN 40-50 (controlled tail)'
          },
          {
            es: 'Combinación para kicks suaves, atmosféricos: ATTACK 30 + SUSTAIN 80 → El kick aparece gentilmente pero resuena largo',
            en: 'Combination for soft, atmospheric kicks: ATTACK 30 + SUSTAIN 80 → Kick appears gently but resonates long'
          },
        ],
        type: 'wave',
        check: (s) => s.wave,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER III: RAÍCES (Roots)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 7,
    n: 'VII',
    title: { es: 'AFRIKA', en: 'AFRIKA' },
    sub: { es: 'Donde nace el groove', en: 'Where groove begins' },
    color: '#9d4edd',
    intro: {
      es: `Todo ritmo electrónico tiene ancestros. Antes del grid de 16 steps,
antes del 4/4 europeo, existía el ciclo africano: 12 pulsos, múltiples capas,
conversación entre cuerpos.

El polyrhythm no es complejidad por complejidad—es comunidad sonora.
Cada voz tiene su papel. Ninguna domina. Todas dialogan.`,
      en: `Every electronic rhythm has ancestors. Before the 16-step grid,
before European 4/4, the African cycle existed: 12 pulses, multiple layers,
conversation between bodies.

Polyrhythm isn't complexity for complexity—it's sonic community.
Each voice has its role. None dominates. All dialogue.`,
    },
    exercises: [
      {
        id: 'ctx-africa',
        title: { es: 'CONTEXTO', en: 'CONTEXT' },
        text: {
          es: `El ritmo africano viajó en barcos de esclavos. Sobrevivió en Brasil
(samba), Cuba (son), Nueva Orleans (jazz), Chicago (blues, luego house).

La clave—ese patrón de 3+2 o 2+3—es la columna vertebral
de casi toda la música popular occidental.

Cuando sientes que un groove "respira", que tiene "swing",
estás sintiendo herencia africana filtrada a través de siglos.

La RD-9 puede programarse en 4/4 rígido. Pero también puede
respirar. La diferencia está en dónde colocas los acentos,
qué pasos dejas vacíos, cómo usas el swing.`,
          en: `African rhythm traveled in slave ships. It survived in Brazil
(samba), Cuba (son), New Orleans (jazz), Chicago (blues, then house).

The clave—that 3+2 or 2+3 pattern—is the backbone
of almost all Western popular music.

When you feel a groove "breathe," have "swing,"
you're feeling African heritage filtered through centuries.

The RD-9 can be programmed in rigid 4/4. But it can also
breathe. The difference lies in where you place accents,
which steps you leave empty, how you use swing.`,
        },
        type: 'theory',
        check: (s) => s.ctxAfrica,
      },
      {
        id: 'clave',
        title: { es: 'PATRÓN CLAVE', en: 'CLAVE PATTERN' },
        text: {
          es: `La clave 3-2: tres golpes, pausa, dos golpes.
Adaptada a 16 steps: RS en 1, 4, 7, 11, 13.

No es decoración—es el esqueleto sobre el que todo se construye.
Cuando la clave está presente, incluso inconscientemente,
el groove tiene dirección.`,
          en: `The 3-2 clave: three hits, pause, two hits.
Adapted to 16 steps: RS on 1, 4, 7, 11, 13.

It's not decoration—it's the skeleton on which everything builds.
When the clave is present, even unconsciously,
the groove has direction.`,
        },
        tech: [
          {
            es: 'Borra el pattern actual: mantén CLEAR + pulsa ENTER → Pattern vacío. Nuevo lienzo',
            en: 'Clear current pattern: hold CLEAR + press ENTER → Empty pattern. Fresh canvas'
          },
          {
            es: 'Selecciona RS (RIMSHOT) → Pulsa pads 1, 4, 7, 11, 13 → Esta es la clave 3-2: tres golpes (1,4,7) + dos golpes (11,13). El esqueleto rítmico africano',
            en: 'Select RS (RIMSHOT) → Press pads 1, 4, 7, 11, 13 → This is the 3-2 clave: three hits (1,4,7) + two hits (11,13). The African rhythmic skeleton'
          },
          {
            es: 'Selecciona BD → Pulsa SOLO pads 1 y 9 → Menos kicks = más espacio. El peso está en la clave, no en el bombo',
            en: 'Select BD → Press ONLY pads 1 and 9 → Fewer kicks = more space. Weight is in the clave, not the bass drum'
          },
          {
            es: 'Activa SWING: SETTINGS → SWING → gira DATA a 55-60% → El swing desplaza los steps impares, creando el "suingue" característico',
            en: 'Activate SWING: SETTINGS → SWING → turn DATA to 55-60% → Swing displaces odd steps, creating characteristic "swing" feel'
          },
          {
            es: 'Selecciona CH → Programa octavos (1, 3, 5, 7, 9, 11, 13, 15) → Con swing activo, el hi-hat ahora balancea, no marcha',
            en: 'Select CH → Program eighths (1, 3, 5, 7, 9, 11, 13, 15) → With swing active, hi-hat now grooves, doesn\'t march'
          },
          {
            es: 'Escucha: el pattern respira. La clave guía, el kick ancla, los hi-hats conectan. Este es el diálogo africano traducido a máquina',
            en: 'Listen: pattern breathes. Clave guides, kick anchors, hi-hats connect. This is African dialogue translated to machine'
          },
        ],
        type: 'pattern',
        target: { RS: [0, 3, 6, 10, 12], BD: [0, 8] },
        inst: ['BD', 'RS', 'CH'],
        check: (s) => (s.p?.RS || []).length >= 5,
      },
    ],
  },
  {
    id: 8,
    n: 'VIII',
    title: { es: 'LATINOAMÉRICA', en: 'LATIN AMERICA' },
    sub: { es: 'La síncopa viaja al norte', en: 'Syncopation travels north' },
    color: '#9d4edd',
    intro: {
      es: `El samba no se toca—se respira. La síncopa brasileña,
heredera directa del oeste africano, viajó a Nueva York
en los años 70, se fusionó con el disco, mutó en Chicago
hacia house, y hoy pulsa en cada pista de baile del mundo.

Cuando sientes que un track "tiene groove", estás sintiendo
el fantasma de Rio, La Habana, Nueva Orleans—el offbeat
como forma de existencia.`,
      en: `Samba isn't played—it's breathed. Brazilian syncopation,
direct heir of West Africa, traveled to New York
in the 70s, fused with disco, mutated in Chicago
into house, and today pulses in every dance floor in the world.

When you feel a track "has groove," you're feeling
the ghost of Rio, Havana, New Orleans—the offbeat
as a way of being.`,
    },
    exercises: [
      {
        id: 'ctx-latin',
        title: { es: 'CONTEXTO', en: 'CONTEXT' },
        text: {
          es: `Línea directa:

1. Tambores yoruba (Nigeria) →
2. Batuque (Brasil colonial) →
3. Samba (Rio, 1900s) →
4. Bossa nova (1950s) →
5. Latin soul, bugalú (NYC 1960s) →
6. Disco (1970s) →
7. House (Chicago 1980s)

El surdo del samba (bombo grave en 1 y 3)
se convierte en el kick del house.

El tamborim (repique sincopado)
se convierte en el rimshot, el hi-hat abierto.

El ganzá (shaker constante)
se convierte en el hi-hat cerrado.

La estructura es la misma. Los timbres cambian.`,
          en: `Direct line:

1. Yoruba drums (Nigeria) →
2. Batuque (Colonial Brazil) →
3. Samba (Rio, 1900s) →
4. Bossa nova (1950s) →
5. Latin soul, boogaloo (NYC 1960s) →
6. Disco (1970s) →
7. House (Chicago 1980s)

Samba's surdo (deep bass on 1 and 3)
becomes the house kick.

The tamborim (syncopated repique)
becomes the rimshot, the open hi-hat.

The ganzá (constant shaker)
becomes the closed hi-hat.

The structure is the same. The timbres change.`,
        },
        type: 'theory',
        check: (s) => s.ctxLatin,
      },
      {
        id: 'samba',
        title: { es: 'GROOVE SAMBA', en: 'SAMBA GROOVE' },
        text: {
          es: `Adaptación del samba a la RD-9:

BD como surdo: enfatiza 1 y 3 (steps 1 y 9), no 4/4 recto.
RS como tamborim: síncopa en 4, 7, 12, 15.
CH como ganzá: constante, pero con SWING alto (60-65%).
OH para respirar: offbeats (3, 7, 11, 15).

El secreto: no llenar todo. El espacio es parte del groove.
El samba tiene "suingue" porque respira.`,
          en: `Samba adaptation to the RD-9:

BD as surdo: emphasize 1 and 3 (steps 1 and 9), not straight 4/4.
RS as tamborim: syncopation on 4, 7, 12, 15.
CH as ganzá: constant, but with high SWING (60-65%).
OH to breathe: offbeats (3, 7, 11, 15).

The secret: don't fill everything. Space is part of the groove.
Samba has "swing" because it breathes.`,
        },
        tech: [
          {
            es: 'Primero ajusta el tempo: TAP/HOLD o encoder → 100-115 BPM. El samba es más lento que el techno, permite que el groove respire',
            en: 'First set tempo: TAP/HOLD or encoder → 100-115 BPM. Samba is slower than techno, lets groove breathe'
          },
          {
            es: 'SWING es OBLIGATORIO: SETTINGS → SWING → 60-65% → Sin esto, el samba suena rígido, europeo. El swing es el alma',
            en: 'SWING is MANDATORY: SETTINGS → SWING → 60-65% → Without this, samba sounds rigid, European. Swing is the soul'
          },
          {
            es: 'BD como surdo: selecciona BD → pads 1 y 9 solamente → Estos son los beats 1 y 3, no el 4/4 recto del techno',
            en: 'BD as surdo: select BD → pads 1 and 9 only → These are beats 1 and 3, not straight 4/4 techno'
          },
          {
            es: 'RS como tamborim: selecciona RS → pads 4, 7, 12, 15 → Síncopa entre los beats principales. El repique característico',
            en: 'RS as tamborim: select RS → pads 4, 7, 12, 15 → Syncopation between main beats. The characteristic repique'
          },
          {
            es: 'CH como ganzá: octavos (1, 3, 5, 7, 9, 11, 13, 15) → Con 60-65% swing, suena como un shaker orgánico',
            en: 'CH as ganzá: eighths (1, 3, 5, 7, 9, 11, 13, 15) → With 60-65% swing, sounds like organic shaker'
          },
          {
            es: 'OH opcional: añade en 3, 7, 11, 15 con DECAY alto → "Respiros" entre los tiempos fuertes',
            en: 'OH optional: add on 3, 7, 11, 15 with high DECAY → "Breaths" between strong beats'
          },
          {
            es: 'El secreto: NO llenes todo. El samba tiene espacio. Escucha el silencio entre los golpes',
            en: 'The secret: DON\'T fill everything. Samba has space. Listen to silence between hits'
          },
        ],
        type: 'pattern',
        target: { BD: [0, 8], RS: [3, 6, 11, 14], CH: [0, 2, 4, 6, 8, 10, 12, 14] },
        inst: ['BD', 'RS', 'CH', 'OH'],
        check: (s) => (s.p?.RS || []).length >= 4 && (s.p?.BD || []).length <= 3,
      },
    ],
  },
  {
    id: 9,
    n: 'IX',
    title: { es: 'PIONERAS', en: 'PIONEERS' },
    sub: { es: 'Las mujeres que dieron forma al sonido', en: 'The women who shaped sound' },
    color: '#9d4edd',
    intro: {
      es: `La historia oficial olvida. O peor: borra activamente.

Delia Derbyshire creó el tema de Doctor Who en 1963—con tijeras,
cinta magnética y osciladores. No había crédito.

Wendy Carlos hizo "Switched-On Bach" en 1968—el primer álbum
de sintetizador en vender millones. La industria la marginó.

Suzanne Ciani sintetizó sonidos para Atari, Coca-Cola, la primera
máquina expendedora que "hablaba". Componía antes de que Kraftwerk existiera.

Las máquinas no tienen género. Las industrias sí.`,
      en: `Official history forgets. Or worse: actively erases.

Delia Derbyshire created the Doctor Who theme in 1963—with scissors,
magnetic tape, and oscillators. No credit given.

Wendy Carlos made "Switched-On Bach" in 1968—the first synthesizer
album to sell millions. The industry marginalized her.

Suzanne Ciani synthesized sounds for Atari, Coca-Cola, the first
talking vending machine. She was composing before Kraftwerk existed.

Machines have no gender. Industries do.`,
    },
    exercises: [
      {
        id: 'ctx-women',
        title: { es: 'CONTEXTO', en: 'CONTEXT' },
        text: {
          es: `Laurie Spiegel creó "Music Mouse" en 1985—software que
convertía movimientos del ratón en composición.
Algorítmica antes de que existiera el término.

Pauline Oliveros desarrolló "Deep Listening"—práctica de
escucha radical que influyó en el ambient y el drone.

En los 90s y 2000s: DJ Sprinkles (Terre Thaemlitz)
cuestionó la narrativa utópica del house.
The Black Madonna (ahora The Blessed Madonna)
revivió el house político de Chicago.

Honey Dijon, discípula de Frankie Knuckles,
conecta el linaje directo desde el Warehouse hasta hoy.

Cada vez que programas un patrón,
usas herramientas que estas mujeres ayudaron a crear.`,
          en: `Laurie Spiegel created "Music Mouse" in 1985—software that
converted mouse movements into composition.
Algorithmic before the term existed.

Pauline Oliveros developed "Deep Listening"—a practice of
radical listening that influenced ambient and drone.

In the 90s and 2000s: DJ Sprinkles (Terre Thaemlitz)
questioned house's utopian narrative.
The Black Madonna (now The Blessed Madonna)
revived Chicago's political house.

Honey Dijon, Frankie Knuckles' disciple,
connects the direct lineage from the Warehouse to today.

Every time you program a pattern,
you use tools these women helped create.`,
        },
        type: 'theory',
        check: (s) => s.ctxWomen,
      },
      {
        id: 'synth-roots',
        title: { es: 'RAÍCES DE SÍNTESIS', en: 'SYNTHESIS ROOTS' },
        text: {
          es: `Estas pioneras no solo tocaban—inventaban.

Conceptos que desarrollaron:
- Síntesis aditiva y sustractiva (Ciani, Carlos)
- Música concreta aplicada a pop (Derbyshire)
- Composición algorítmica (Spiegel)
- Escucha como práctica (Oliveros)

La RD-9 usa síntesis sustractiva para el kick:
un oscilador cuya frecuencia "baja" rápidamente (P.DEPTH),
filtrado para dar forma. Este concepto tiene 60 años.

Explora: ajusta P.DEPTH de 0 a 100.
Escucha cómo el oscilador "barre" hacia abajo.
Esa técnica la perfeccionaron mujeres en laboratorios
de la BBC y universidades, décadas antes del rave.`,
          en: `These pioneers didn't just play—they invented.

Concepts they developed:
- Additive and subtractive synthesis (Ciani, Carlos)
- Musique concrète applied to pop (Derbyshire)
- Algorithmic composition (Spiegel)
- Listening as practice (Oliveros)

The RD-9 uses subtractive synthesis for the kick:
an oscillator whose frequency "drops" quickly (P.DEPTH),
filtered to shape. This concept is 60 years old.

Explore: adjust P.DEPTH from 0 to 100.
Listen to how the oscillator "sweeps" down.
That technique was perfected by women in BBC labs
and universities, decades before rave.`,
        },
        tech: [
          {
            es: 'Asegúrate de que Enhanced Mode esté activo: SETTINGS → PREFS → Enhanced Mode ON → Esto desbloquea los parámetros extra de BD',
            en: 'Make sure Enhanced Mode is active: SETTINGS → PREFS → Enhanced Mode ON → This unlocks extra BD parameters'
          },
          {
            es: 'Selecciona BD → Localiza P.DEPTH (uno de los knobs adicionales que aparecen en Enhanced Mode)',
            en: 'Select BD → Locate P.DEPTH (one of the additional knobs that appear in Enhanced Mode)'
          },
          {
            es: 'Dispara BD con TRIGGER mientras giras P.DEPTH desde 0 hasta 100 → Escucha cómo cambia el carácter del kick',
            en: 'Trigger BD while turning P.DEPTH from 0 to 100 → Hear how the kick character changes'
          },
          {
            es: 'P.DEPTH 0 = casi sin barrido, el tono es estable. P.DEPTH 100 = barrido dramático, el oscilador "cae" rápidamente',
            en: 'P.DEPTH 0 = almost no sweep, pitch is stable. P.DEPTH 100 = dramatic sweep, oscillator "falls" quickly'
          },
          {
            es: 'Ahora sube PITCH alto (70-80) + P.DEPTH alto (80-100) → Barrido exagerado, el sonido "woooom" característico de la 909',
            en: 'Now raise PITCH high (70-80) + P.DEPTH high (80-100) → Exaggerated sweep, characteristic 909 "woooom" sound'
          },
          {
            es: 'Esta técnica de síntesis sustractiva fue perfeccionada por mujeres en la BBC y universidades décadas antes del rave. Cada vez que usas P.DEPTH, usas su legado',
            en: 'This subtractive synthesis technique was perfected by women at BBC and universities decades before rave. Every time you use P.DEPTH, you use their legacy'
          },
        ],
        type: 'explore',
        check: (s) => s.synthRoots,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER IV: REVOLUCIONES (Revolutions)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 10,
    n: 'X',
    title: { es: 'DETROIT', en: 'DETROIT' },
    sub: { es: '1985-1992', en: '1985-1992' },
    color: C.red,
    ctx: { es: 'Detroit, Michigan — Atkins, May, Saunderson, Mills, Hood', en: 'Detroit, Michigan — Atkins, May, Saunderson, Mills, Hood' },
    intro: {
      es: `Toda revolución sonora nace de una crisis. El blues emergió del algodón.
El jazz de la segregación. El punk de la recesión británica.
Y el techno—de la automatización.

Detroit, 1985. La capital del automóvil se desmorona.
Las fábricas que prometían futuro ahora lo roban. Desempleo 40%.
De las cenizas industriales, tres jóvenes—Juan Atkins, Derrick May,
Kevin Saunderson—imaginan un futuro que la ciudad ya no puede ofrecer.`,
      en: `Every sonic revolution is born from crisis. Blues emerged from cotton.
Jazz from segregation. Punk from British recession.
And techno—from automation.

Detroit, 1985. The automobile capital crumbles.
Factories that promised future now steal it. 40% unemployment.
From industrial ashes, three young men—Juan Atkins, Derrick May,
Kevin Saunderson—imagine a future the city can no longer offer.`,
    },
    exercises: [
      {
        id: 'det-ctx',
        title: { es: 'CONTEXTO', en: 'CONTEXT' },
        text: {
          es: `Juan Atkins lee "La Tercera Ola" de Alvin Toffler: la tecnología
reemplaza trabajadores, pero también libera creatividad.
Respuesta: hacer música CON las máquinas, no contra ellas.

Derrick May: "Es como si George Clinton y Kraftwerk estuvieran
atrapados en un ascensor con solo un sintetizador para escapar."

Kevin Saunderson: "Era música para gente que no tenía
adónde ir y necesitaba un lugar para existir."

La 909 no era instrumento de nostalgia—era herramienta de los sin voz.
El minimalismo no era pobreza estética—era resistencia.
Cada kick repetido era una declaración: seguimos aquí.`,
          en: `Juan Atkins reads Alvin Toffler's "The Third Wave": technology
replaces workers, but also liberates creativity.
Response: make music WITH machines, not against them.

Derrick May: "It's like George Clinton and Kraftwerk
stuck in an elevator with only a synthesizer to escape."

Kevin Saunderson: "It was music for people who had
nowhere to go and needed a place to exist."

The 909 wasn't an instrument of nostalgia—it was a tool for the voiceless.
Minimalism wasn't aesthetic poverty—it was resistance.
Each repeated kick was a declaration: we're still here.`,
        },
        type: 'theory',
        check: (s) => s.detCtx,
      },
      {
        id: 'det-pat',
        title: { es: 'ESTUDIO: DETROIT', en: 'STUDY: DETROIT' },
        text: {
          es: `Tu misión: Esculpir el "Machine Soul".

En Detroit, la máquina no se esconde—se celebra.
No buscamos swing humano. Buscamos funk robótico.

RECETA SONORA:
• Tempo: 132 BPM (La urgencia del futuro)
• Swing: 50-54% (Casi recto, pero no rígido)
• Kick: TUNE medio, DECAY corto. Seco. Percusivo.
• Hats: 16ths constantes. La línea de montaje.

PRUEBA ESTO EN TU RD-9:`,
          en: `Your mission: Sculpt the "Machine Soul".

In Detroit, the machine isn't hidden—it's celebrated.
We aren't looking for human swing. We want robotic funk.

SONIC RECIPE:
• Tempo: 132 BPM (The urgency of the future)
• Swing: 50-54% (Almost straight, but not stiff)
• Kick: Mid TUNE, short DECAY. Dry. Percussive.
• Hats: Constant 16ths. The assembly line.

TRY THIS ON YOUR RD-9:`,
        },
        tech: [
          {
            es: '1. Configura el Tempo a 132 BPM. Pon el Kick en 1, 5, 9, 13.',
            en: '1. Set Tempo to 132 BPM. Place Kick on 1, 5, 9, 13.'
          },
          {
            es: '2. Hi-Hats (CH): Marca LOS 16 PASOS. Ajusta el DECAY muy corto. Debe sonar como vapor escapando de una válvula.',
            en: '2. Hi-Hats (CH): Mark ALL 16 STEPS. Set DECAY very short. Must sound like steam escaping a valve.'
          },
          {
            es: '3. Acentos: Usa la función ACCENT en los steps 1, 4, 9, 12 del Hi-Hat. Esto crea un ritmo dentro del ritmo.',
            en: '3. Accents: Use the ACCENT function on Hi-Hat steps 1, 4, 9, 12. This creates a rhythm inside the rhythm.'
          },
          {
            es: '4. Escucha: ¿Sientes la "frialdad" funky? Eso es Detroit.',
            en: '4. Listen: Do you feel the funky "coldness"? That is Detroit.'
          },
        ],
        type: 'theory',
        check: (s) => s.detCtx,
      },
    ],
  },
  {
    id: 11,
    n: 'XI',
    title: { es: 'CHICAGO', en: 'CHICAGO' },
    sub: { es: '1984-1990', en: '1984-1990' },
    color: '#9d4edd',
    ctx: { es: 'Chicago, Illinois — Frankie Knuckles, Ron Hardy, Marshall Jefferson', en: 'Chicago, Illinois — Frankie Knuckles, Ron Hardy, Marshall Jefferson' },
    intro: {
      es: `La casa no es un edificio—es un sentimiento.
En 1977, el Warehouse abre sus puertas en Chicago.
Adentro: comunidad negra, latina, queer—rechazada por el mainstream.
Afuera: América de Reagan, el SIDA, el silencio institucional.

Frankie Knuckles no inventó house—lo cuidó. Lo protegió. Lo nombró.`,
      en: `The house is not a building—it's a feeling.
In 1977, the Warehouse opens its doors in Chicago.
Inside: Black, Latino, queer community—rejected by mainstream.
Outside: Reagan's America, AIDS, institutional silence.

Frankie Knuckles didn't invent house—he nurtured it. Protected it. Named it.`,
    },
    exercises: [
      {
        id: 'chi-ctx',
        title: { es: 'CONTEXTO', en: 'CONTEXT' },
        text: {
          es: `El disco "muere" oficialmente el 12 de julio de 1979.
Disco Demolition Night, Chicago. 50,000 personas queman discos en un estadio.
El mensaje no era solo musical—era racial, era homofóbico.

Pero en el Warehouse, el disco sobrevive. Muta.
Frankie mezcla Philadelphia soul con Kraftwerk,
gospel con cajas de ritmos, esperanza con sintetizadores.

Ron Hardy en el Music Box: más oscuro, más crudo, más urgente.
Los pinchadiscos como chamanes. La pista como santuario.
"House is not a sound. House is a feeling."

La 909 llega en 1984. Su swing natural (55-60%)
es el groove que el disco siempre buscó.
Octavos en hi-hat = el latido de un corazón colectivo.
El backbeat del clap = el gesto de llamada y respuesta.

Cada vez que programas un pattern de house,
estás participando en una tradición de resistencia.`,
          en: `Disco "dies" officially on July 12, 1979.
Disco Demolition Night, Chicago. 50,000 people burn records in a stadium.
The message wasn't just musical—it was racial, it was homophobic.

But at the Warehouse, disco survives. Mutates.
Frankie mixes Philadelphia soul with Kraftwerk,
gospel with drum machines, hope with synthesizers.

Ron Hardy at the Music Box: darker, rawer, more urgent.
DJs as shamans. The floor as sanctuary.
"House is not a sound. House is a feeling."

The 909 arrives in 1984. Its natural swing (55-60%)
is the groove disco always sought.
Eighth-note hi-hats = the beat of a collective heart.
The clap's backbeat = call and response gesture.

Every time you program a house pattern,
you're participating in a tradition of resistance.`,
        },
        type: 'theory',
        check: (s) => s.chiCtx,
      },
      {
        id: 'chi-pat',
        title: { es: 'PATTERN HOUSE', en: 'HOUSE PATTERN' },
        text: {
          es: `El house respira. No marcha—fluye.

Tempo: 118-124 BPM. Suficiente para bailar toda la noche,
no tanto que agote.

SWING: 55-60%. Esto no es opcional—es el alma del género.
Sin swing, es euro-disco. Con swing, es house.

BD: cuatro en el piso, pero con DECAY alto (75).
El kick resuena, no golpea y desaparece.

CH: octavos, no dieciseisavos. Espacio para respirar.
OH: offbeats (3, 7, 11, 15). El suspiro entre pasos.`,
          en: `House breathes. It doesn't march—it flows.

Tempo: 118-124 BPM. Enough to dance all night,
not so much it exhausts.

SWING: 55-60%. This isn't optional—it's the genre's soul.
Without swing, it's euro-disco. With swing, it's house.

BD: four on the floor, but with high DECAY (75).
The kick resonates, doesn't hit and disappear.

CH: eighths, not sixteenths. Space to breathe.
OH: offbeats (3, 7, 11, 15). The sigh between steps.`,
        },
        tech: [
          {
            es: 'Ajusta tempo a 118-124 BPM → Más lento que Detroit. House respira, no marcha',
            en: 'Set tempo to 118-124 BPM → Slower than Detroit. House breathes, doesn\'t march'
          },
          {
            es: 'SWING es ESENCIAL: SETTINGS → SWING → 55-60% → Sin swing no es house, es euro-disco. El swing es el alma del género',
            en: 'SWING is ESSENTIAL: SETTINGS → SWING → 55-60% → Without swing it\'s not house, it\'s euro-disco. Swing is the genre\'s soul'
          },
          {
            es: 'Configura BD: TUNE 55-60 (medio-alto), DECAY 75 (largo, resonante). El kick no golpea y desaparece—resuena, llena el espacio',
            en: 'Configure BD: TUNE 55-60 (mid-high), DECAY 75 (long, resonant). Kick doesn\'t hit and disappear—it resonates, fills space'
          },
          {
            es: 'Selecciona BD → Pads 1, 5, 9, 13 (four-on-the-floor) → Pero con DECAY alto, cada kick se funde con el siguiente',
            en: 'Select BD → Pads 1, 5, 9, 13 (four-on-the-floor) → But with high DECAY, each kick blends into the next'
          },
          {
            es: 'Selecciona CH → Octavos: pads 1, 3, 5, 7, 9, 11, 13, 15 → Espacio para respirar. NO 16ths',
            en: 'Select CH → Eighths: pads 1, 3, 5, 7, 9, 11, 13, 15 → Space to breathe. NOT 16ths'
          },
          {
            es: 'Selecciona OH → Off-beats: pads 3, 7, 11, 15 → El suspiro entre los downbeats. DECAY 70+ para cola larga',
            en: 'Select OH → Off-beats: pads 3, 7, 11, 15 → The sigh between downbeats. DECAY 70+ for long tail'
          },
          {
            es: 'Selecciona CP → Pads 5 y 13 → El backbeat del gospel, del soul, del disco. Llamada y respuesta',
            en: 'Select CP → Pads 5 and 13 → The backbeat of gospel, soul, disco. Call and response'
          },
          {
            es: 'Escucha con el swing activo: el hi-hat balancea, no marcha. El groove tiene "suingue". Esto es house',
            en: 'Listen with swing active: hi-hat sways, doesn\'t march. Groove has "swing". This is house'
          },
        ],
        type: 'pattern',
        target: {
          BD: [0, 4, 8, 12],
          CH: [0, 2, 4, 6, 8, 10, 12, 14],
          OH: [2, 6, 10, 14],
          CP: [4, 12],
        },
        inst: ['BD', 'CP', 'CH', 'OH'],
        check: (s) => (s.p?.CH || []).length >= 8 && (s.p?.CH || []).length <= 10,
      },
    ],
  },
  {
    id: 12,
    n: 'XII',
    title: { es: 'BERLIN', en: 'BERLIN' },
    sub: { es: '1989-presente', en: '1989-present' },
    color: '#4a9eff',
    ctx: { es: 'Berlin, Alemania — Tresor, Basic Channel, Ben Klock, Dettmann', en: 'Berlin, Germany — Tresor, Basic Channel, Ben Klock, Dettmann' },
    intro: {
      es: `9 de noviembre de 1989. El Muro cae.
Berlín tiene dos mitades que olvidaron cómo ser una.
El Este tiene fábricas vacías, bunkers abandonados, espacio.
El Oeste tiene dinero, curiosidad, hambre de experiencia.

Los jóvenes ocupan lo que nadie quiere.
No hay idioma común—pero hay 4/4.
No hay historia compartida—pero hay graves que vibran igual en todos los cuerpos.`,
      en: `November 9, 1989. The Wall falls.
Berlin has two halves that forgot how to be one.
The East has empty factories, abandoned bunkers, space.
The West has money, curiosity, hunger for experience.

Young people occupy what nobody wants.
There's no common language—but there's 4/4.
No shared history—but bass that vibrates the same in all bodies.`,
    },
    exercises: [
      {
        id: 'ber-ctx',
        title: { es: 'CONTEXTO', en: 'CONTEXT' },
        text: {
          es: `Tresor abre en 1991. Literalmente: bóveda de un banco nazi,
bajo tierra, sin ventanas, sin tiempo.
Detroit exporta su sonido. Berlín lo recibe, lo endurece, lo oscurece.

Basic Channel: dub techno. Ecos infinitos.
El espacio vacío como instrumento.
Reverb no como efecto—como filosofía.

Hard Wax: tienda de discos que es universidad.
Cada cajón es un semestre de educación.

Berghain abre en 2004: antigua planta eléctrica del Este.
Sin fotos. Sin teléfonos. Sin juicio.
Solo cuerpos y ondas sonoras.
El hedonismo como política—el derecho a existir sin explicarse.

El kick berlinés es inconfundible:
TUNE muy bajo (40-50), sub-frecuencias que no escuchas—sientes.
DECAY largo, resonancia que llena el espacio.
ATTACK agresivo, cada golpe es una declaración.
Filter LPF = niebla industrial, el sonido emergiendo y sumergiéndose.`,
          en: `Tresor opens in 1991. Literally: a Nazi bank vault,
underground, no windows, no time.
Detroit exports its sound. Berlin receives it, hardens it, darkens it.

Basic Channel: dub techno. Infinite echoes.
Empty space as instrument.
Reverb not as effect—as philosophy.

Hard Wax: record store that's a university.
Each crate is a semester of education.

Berghain opens in 2004: former East power plant.
No photos. No phones. No judgment.
Only bodies and sound waves.
Hedonism as politics—the right to exist without explaining.

The Berlin kick is unmistakable:
Very low TUNE (40-50), sub-frequencies you don't hear—you feel.
Long DECAY, resonance that fills space.
Aggressive ATTACK, each hit is a statement.
LPF filter = industrial fog, sound emerging and submerging.`,
        },
        type: 'theory',
        check: (s) => s.berCtx,
      },
      {
        id: 'ber-pat',
        title: { es: 'PATTERN BERLIN', en: 'BERLIN PATTERN' },
        text: {
          es: `Industrial. Implacable. Hipnótico.

Tempo: 135-140 BPM. La velocidad como meditación.
Tan rápido que deja de sentirse rápido.

BD: TUNE 40-50 (muy bajo), DECAY alto, ATTACK alto.
El sub que sientes en el pecho antes de escucharlo.

CH: todos los 16 steps. TUNE 85 (alto, metálico). DECAY 20 (corto, preciso).
La línea constante. El pulso industrial.

RS: steps 7 y 15. El chasquido que rompe la monotonía.

Filter: LPF activo, CUTOFF moderado (50), RESONANCE leve (30).
Todo cubierto por niebla. El sonido emerge lentamente.`,
          en: `Industrial. Relentless. Hypnotic.

Tempo: 135-140 BPM. Speed as meditation.
So fast it stops feeling fast.

BD: TUNE 40-50 (very low), high DECAY, high ATTACK.
The sub you feel in your chest before hearing it.

CH: all 16 steps. TUNE 85 (high, metallic). DECAY 20 (short, precise).
The constant line. The industrial pulse.

RS: steps 7 and 15. The snap that breaks monotony.

Filter: LPF active, moderate CUTOFF (50), light RESONANCE (30).
Everything covered in fog. Sound emerges slowly.`,
        },
        tech: [
          {
            es: 'Ajusta tempo a 135-140 BPM → TAP/HOLD o encoder. Berlin es rápido. La velocidad como meditación—tan rápido que deja de sentirse rápido',
            en: 'Set tempo to 135-140 BPM → TAP/HOLD or encoder. Berlin is fast. Speed as meditation—so fast it stops feeling fast'
          },
          {
            es: 'El kick berlinés: TUNE muy bajo (40-50) → Sub que sientes en el pecho antes de escucharlo. DECAY alto (70+) → Resuena, llena el espacio. ATTACK alto (70+) → Cada golpe es una declaración',
            en: 'The Berlin kick: very low TUNE (40-50) → Sub you feel in chest before hearing. High DECAY (70+) → Resonates, fills space. High ATTACK (70+) → Each hit is a statement'
          },
          {
            es: 'Selecciona BD → Four-on-the-floor: pads 1, 5, 9, 13 → Pero con ese sub masivo, sientes la presión física',
            en: 'Select BD → Four-on-the-floor: pads 1, 5, 9, 13 → But with that massive sub, you feel physical pressure'
          },
          {
            es: 'Selecciona CH → Todos los 16 steps → CH TUNE 85 (alto, metálico), DECAY 20 (muy corto). Clicks industriales, no hi-hats suaves',
            en: 'Select CH → All 16 steps → CH TUNE 85 (high, metallic), DECAY 20 (very short). Industrial clicks, not soft hi-hats'
          },
          {
            es: 'Selecciona RS (Rimshot) → Pads 7 y 15 → El chasquido metálico que rompe la monotonía. Punctuación agresiva',
            en: 'Select RS (Rimshot) → Pads 7 and 15 → The metallic snap that breaks monotony. Aggressive punctuation'
          },
          {
            es: 'Activa FILTER: botón FILTER ON → Selecciona LPF → CUTOFF 50 (medio, niebla), RESONANCE 30 (leve) → Todo cubierto por niebla industrial',
            en: 'Activate FILTER: FILTER ON button → Select LPF → CUTOFF 50 (mid, fog), RESONANCE 30 (slight) → Everything covered in industrial fog'
          },
          {
            es: 'SIN SWING. Berlin es rígido, implacable. La máquina no negocia',
            en: 'NO SWING. Berlin is rigid, relentless. The machine doesn\'t negotiate'
          },
        ],
        type: 'pattern',
        target: {
          BD: [0, 4, 8, 12],
          CH: Array.from({ length: 16 }, (_, i) => i),
          CP: [4, 12],
          RS: [6, 14],
        },
        inst: ['BD', 'CP', 'CH', 'OH', 'RS'],
        check: (s) => (s.p?.RS || []).length >= 2,
      },
    ],
  },
  {
    id: 13,
    n: 'XIII',
    title: { es: 'HARDGROOVE', en: 'HARDGROOVE' },
    sub: { es: 'UK 1995-2005', en: 'UK 1995-2005' },
    color: '#ef4444',
    ctx: { es: 'Birmingham, Londres — Ben Sims, Surgeon, Regis, Ruskin', en: 'Birmingham, London — Ben Sims, Surgeon, Regis, Ruskin' },
    intro: {
      es: `1994. El gobierno británico aprueba la Criminal Justice Act.
Artículo 63: prohíbe reuniones no autorizadas donde se toque
"música caracterizada por la emisión de una sucesión de beats repetitivos."
La ley describe el techno con precisión legal—y lo criminaliza.

La respuesta no fue silencio. Fue volumen.`,
      en: `1994. The British government passes the Criminal Justice Act.
Section 63: prohibits unauthorized gatherings where
"music characterized by the emission of a succession of repetitive beats" is played.
The law describes techno with legal precision—and criminalizes it.

The response wasn't silence. It was volume.`,
    },
    exercises: [
      {
        id: 'uk-ctx',
        title: { es: 'CONTEXTO', en: 'CONTEXT' },
        text: {
          es: `Birmingham y Londres responden con rabia canalizada.
Si el gobierno quiere oscuridad, la tendrá.
Ben Sims, Surgeon, Regis, James Ruskin—el "Birmingham sound".

Los toms se vuelven protagonistas. Conversación tribal.
El rimshot como punctuación agresiva.
136-142 BPM = aceleración como desafío. Como fuga hacia adelante.

Jeff Mills toca en el Astoria: tres Technics, sin mezcla suave,
solo cortes duros. Velocidad como declaración política.
Cada track dura 90 segundos antes del siguiente.

La escena no muere—muta. El warehouse ilegal se vuelve liturgia.
El rave se convierte en forma de resistencia.
Bailar cuando el gobierno te dice que no puedes
es un acto político.

Cada tom programado en tu RD-9 es eco de esa resistencia.`,
          en: `Birmingham and London respond with channeled rage.
If the government wants darkness, they'll have it.
Ben Sims, Surgeon, Regis, James Ruskin—the "Birmingham sound".

Toms become protagonists. Tribal conversation.
The rimshot as aggressive punctuation.
136-142 BPM = acceleration as defiance. As flight forward.

Jeff Mills plays at the Astoria: three Technics, no smooth mixing,
only hard cuts. Speed as political statement.
Each track lasts 90 seconds before the next.

The scene doesn't die—it mutates. The illegal warehouse becomes liturgy.
Rave becomes a form of resistance.
Dancing when the government tells you not to
is a political act.

Every tom programmed on your RD-9 echoes that resistance.`,
        },
        type: 'theory',
        check: (s) => s.ukCtx,
      },
      {
        id: 'hg-pat',
        title: { es: 'ESTUDIO: HARDGROOVE', en: 'STUDY: HARDGROOVE' },
        text: {
          es: `Tu misión: Crear conversación tribal.

Hardgroove (UK Techno) es polirritmia a alta velocidad.
El protagonismo pasa del bombo a los TOMS.

RECETA SONORA:
• Tempo: 138-142 BPM (Aceleración)
• Toms: Son la melodía. Low Tom pregunta, Mid Tom responde.
• Compresión: En la RD-9, usa "Accent" agresivamente en los toms.

PRUEBA ESTO EN TU RD-9:`,
          en: `Your mission: Create tribal conversation.

Hardgroove (UK Techno) is high-speed polyrhythm.
The spotlight shifts from the kick to the TOMS.

SONIC RECIPE:
• Tempo: 138-142 BPM (Acceleration)
• Toms: They are the melody. Low Tom asks, Mid Tom answers.
• Compression: On the RD-9, use "Accent" aggressively on the toms.

TRY THIS ON YOUR RD-9:`,
        },
        tech: [
          {
            es: '1. Sube el Tempo. Sin miedo. 140 BPM.',
            en: '1. Raise the Tempo. Fearlessly. 140 BPM.'
          },
          {
            es: '2. Pregunta: Coloca Low Tom (LT) en steps "extraños" (ej: 3, 11).',
            en: '2. Question: Place Low Tom (LT) on "odd" steps (e.g., 3, 11).'
          },
          {
            es: '3. Respuesta: Coloca Mid Tom (MT) en los huecos (ej: 7, 14, 15).',
            en: '3. Answer: Place Mid Tom (MT) in the gaps (e.g., 7, 14, 15).'
          },
          {
            es: '4. Afina los toms (TUNE) para que "canten" juntos. Deben sonar como tambores reales dialogando.',
            en: '4. Tune the toms (TUNE) so they "sing" together. They must sound like real drums conversing.'
          },
        ],
        type: 'theory',
        check: (s) => s.ukCtx,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER V: DOMINIO (Mastery)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 14,
    n: 'XIV',
    title: { es: 'INTEGRACIÓN', en: 'INTEGRATION' },
    sub: { es: 'Todo junto', en: 'All together' },
    color: C.yellow,
    intro: {
      es: `Has aprendido fragmentos. Ahora: un track completo.

Intro, build, drop, breakdown, outro.
64 steps. Múltiples patterns. Song mode.
Todos los elementos trabajando juntos.`,
      en: `You've learned fragments. Now: a complete track.

Intro, build, drop, breakdown, outro.
64 steps. Multiple patterns. Song mode.
All elements working together.`,
    },
    exercises: [
      {
        id: 'workflow',
        title: { es: 'WORKFLOW: PATTERN & SONG', en: 'WORKFLOW: PATTERN & SONG' },
        text: {
          es: `Un track no es un solo loop eterno. Necesitas cambios.
Intro (P01) → Verso (P02) → Build (P03) → Drop (P04).

Para lograr esto, debes dominar el arte de gestionar patrones.
Aquí es donde la RD-9 Virtual y la Física tienen caminos distintos.`,
          en: `A track isn't just one eternal loop. You need changes.
Intro (P01) → Verse (P02) → Build (P03) → Drop (P04).

To achieve this, you must master the art of pattern management.
Here is where the Virtual and Physical RD-9 diverge.`,
        },
        tech: [
          {
            es: 'VIRTUAL RD-9 (Esta App):',
            en: 'VIRTUAL RD-9 (This App):'
          },
          {
            es: '• SELECCIONAR: En modo PATTERN, usa los botones < y > en la sección MODE para navegar (P01-P16).',
            en: '• SELECT: In PATTERN mode, use the < and > buttons in the MODE section to navigate (P01-P16).'
          },
          {
            es: '• GUARDAR: Pulsa SAVE. Se guarda instantáneamente en el slot actual.',
            en: '• SAVE: Press SAVE. Instantly saves to the current slot.'
          },
          {
            es: '• BORRAR: Click en ERASE limpia el patrón actual. Doble-Click en ERASE borra el slot de la memoria.',
            en: '• ERASE: Click ERASE clears current pattern. Double-Click ERASE deletes the slot from storage.'
          },
          {
            es: '• COPIAR: Pulsa COPY. El patrón actual se guarda en la memoria temporal.',
            en: '• COPY: Press COPY. The current pattern is saved to temporary memory.'
          },
          {
            es: '• PEGAR: Ve al pattern destino (con < >), pulsa PASTE y luego SAVE para confirmar.',
            en: '• PASTE: Go to destination pattern (with < >), press PASTE, then SAVE to confirm.'
          },
          {
            es: '─── SONG MODE (MODO CANCIÓN) ───',
            en: '─── SONG MODE ───'
          },
          {
            es: 'VIRTUAL RD-9:',
            en: 'VIRTUAL RD-9:'
          },
          {
            es: '• (Próximamente): Esta función estará disponible en una futura actualización.',
            en: '• (Coming Soon): This feature will be available in a future update.'
          },
          {
            es: 'PHYSICAL RD-9:',
            en: 'PHYSICAL RD-9:'
          },
          {
            es: '• Pulsa SONG. Gira encoder para elegir slot de canción. Pulsa ENTER.',
            en: '• Press SONG. Turn encoder to choose song slot. Press ENTER.'
          },
          {
            es: '• Elige Pattern para el paso 1. Gira DATA para elegir REPETICIONES. Pulsa WRITE/NEXT para ir al paso 2.',
            en: '• Choose Pattern for step 1. Turn DATA to choose REPEATS. Press WRITE/NEXT to go to step 2.'
          },
          {
            es: '─── VS ───',
            en: '─── VS ───'
          },
          {
            es: 'PHYSICAL RD-9 (Hardware Real):',
            en: 'PHYSICAL RD-9 (Real Hardware):'
          },
          {
            es: '• SELECCIONAR PATTERN: Mantén pulsado PATTERN y presiona una tecla de paso (1-16).',
            en: '• SELECT PATTERN: Hold PATTERN and press a step key (1-16).'
          },
          {
            es: '• COPIAR/PEGAR: El flujo es más "físico". Mantén COPY, pulsa el Step de origen, y sin soltar COPY, pulsa el Step de destino.',
            en: '• COPY/PASTE: Flow is more "physical". Hold COPY, press source Step, and without releasing COPY, press destination Step.'
          },
        ],
        type: 'theory',
        check: (s) => true,
      },
      {
        id: 'full-pat',
        title: { es: 'PATTERN COMPLETO', en: 'FULL PATTERN' },
        text: {
          es: `Para crear temas completos, necesitas más que un compás.

El RD-9 (físico y virtual) permite patrones de hasta 64 steps (4 compases).
• Botón LENGTH: Define la longitud (16, 32, 48, 64).
• Botones « »: Navegan entre los 4 bancos de 16 pasos.

REGLA DE ORO (WORKFLOW):
Nunca destruyas—siempre itera.
1. Crea un loop sólido en el Banco 1.
2. CÓPIALO a los Bancos 2, 3 y 4.
3. Modifica SOLO las copias (añade fills, varía hi-hats).
Así siempre tienes un "lugar seguro" al que volver.`,
          en: `To create full tracks, you need more than one bar.

The RD-9 (physical and virtual) supports patterns up to 64 steps (4 bars).
• LENGTH button: Sets the length (16, 32, 48, 64).
• « » buttons: Navigate between the 4 banks of 16 steps.

GOLDEN RULE (WORKFLOW):
Never destroy—always iterate.
1. Create a solid loop in Bank 1.
2. COPY it to Banks 2, 3, and 4.
3. Modify ONLY the copies (add fills, vary hi-hats).
This way you always have a "safe place" to return to.`,
        },
        tech: [
          {
            es: 'PASO 1 — Pulsa el botón LENGTH hasta que muestre "64". Ahora tienes 4 compases.',
            en: 'STEP 1 — Press the LENGTH button until it shows "64". Now you have 4 bars.'
          },
          {
            es: 'PASO 2 — Banco 1 (Steps 1-16): Programa un ritmo básico de House (Four-on-the-floor + Hats).',
            en: 'STEP 2 — Bank 1 (Steps 1-16): Program a basic House rhythm (Four-on-the-floor + Hats).'
          },
          {
            es: 'PASO 3 — Usa el botón "»" para ir al Banco 2 (Steps 17-32). Añade variación: un Clap extra o un redoble de Snare.',
            en: 'STEP 3 — Use the "»" button to go to Bank 2 (Steps 17-32). Add variation: an extra Clap or Snare roll.'
          },
          {
            es: 'PASO 4 — Repite para Bancos 3 y 4. Haz que el último compás (Steps 49-64) sea un "fill" para cerrar el ciclo.',
            en: 'STEP 4 — Repeat for Banks 3 and 4. Make the last bar (Steps 49-64) a "fill" to close the loop.'
          },
          {
            es: 'PASO 5 — Resultado: Pulsa PLAY. Escucha cómo el fill conecta el final del patrón con el inicio. Tienes un compás completo y profesional.',
            en: 'STEP 5 — Result: Press PLAY. Listen to how the fill connects the end of the pattern back to the start. You have a complete, professional bar.'
          },
        ],
        type: 'theory',
        check: (s) => s.chain, // Reusing a simple check or I can add 'fullPat' to state
      },
      {
        id: 'chain',
        title: { es: 'ESTRUCTURA', en: 'STRUCTURE' },
        text: {
          es: `Dos caminos para convertir un loop en una canción:

1. MODO SONG (Programador):
Ideal para estructura precisa. Encadena Patterns: Intro x4 → Build x8 → Drop x16.
La máquina hace el trabajo. Tú supervisas.

2. JAMMING (Intérprete):
Usa MUTE y SOLO en tiempo real.
Quita el Kick para crear tensión. Mete los Hats para dar energía.
Tú eres el arreglista en vivo.

Recomendación: Empieza con Jamming para "sentir" la estructura. Luego programa en Song Mode.`,
          en: `Two paths to turn a loop into a song:

1. SONG MODE (Programmer):
Ideal for precise structure. Chain Patterns: Intro x4 → Build x8 → Drop x16.
The machine does the work. You supervise.

2. JAMMING (Performer):
Use MUTE and SOLO in real-time.
Remove the Kick to create tension. Bring in Hats for energy.
You are the live arranger.

Recommendation: Start with Jamming to "feel" the structure. Then program in Song Mode.`,
        },
        tech: [
          {
            es: 'Primero necesitas varios patterns guardados. Asegúrate de tener al menos 2-4 patterns diferentes en slots distintos',
            en: 'First you need several saved patterns. Make sure you have at least 2-4 different patterns in separate slots'
          },
          {
            es: 'Entra en SONG mode: pulsa SONG (botón en zona izquierda) → LED de SONG se enciende. Ahora puedes encadenar patterns',
            en: 'Enter SONG mode: press SONG (button in left zone) → SONG LED lights up. Now you can chain patterns'
          },
          {
            es: 'Selecciona un slot de song vacío: gira DATA para elegir slot (1-16) → Pulsa ENTER para editarlo',
            en: 'Select an empty song slot: turn DATA to choose slot (1-16) → Press ENTER to edit it'
          },
          {
            es: 'Añade patterns a la secuencia: pulsa PATTERN → selecciona el número del pattern que quieres añadir → aparece en la lista',
            en: 'Add patterns to sequence: press PATTERN → select pattern number you want to add → it appears in list'
          },
          {
            es: 'Ajusta repeticiones: con un pattern seleccionado en la lista, gira DATA para elegir cuántas veces se repite (1-99)',
            en: 'Adjust repeats: with a pattern selected in list, turn DATA to choose how many times it repeats (1-99)'
          },
          {
            es: 'Ejemplo de estructura: Pattern 1 (intro) x4 → Pattern 2 (build) x4 → Pattern 3 (drop) x8 → Pattern 4 (breakdown) x4',
            en: 'Example structure: Pattern 1 (intro) x4 → Pattern 2 (build) x4 → Pattern 3 (drop) x8 → Pattern 4 (breakdown) x4'
          },
          {
            es: 'Reproduce tu song: pulsa PLAY mientras estás en SONG mode → La RD-9 reproduce toda la secuencia en orden',
            en: 'Play your song: press PLAY while in SONG mode → RD-9 plays entire sequence in order'
          },
        ],
        type: 'theory',
        check: (s) => s.chain,
      },
    ],
  },
  {
    id: 15,
    n: 'XV',
    title: { es: 'TU VOZ', en: 'YOUR VOICE' },
    sub: { es: 'Libertad', en: 'Freedom' },
    color: C.red,
    intro: {
      es: `Has estudiado a los maestros. Ahora olvida todo.

Has escuchado Detroit, Chicago, Berlin, UK.
Cada escena respondió a SU crisis con SU sonido.
¿Cuál es tu crisis? ¿Cuál es tu respuesta?`,
      en: `You've studied the masters. Now forget everything.

You've heard Detroit, Chicago, Berlin, UK.
Each scene responded to THEIR crisis with THEIR sound.
What's your crisis? What's your response?`,
    },
    exercises: [
      {
        id: 'free',
        title: { es: 'LIENZO EN BLANCO', en: 'BLANK CANVAS' },
        text: {
          es: `Tres caminos para empezar:

1. RESTRICCIÓN: Usa solo 4 voces. Menos = más decisiones.
2. EMOCIÓN: ¿Qué sientes? Ira = ATTACK alto. Melancolía = DECAY largo.
3. ROBO: Copia un pattern de los levels anteriores. Cambia UNA cosa. Itera.

No hay objetivo. Crea algo tuyo.`,
          en: `Three paths to start:

1. RESTRICTION: Use only 4 voices. Less = more decisions.
2. EMOTION: What do you feel? Anger = high ATTACK. Melancholy = long DECAY.
3. THEFT: Copy a pattern from previous levels. Change ONE thing. Iterate.

No objective. Create something yours.`,
        },
        tech: [
          {
            es: 'Borra todo: CLEAR + ENTER → Lienzo vacío. Olvida las reglas de los niveles anteriores por un momento',
            en: 'Clear everything: CLEAR + ENTER → Empty canvas. Forget the rules from previous levels for a moment'
          },
          {
            es: 'Restricción creativa: elige SOLO 4 voces. Menos opciones = más decisiones significativas. Ejemplo: BD, CH, CP, RS',
            en: 'Creative constraint: choose ONLY 4 voices. Fewer options = more meaningful decisions. Example: BD, CH, CP, RS'
          },
          {
            es: 'Empieza con UNA voz. Programa algo. Escucha. ¿Qué falta? ¿Qué sobra? Añade la segunda voz',
            en: 'Start with ONE voice. Program something. Listen. What\'s missing? What\'s too much? Add second voice'
          },
          {
            es: 'Usa emoción como guía: ¿Ira? ATTACK alto, DECAY corto, tempo rápido. ¿Melancolía? ATTACK bajo, DECAY largo, tempo lento',
            en: 'Use emotion as guide: Anger? High ATTACK, short DECAY, fast tempo. Melancholy? Low ATTACK, long DECAY, slow tempo'
          },
          {
            es: 'O roba: copia un pattern de levels anteriores. Cambia UNA cosa. Escucha. Cambia otra. Itera hasta que sea tuyo',
            en: 'Or steal: copy a pattern from previous levels. Change ONE thing. Listen. Change another. Iterate until it\'s yours'
          },
          {
            es: 'Guarda tu trabajo: SETTINGS → SAVE → selecciona slot → ENTER → Tu pattern está guardado para siempre',
            en: 'Save your work: SETTINGS → SAVE → select slot → ENTER → Your pattern is saved forever'
          },
        ],
        type: 'theory',
        check: (s) => s.constraints, // Reuse a state key or add new one
      },
      {
        id: 'constraints',
        title: { es: 'RESTRICCIONES CREATIVAS', en: 'CREATIVE CONSTRAINTS' },
        text: {
          es: `La libertad total paraliza. Las restricciones liberan.

Intenta estos ejercicios:
- Solo hi-hats: crea groove sin kick
- Sin backbeat: ¿cómo creas tensión sin clap en 2 y 4?
- Polymeter extremo: BD en 16, todo lo demás en números primos (7, 11, 13)
- Un solo knob: elige UN parámetro y explora todo su rango

El límite es el lienzo.`,
          en: `Total freedom paralyzes. Constraints liberate.

Try these exercises:
- Only hi-hats: create groove without kick
- No backbeat: how do you create tension without clap on 2 and 4?
- Extreme polymeter: BD on 16, everything else on primes (7, 11, 13)
- One knob only: choose ONE parameter and explore its full range

The limit is the canvas.`,
        },
        tech: [
          {
            es: 'Ejercicio 1 - Solo hi-hats: borra todo excepto CH y OH → ¿Puedes crear groove sin kick? El hi-hat puede implicar el pulso',
            en: 'Exercise 1 - Only hi-hats: clear everything except CH and OH → Can you create groove without kick? Hi-hat can imply the pulse'
          },
          {
            es: 'Ejercicio 2 - Sin backbeat: no CP ni SD en 5 y 13 → Usa RS, toms u otras voces. ¿Cómo creas tensión sin el backbeat?',
            en: 'Exercise 2 - No backbeat: no CP or SD on 5 and 13 → Use RS, toms or other voices. How do you create tension without backbeat?'
          },
          {
            es: 'Ejercicio 3 - Polymeter extremo: SETTINGS → POLY → BD = 16 (normal), CH = 7, RS = 11, CP = 13 → Caos controlado',
            en: 'Exercise 3 - Extreme polymeter: SETTINGS → POLY → BD = 16 (normal), CH = 7, RS = 11, CP = 13 → Controlled chaos'
          },
          {
            es: 'Ejercicio 4 - Un solo knob: elige BD TUNE. Programa un pattern simple. Gira SOLO ese knob durante 5 minutos. Escucha cada matiz',
            en: 'Exercise 4 - One knob only: choose BD TUNE. Program simple pattern. Turn ONLY that knob for 5 minutes. Listen to every nuance'
          },
          {
            es: 'La restricción revela tu estilo. Sin límites, todo suena igual. Con límites, encuentras TU voz',
            en: 'Constraint reveals your style. Without limits, everything sounds the same. With limits, you find YOUR voice'
          },
        ],
        type: 'theory',
        check: (s) => s.constraints,
      },
    ],
  },
  {
    id: 16,
    n: 'XVI',
    title: { es: 'EL CICLO', en: 'THE CYCLE' },
    sub: { es: 'Producción', en: 'Production' },
    color: C.red,
    intro: {
      es: `El estudio es laboratorio. La pista de baile es prueba de fuego.

No esperes a que esté "listo". Graba, prueba, aprende, itera.
El ciclo nunca termina—solo evoluciona.`,
      en: `The studio is the laboratory. The dance floor is the test.

Don't wait until it's "ready". Record, test, learn, iterate.
The cycle never ends—it only evolves.`,
    },
    exercises: [
      {
        id: 'record',
        title: { es: 'GRABA', en: 'RECORD' },
        text: {
          es: `La RD-9 es analógica. El volumen importa.

GAIN STAGING (Escenario de Ganancia):
Si todas las voces están al 100%, saturarás la salida (distorsión no deseada).
• Mantén los niveles de las voces individuales al 70-80%.
• Deja "Headroom" (espacio) en tu interface de audio (-6dB pico).

Es mejor grabar limpio y subir volumen después, que grabar distorsionado y no poder arreglarlo.`,
          en: `The RD-9 is analog. Volume matters.

GAIN STAGING:
If all voices are at 100%, you will saturate the output (unwanted distortion).
• Keep individual voice levels at 70-80%.
• Leave "Headroom" on your audio interface (-6dB peak).

It is better to record clean and boost later, than to record distorted and be unable to fix it.`,
        },
        tech: [
          {
            es: 'Conexión básica: MAIN OUT → Interface. Si usas salidas individuales, la señal es más pura (bypassea el filtro principal)',
            en: 'Basic connection: MAIN OUT → Interface. If using individual outs, signal is purer (bypasses main filter)'
          },
          {
            es: 'Conexión USB: cable USB-B → tu ordenador → tu DAW reconoce la RD-9 como dispositivo MIDI. Sync automático del tempo',
            en: 'USB connection: USB-B cable → your computer → DAW recognizes RD-9 as MIDI device. Automatic tempo sync'
          },
          {
            es: 'Salidas individuales (panel trasero, 10 jacks): BD, SD, LT, MT, HT, RS, CP, CH, OH, CR/RD → Cada voz a su propio canal para mezcla profesional',
            en: 'Individual outputs (back panel, 10 jacks): BD, SD, LT, MT, HT, RS, CP, CH, OH, CR/RD → Each voice to its own channel for professional mixing'
          },
          {
            es: 'En tu DAW: crea pista de audio, arma para grabación, ajusta niveles (pico a -6dB aprox), pulsa REC en DAW, luego PLAY en RD-9',
            en: 'In your DAW: create audio track, arm for recording, adjust levels (peak around -6dB), press REC in DAW, then PLAY on RD-9'
          },
          {
            es: 'Graba 8-16 compases sin parar. No edites todavía. Solo captura el groove. La magia está en la imperfección del loop',
            en: 'Record 8-16 bars without stopping. Don\'t edit yet. Just capture the groove. Magic is in the loop\'s imperfection'
          },
        ],
        type: 'theory',
        check: (s) => s.record,
      },
      {
        id: 'cycle',
        title: { es: 'ITERA', en: 'ITERATE' },
        text: {
          es: `El ciclo del productor:

1. PRODUCE: Crea un pattern en la RD-9
2. GRABA: Captura audio en tu DAW
3. PRUEBA: Escucha en diferentes sistemas (auriculares, monitores, coche, teléfono)
4. APRENDE: ¿Qué funciona? ¿Qué no?
5. REPITE: Vuelve al paso 1

Este ciclo nunca termina.
Los mejores productores son los que más iteran.

Ahora tienes las herramientas. El resto es práctica.`,
          en: `The producer's cycle:

1. PRODUCE: Create a pattern on the RD-9
2. RECORD: Capture audio in your DAW
3. TEST: Listen on different systems (headphones, monitors, car, phone)
4. LEARN: What works? What doesn't?
5. REPEAT: Back to step 1

This cycle never ends.
The best producers are those who iterate the most.

Now you have the tools. The rest is practice.`,
        },
        tech: [
          {
            es: 'Paso 1 - PRODUCE: Abre la RD-9. Crea algo. No importa qué. El primer pattern es basura—todos lo son. Sigue',
            en: 'Step 1 - PRODUCE: Open the RD-9. Create something. Doesn\'t matter what. First pattern is garbage—they all are. Continue'
          },
          {
            es: 'Paso 2 - GRABA: Captura tu pattern en audio. No esperes a que sea perfecto. Graba el proceso, no el resultado',
            en: 'Step 2 - RECORD: Capture your pattern to audio. Don\'t wait for perfection. Record the process, not the result'
          },
          {
            es: 'Paso 3 - PRUEBA: Escucha en auriculares. En monitores. En el coche. En el teléfono. Cada sistema revela diferentes verdades',
            en: 'Step 3 - TEST: Listen on headphones. On monitors. In the car. On phone. Each system reveals different truths'
          },
          {
            es: 'Paso 4 - APRENDE: ¿El kick corta bien? ¿Los hi-hats molestan? ¿El groove funciona a las 3am? Anota. Recuerda',
            en: 'Step 4 - LEARN: Does kick cut through? Are hi-hats annoying? Does groove work at 3am? Note. Remember'
          },
          {
            es: 'Paso 5 - REPITE: Vuelve a la RD-9. Aplica lo aprendido. Crea otro pattern. Itera. Los mejores productores son los que más fallan',
            en: 'Step 5 - REPEAT: Return to RD-9. Apply what you learned. Create another pattern. Iterate. Best producers are those who fail most'
          },
          {
            es: 'El ciclo nunca termina. Pero ahora tienes las herramientas. Sal y crea',
            en: 'The cycle never ends. But now you have the tools. Go out and create'
          },
        ],
        type: 'final',
        check: (s) => s.cycle,
      },
    ],
  },
];
