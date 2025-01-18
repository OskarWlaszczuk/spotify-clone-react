import { albumType, artistType, trackType, episodeType, showType } from "../constants/mediaItemType";

export type MediaItemType = typeof albumType | typeof artistType | typeof trackType | typeof episodeType | typeof showType;