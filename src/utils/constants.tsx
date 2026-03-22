import { Vector3 } from "three"

export const MIN_Y_POSITION = 0

export const SPEED_MOVEMENT = 0.1
export const TRANSISTOR_SIZE = [0.5, 0.5, 0.5]

export const OX = new Vector3(1, 0, 0)
export const OY = new Vector3(0, 1, 0)
export const OZ = new Vector3(0, 0, 1)

// export const keyMap = [
//   // --- NHÓM ALPHABET (A-Z) ---
//   { name: 'KeyA', keys: ['KeyA'] },
//   { name: 'KeyB', keys: ['KeyB'] },
//   { name: 'KeyC', keys: ['KeyC'] },
//   { name: 'KeyD', keys: ['KeyD'] },
//   { name: 'KeyE', keys: ['KeyE'] },
//   { name: 'KeyF', keys: ['KeyF'] },
//   { name: 'KeyG', keys: ['KeyG'] },
//   { name: 'KeyH', keys: ['KeyH'] },
//   { name: 'KeyI', keys: ['KeyI'] },
//   { name: 'KeyJ', keys: ['KeyJ'] },
//   { name: 'KeyK', keys: ['KeyK'] },
//   { name: 'KeyL', keys: ['KeyL'] },
//   { name: 'KeyM', keys: ['KeyM'] },
//   { name: 'KeyN', keys: ['KeyN'] },
//   { name: 'KeyO', keys: ['KeyO'] },
//   { name: 'KeyP', keys: ['KeyP'] },
//   { name: 'KeyQ', keys: ['KeyQ'] },
//   { name: 'KeyR', keys: ['KeyR'] },
//   { name: 'KeyS', keys: ['KeyS'] },
//   { name: 'KeyT', keys: ['KeyT'] },
//   { name: 'KeyU', keys: ['KeyU'] },
//   { name: 'KeyV', keys: ['KeyV'] },
//   { name: 'KeyW', keys: ['KeyW'] },
//   { name: 'KeyX', keys: ['KeyX'] },
//   { name: 'KeyY', keys: ['KeyY'] },
//   { name: 'KeyZ', keys: ['KeyZ'] },

//   // --- NHÓM NUMBER (Hàng phím số trên cùng) ---
//   { name: 'Digit0', keys: ['Digit0'] },
//   { name: 'Digit1', keys: ['Digit1'] },
//   { name: 'Digit2', keys: ['Digit2'] },
//   { name: 'Digit3', keys: ['Digit3'] },
//   { name: 'Digit4', keys: ['Digit4'] },
//   { name: 'Digit5', keys: ['Digit5'] },
//   { name: 'Digit6', keys: ['Digit6'] },
//   { name: 'Digit7', keys: ['Digit7'] },
//   { name: 'Digit8', keys: ['Digit8'] },
//   { name: 'Digit9', keys: ['Digit9'] },

//   // --- NHÓM ARROW (Phím mũi tên) ---
//   { name: 'ArrowUp', keys: ['ArrowUp'] },
//   { name: 'ArrowDown', keys: ['ArrowDown'] },
//   { name: 'ArrowLeft', keys: ['ArrowLeft'] },
//   { name: 'ArrowRight', keys: ['ArrowRight'] },

//   // --- NHÓM MODIFIERS (Phím chức năng hệ thống) ---
//   { name: 'ShiftLeft', keys: ['ShiftLeft'] },
//   { name: 'ShiftRight', keys: ['ShiftRight'] },
//   { name: 'ControlLeft', keys: ['ControlLeft'] },
//   { name: 'ControlRight', keys: ['ControlRight'] },
//   { name: 'AltLeft', keys: ['AltLeft'] },
//   { name: 'AltRight', keys: ['AltRight'] },
//   { name: 'Space', keys: ['Space'] },
//   { name: 'Enter', keys: ['Enter'] },
//   { name: 'Escape', keys: ['Escape'] },
//   { name: 'Tab', keys: ['Tab'] },
//   { name: 'Backspace', keys: ['Backspace'] },
//   { name: 'MetaLeft', keys: ['MetaLeft'] } // Phím Windows hoặc Command
// ]

export const KEY_EVENTS = {
  // Alphabet
  KeyA: 'KeyA',
  KeyB: 'KeyB',
  KeyC: 'KeyC',
  KeyD: 'KeyD',
  KeyE: 'KeyE',
  KeyF: 'KeyF',
  KeyG: 'KeyG',
  KeyH: 'KeyH',
  KeyI: 'KeyI',
  KeyJ: 'KeyJ',
  KeyK: 'KeyK',
  KeyL: 'KeyL',
  KeyM: 'KeyM',
  KeyN: 'KeyN',
  KeyO: 'KeyO',
  KeyP: 'KeyP',
  KeyQ: 'KeyQ',
  KeyR: 'KeyR',
  KeyS: 'KeyS',
  KeyT: 'KeyT',
  KeyU: 'KeyU',
  KeyV: 'KeyV',
  KeyW: 'KeyW',
  KeyX: 'KeyX',
  KeyY: 'KeyY',
  KeyZ: 'KeyZ',

  // Numbers
  Digit0: 'Digit0',
  Digit1: 'Digit1',
  Digit2: 'Digit2',
  Digit3: 'Digit3',
  Digit4: 'Digit4',
  Digit5: 'Digit5',
  Digit6: 'Digit6',
  Digit7: 'Digit7',
  Digit8: 'Digit8',
  Digit9: 'Digit9',

  // Arrows
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',

  // Modifiers
  ShiftLeft: 'ShiftLeft',
  ShiftRight: 'ShiftRight',
  ControlLeft: 'ControlLeft',
  ControlRight: 'ControlRight',
  AltLeft: 'AltLeft',
  AltRight: 'AltRight',
  Space: 'Space',
  Enter: 'Enter',
  Escape: 'Escape',
  Tab: 'Tab',
  Backspace: 'Backspace',
  MetaLeft: 'MetaLeft',
}

export const keyMap = Object.values(KEY_EVENTS).map((key) => ({ name: key, keys: [key], }));