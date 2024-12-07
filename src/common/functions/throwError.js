export const throwError = (alert, error) => {
    console.error(alert, error);
    throw new Error(error);
};