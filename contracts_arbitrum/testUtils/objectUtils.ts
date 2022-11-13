
export const onlyFields = <T>(object): T => Object.entries(object).reduce((acc, [name, value]) => {
  if (!name.match(/^[0-9]+$/)) {
    acc[name] = value;
  }
  if (isObject(acc[name])) {
    acc[name] = onlyFields(acc[name])
  }
  return acc;
}, {}) as T

const isObject = (v) => typeof v === 'object' && Object.keys(v).some(k => !k.match(/^[0-9]+$/))
