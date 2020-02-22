const { formatter } = require('./phoneFormat');

const createFormatter = (opt = {}) => formatter(opt);

describe('formatter: format', () => {
  test('Форматирование полного номера', () => {
    const f = createFormatter();
    expect(f.format('+73213123123')).toBe('+7(321) 312-31-23');
  });
  test('Форматирование части номера', () => {
    const f = createFormatter();
    expect(f.format('+73213123')).toBe('+7(321) 312-3');
  });

  test('Форматирование пустого номера', () => {
    const f = createFormatter();
    expect(f.format('')).toBe('+7');
  });
});

describe('formatter: formatPlaceholder', () => {
  test('Форматирование полного номера', () => {
    const f = createFormatter();
    expect(f.formatPlaceholder('+732131231')).toBe('+7(321) 312-31-__');
  });

  test('Форматирование части номера', () => {
    const f = createFormatter();
    expect(f.formatPlaceholder('+73213123')).toBe('+7(321) 312-3_-__');
  });
});

describe('formatter: parse', () => {
  test('Разбор полного номера в строку', () => {
    const f = createFormatter();
    expect(f.parse('+7(321) 312-31-23')).toBe('+73213123123');
  });

  test('Разбор части номера в строку', () => {
    const f = createFormatter();
    expect(f.parse('+7(321) 312-3')).toBe('+73213123');
  });
});

describe('formatter: isDone', () => {
  test('Проверить полную заполненость номера РФ', () => {
    const f = createFormatter();
    expect(f.isDone('+7(321) 312-31-23')).toBeTruthy();
  });

  test('Проверить не полную заполненость номера РФ: ', () => {
    const f = createFormatter();
    expect(f.isDone('+7(321) 312-31-2')).toBeFalsy();
  });
});


describe('formatter: format + config', () => {
  test('Настраеваемый разделитель групп', () => {
    const f = createFormatter({ groupDelimiter: '+' });
    expect(f.format('+73213123123')).toBe('+7(321) 312+31+23');
  });

  test('Настраеваемый символ маски', () => {
    const maskSign = 'x';
    const f = createFormatter({ maskSign });
    expect(f.formatPlaceholder('+732131231')).toBe(`+7(321) 312-31-${maskSign}${maskSign}`);
  });
});
