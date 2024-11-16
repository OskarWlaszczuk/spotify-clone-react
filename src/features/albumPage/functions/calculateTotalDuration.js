import { convertMinutesToHours } from "../../../common/functions/convertMinutesToHours";
import { convertToMinutesAndSeconds } from "../../../common/functions/convertToMinutesAndSeconds";
import { fromMillisecondsToMinutes } from "../../../common/functions/fromMillisecondsToMinutes";

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