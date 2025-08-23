export const removeSensitiveData = (model, token: string) => {
  const removeSensitive = model.$hiddenFields(); // do model do objection

  removeSensitive.forEach((field: string) => delete model[field]);

  return { ...model, token };
};
