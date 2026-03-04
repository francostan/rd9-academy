/**
 * RD-9 Voice Definitions
 * 11 drum voices (7 analog, 4 sample-based) with their parameters
 */
export const VOICES = {
  BD: { name: 'BASS DRUM', color: '#ff6b35', params: ['TUNE', 'LEVEL', 'ATTACK', 'DECAY', 'P.DEPTH', 'PITCH'] },
  SD: { name: 'SNARE DRUM', color: '#ff9f1c', params: ['TUNE', 'LEVEL', 'TONE', 'SNAPPY'] },
  LT: { name: 'LOW TOM', color: '#2ec4b6', params: ['TUNE', 'LEVEL', 'DECAY'] },
  MT: { name: 'MID TOM', color: '#00b4d8', params: ['TUNE', 'LEVEL', 'DECAY'] },
  HT: { name: 'HI TOM', color: '#48cae4', params: ['TUNE', 'LEVEL', 'DECAY'] },
  RS: { name: 'RIM SHOT', color: '#9d4edd', params: ['LEVEL'] },
  CP: { name: 'CLAP', color: '#c77dff', params: ['LEVEL'] },
  CH: { name: 'CLOSED HAT', color: '#d4a520', params: ['TUNE', 'LEVEL', 'DECAY'] },
  OH: { name: 'OPEN HAT', color: '#b8860b', params: ['TUNE', 'LEVEL', 'DECAY'] },
  CR: { name: 'CRASH', color: '#06d6a0', params: ['LEVEL', 'TUNE'] },
  RD: { name: 'RIDE', color: '#118ab2', params: ['LEVEL', 'TUNE'] },
};
