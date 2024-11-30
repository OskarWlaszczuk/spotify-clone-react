import { getYear } from "./getYear";

export const renderMetaDataContent = ({releaseDate, duration, uniqueData}) => [
    getYear(releaseDate), duration, uniqueData
].join(" • ");