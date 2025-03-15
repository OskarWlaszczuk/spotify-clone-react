import { FacetCategory } from "../../features/homePage/constants/facetCategories";

interface ToPageParams {
    fullListType?: string | undefined;
    facetType?: FacetCategory;
};

interface ToDetailsPageParams extends ToPageParams {
    id: string;
};

type ToPage = (optionalParams?: ToPageParams) => string;
type ToDetailsPage = (params: ToDetailsPageParams) => string;

export const toHome: ToPage = ({ fullListType = '', facetType = "" } = { fullListType: '' }) => `/home/${facetType}${fullListType}`;
export const toSearch: ToPage = () => "/search";

export const toAlbum = ({ id }: { id: string } = { id: "" }) => `/album/${id}`;
export const toArtist: ToDetailsPage = ({ id, fullListType = '' } = { id: '', fullListType: '' }) => `/artist/${id}/${fullListType}`;
export const toTrack = ({ id }: { id: string } = { id: "" }) => `/track/${id}`;
export const toShow: ToDetailsPage = ({ id }: { id: string } = { id: "" }) => `/show/${id}`;
export const toEpisode: ToDetailsPage = ({ id }: { id: string } = { id: "" }) => `/episode/${id}`;