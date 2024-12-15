type GetYearFunction = (date: string) => string;

export const getYear: GetYearFunction = (date) => (
    new Date(date).toLocaleDateString(undefined, {year: "numeric"})
);