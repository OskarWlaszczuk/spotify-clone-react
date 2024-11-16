import { getYear } from "./getYear";

export const renderMetaDatasContent = ({releaseDate, duration, uniqueData}) => [
    getYear(releaseDate), duration, uniqueData
].join(" • ");