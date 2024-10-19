import { ReleaseInfo } from "../interfaces/ReleaseInfo";

export const isLatestReleased = (album: ReleaseInfo): boolean => new Date(album?.release_date).getFullYear() === new Date().getFullYear();