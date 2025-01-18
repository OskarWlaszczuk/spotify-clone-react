import {popularReleasesCategory, albumsCategory, singlesCategory, compilationsCategory} from "../../features/artistDetailsPage/constants/releasesCategories";

export type ReleaseCategory =
    | typeof popularReleasesCategory
    | typeof albumsCategory
    | typeof singlesCategory
    | typeof compilationsCategory;