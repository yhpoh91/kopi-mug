const newClass = (factory, parameters = []) => {
  const bindingParameters = [null, ...parameters];
  const instance = new (Function.prototype.bind.apply(factory, bindingParameters));
  return instance;
};

const newFunction = (factory, parameters = []) => {
  const instance = factory(...parameters);
  return instance;
};

export default {
  newClass,
  newFunction,
};
