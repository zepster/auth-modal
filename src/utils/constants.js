/**
 * Константы и функции кодов клавиатуры
 */
export const KEY_CODES = {
  CODES: {
    BS: 8,
    ENTER: 13,
    DEL: 46,
    TAB: 9,
  },
  tests: {
    /**
     * 48 - 49 - коды от 0 до 9
     * @param keyCode
     * @returns {boolean|boolean}
     */
    isNumber: (event) => {
      const {
        keyCode,
        shiftKey,
        altKey,
        ctrlKey,
        metaKey,
      } = event;
      return !shiftKey && !altKey && !ctrlKey && !metaKey && keyCode >= 48 && keyCode <= 57;
    },
  },
};
