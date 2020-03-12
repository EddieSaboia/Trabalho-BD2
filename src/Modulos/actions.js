export const LOAD_WORDS = "LOAD_WORDS";
export const SAVE_WORDS = "SAVE_WORDS";

export function loadWords() {
  return { type: LOAD_WORDS };
}

export function saveWords(word) {
  return { type: SAVE_WORDS, word };
}