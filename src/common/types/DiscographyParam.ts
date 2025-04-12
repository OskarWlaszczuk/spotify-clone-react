import {albumsParamDiscography, popularReleasesParamDiscography, singleParamDiscography, compilationParamDiscography} from "../constants/artistDiscographyParams";

export type DiscographyParam =
    | typeof popularReleasesParamDiscography
    | typeof albumsParamDiscography
    | typeof singleParamDiscography
    | typeof compilationParamDiscography;