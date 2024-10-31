import { WithReleaseDate } from "../interfaces/WithReleaseDate";
import { isLatestReleased } from "./isLatestReleased";

export const setNewestPopularReleaseItemFirstIfIsLatestRelease = <T extends WithReleaseDate>(newestPopularReleaseItem: T | undefined, popularReleases: any) => (
    newestPopularReleaseItem && isLatestReleased(newestPopularReleaseItem)
        ? [{ ...newestPopularReleaseItem }, ...(popularReleases?.slice() ?? [])]
        : popularReleases || []
);