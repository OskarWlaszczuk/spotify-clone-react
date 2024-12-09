import { fromMillisecondsToMinutes } from "../../../common/functions/fromMillisecondsToMinutes";

const convertToMinutesAndSeconds = (time) => {
    const minutes = Math.floor(time);
    let seconds = Math.round((time % 1) * 100);

    if (seconds >= 60) {
        const extraMinutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes + extraMinutes} min ${seconds > 0 && seconds} sec`;
    }

    return `${minutes} min ${seconds} sec`;
};

const convertMinutesToHours = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    const remainingMinutes = (timeInMinutes % 60).toFixed(0);

    return `${hours}hr${remainingMinutes}min`;
};

export const calculateTotalDuration = (tracksList) => {
    const albumTracksDurations = tracksList?.map(({ duration_ms }) => duration_ms);
    const albumTotalDuration = fromMillisecondsToMinutes(albumTracksDurations?.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    const albumTotalDurationConverted = (
        albumTotalDuration >= 60 ?
            convertMinutesToHours(albumTotalDuration) :
            convertToMinutesAndSeconds(albumTotalDuration)
    );

    return albumTotalDurationConverted;
};