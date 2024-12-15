import { WithReleaseDate } from "../Interfaces/WithReleaseDate";

export const sortFromOldestToNewest = <T extends WithReleaseDate>(array: T[] = []): T[] => (
    [...array].sort(
        (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
    )
);