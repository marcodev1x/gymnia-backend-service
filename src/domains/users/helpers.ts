export const removeSensitiveData = (model) => {
    const removeSensitive = model.$hiddenFields(); // do model do objection

    removeSensitive.forEach((field: string) => delete model[field]);

    return { ...model };
};
