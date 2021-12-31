const pluralize = (word, count) => {
  if (count === 1) return `${count} ${word}`;
  return `${count} ${word}s`;
};

const getCounter = async ({ db }) => {
  try {
    const counter = await db.get('counter');
    const newCounter = parseInt(counter, 10) + 1;

    await db.put('counter', newCounter);

    return newCounter;
  } catch (e) {
    await db.put('counter', 1);
    return 1;
  }
};

module.exports = {
  alias: '!cafe, !café',
  trigger: /^caf(e|é)$/,
  run: async ({ db }) => {
    const counter = await getCounter({ db });

    return `Jeans já tomou ${pluralize('café', counter)}`;
  },
};
