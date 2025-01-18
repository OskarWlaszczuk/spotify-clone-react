import { fromMillisecondsToMinutes } from "../../../common/functions/fromMillisecondsToMinutes";
import { TrackItem } from "../../../common/Interfaces/TrackItem";

const convertToMinutesAndSeconds = (timeInHours: number) => {
    const minutes = Math.floor(timeInHours);
    let seconds = Math.round((timeInHours % 1) * 100);

    if (seconds >= 60) {
        const extraMinutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes + extraMinutes} min ${seconds > 0 && seconds} sec`;
    }

    return `${minutes} min ${seconds} sec`;
};

const convertMinutesToHours = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const remainingMinutes = (timeInMinutes % 60).toFixed(0);

    return `${hours}hr${remainingMinutes}min`;
};

export const calculateTotalDuration = (tracksList: TrackItem[]) => {
    const albumTracksDurations = tracksList?.map(({ duration_ms }) => duration_ms);
    const albumTotalDuration = fromMillisecondsToMinutes(albumTracksDurations?.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    const albumTotalDurationConverted = (
        albumTotalDuration >= 60 ?
            convertMinutesToHours(albumTotalDuration) :
            convertToMinutesAndSeconds(albumTotalDuration)
    );

    return albumTotalDurationConverted;
};