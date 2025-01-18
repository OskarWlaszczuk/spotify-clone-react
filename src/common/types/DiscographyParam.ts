import {albumsParamDiscography, allReleaseParamDiscography, singleParamDiscography, compilationParamDiscography} from "../constants/artistDiscographyParams";

export type DiscographyParam =
    | typeof allReleaseParamDiscography
    | typeof albumsParamDiscography
    | typeof singleParamDiscography
    | typeof compilationParamDiscography;