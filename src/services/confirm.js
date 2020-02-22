/**
 * В целях простоты максимально простая логика
 */
export default () => {
  let code = null;
  return {
    generateCode() {
      code = `${Math.floor(Math.random() * 10000)}`.padEnd(4, '0');
      /* eslint-disable */
      alert(`Code: ${code}`);
      return Promise.resolve();
    },
    confirm(v) {
      return Promise.resolve(code === v);
    },
  };
};
