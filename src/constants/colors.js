/**
 * RD-9 "Real Hardware" Color Palette
 * Derived from the industrial design of the Behringer RD-9.
 */
export const C = {
  // Chassis / Body
  chassis: '#e2e2df', // The main light greige body
  chassisDark: '#d4d4d1', // Slightly darker for gradients/depth

  // Panels
  panelDark: '#262626', // The dark side/bottom panels
  panelInset: '#1a1a1a', // Darker recess areas (screen, ports)

  // Interactive Elements
  knobBody: '#1f1f1f',
  knobTop: '#2a2a2a',
  knobPointer: '#ff5f00', // High-vis orange
  
  // Keys / Buttons
  keyWhite: '#f2f2eb', // The main 1-12 keys (cream/off-white)
  keyGrey: '#9ca3af', // The 13-16 keys (grey)
  keyDark: '#333333', // Function buttons
  
  // Accents
  orange: '#ea580c', // Text accents / pointers
  red: '#dc2626',
  redGlow: '#ef4444',
  green: '#16a34a',
  yellow: '#eab308',

  // Text / Ink
  ink: '#171717', // Main label text (almost black)
  textLight: '#e5e5e5', // Text on dark panels
  textMuted: '#737373',

  // UI Structure
  border: '#a3a3a3',
  shadowLight: 'rgba(255, 255, 255, 0.5)',
  shadowDark: 'rgba(0, 0, 0, 0.4)',

  // --- BACKWARDS COMPATIBILITY TOKENS ---
  // Mapping old tokens to new ones to prevent crashes in non-refactored views
  surface: '#121212', // Dark background for the "App" container
  panelLight: '#e2e2df', // Maps to chassis
  panelMid: '#262626', // Maps to panelDark
  buttonOff: '#333333',
  buttonOn: '#f2f2eb',
  knobLight: '#4a4a4a',
  knobDark: '#1f1f1f',
  textDark: '#171717',
};
