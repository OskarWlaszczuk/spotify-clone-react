import { WithReleaseDate } from "../interfaces/WithReleaseDate";

export const isLatestReleased = <T extends WithReleaseDate>(album: T): boolean => new Date(album?.release_date).getFullYear() === new Date().getFullYear();