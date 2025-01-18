export const capitalizeFirstLetter = (word: string) => (
    word?.slice(0, 1).toUpperCase() + word?.slice(1)
);