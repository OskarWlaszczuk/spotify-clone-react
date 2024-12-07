export const convertToMinutesAndSeconds = (time: number): string => {
    const minutes = Math.floor(time);
    let seconds = Math.round((time % 1) * 100);

    if (seconds >= 60) {
        const extraMinutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes + extraMinutes} min ${seconds > 0 && seconds} sec`;
    }

    return `${minutes} min ${seconds} sec`;
};
