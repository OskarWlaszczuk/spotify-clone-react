type CapitalizeFirstLetterFunction = (word: string) => string;

export const capitalizeFirstLetter: CapitalizeFirstLetterFunction = (word) => (
    word?.slice(0, 1).toUpperCase() + word?.slice(1)
);