const PHONE_GROUP_REG = '([0-9]{0,3})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})';
const CODE_PREFIX = '+7';
const GROUP_DELIMITER = '-';
const MASK_SIGN = '_';
const MAX_LEN = 12;

const DEFAULT_OPTIONS = {
  prefix: CODE_PREFIX,
  groupDelimiter: GROUP_DELIMITER,
  maskSign: MASK_SIGN,
  maxLen: MAX_LEN,
};

const createParseReg = options => new RegExp(`([()\\${options.groupDelimiter}\\s])`, 'g');

const createSplitPhoneByGroups = options => (phone) => {
  const reg = new RegExp(`^\\${options.prefix}${PHONE_GROUP_REG}.*$`);
  const matches = phone.match(reg);
  return matches ? matches.slice(1, 5) : [];
};

const createFormatPhone = options => (groups) => {
  const [g1, g2, g3, g4] = groups;
  let formattedValue = options.prefix;
  if (!g1) { return formattedValue; }
  if (g1.length < 3) { return `${formattedValue}(${g1}`; }
  if (g1.length === 3) {
    formattedValue += `(${g1}`;
  }
  if (!g2) { return formattedValue; }
  if (g2) {
    formattedValue += `) ${g2}`;
  }
  if (!g3) { return formattedValue; }
  if (g3) {
    formattedValue += `${options.groupDelimiter}${g3}`;
  }
  if (!g4) { return formattedValue; }
  if (g4) {
    formattedValue += `${options.groupDelimiter}${g4}`;
  }

  return formattedValue;
};

const createFormatPlaceholder = options => (groups) => {
  const [g1 = '', g2 = '', g3 = '', g4 = ''] = groups;
  let formattedValue = options.prefix;
  formattedValue += `(${g1.padEnd(3, options.maskSign)})`;
  formattedValue += ` ${g2.padEnd(3, options.maskSign)}`;
  formattedValue += `${options.groupDelimiter}${g3.padEnd(2, options.maskSign)}`;
  formattedValue += `${options.groupDelimiter}${g4.padEnd(2, options.maskSign)}`;

  return formattedValue;
};

/**
 * Форматтер номера телефона
 * Параметры
 *  prefix - код страны, всегда есть в поле. (+7, +1, +8)
 *  maskSign - символ для маски ввода (_)
 *  groupDelimiter - символ разделител(-) (321) 312<groupDelimiter>31<groupDelimiter>23
 *  maxLen - длинна успешно заполненного номера (12)
 */
export const formatter = (options) => {
  const normalizedOptions = { ...DEFAULT_OPTIONS, ...options };
  const splitPhoneByGroups = createSplitPhoneByGroups(normalizedOptions);
  const formatPhone = createFormatPhone(normalizedOptions);
  const formatPlaceholder = createFormatPlaceholder(normalizedOptions);
  const parseReg = createParseReg(normalizedOptions);
  return {
    /**
     * Форматировать номер
     * +73213123123 -> +7(321) 312-31-23
     */
    format(phone) {
      const groups = splitPhoneByGroups(phone);
      return formatPhone(groups);
    },
    /**
     * Форматировать номер с маской
     * +732131231 -> +7(321) 312-31-__
     */
    formatPlaceholder(phone) {
      const groups = splitPhoneByGroups(phone);
      return formatPlaceholder(groups);
    },
    /**
     * Достать номер из отформатированной строки
     * Удалить лишнии символы с конца строки
     * +7(321) 312-31-23 -> +73213123123
     *
     * @param phone
     * @returns {string}
     */
    parse(phone) {
      return phone.replace(parseReg, '').slice(0, normalizedOptions.maxLen);
    },
    /**
     * Проверить длинну строки
     */
    isDone(phone) {
      return this.parse(phone).length === normalizedOptions.maxLen;
    },
  };
};
