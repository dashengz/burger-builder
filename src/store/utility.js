export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const wrapWithQuote = str => {
    return '"' + str + '"';
};