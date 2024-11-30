import { isLatestReleased } from "../../../common/functions/isLatestReleased";
import { WithReleaseDate } from "../../../common/interfaces/WithReleaseDate";

export const replaceReleaseDateIfCurrentYear = <T extends WithReleaseDate>(listItem: T): T => {
    return isLatestReleased(listItem) ?
        { ...listItem, release_date: "Latest Release" } :
        listItem;
};
