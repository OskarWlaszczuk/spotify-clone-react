export const convertMinutesToHours = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const remainingMinutes = (timeInMinutes % 60).toFixed(0);

    return `${hours}hr${remainingMinutes}min`;
};