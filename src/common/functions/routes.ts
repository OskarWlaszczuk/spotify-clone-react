interface ToPageParams {
    fullListType?: string | undefined;
    facetType?: string | undefined;
};

interface ToDetailsPageParams extends ToPageParams {
    id: string;
};

type ToPage = (optionalParams?: ToPageParams) => string;
type ToDetailsPage = (params: ToDetailsPageParams) => string;

export const toHome: ToPage = ({ fullListType = '', facetType = "" } = { fullListType: '', facetType: "" }) => `/home/${fullListType}${facetType}`;
export const toSearch: ToPage = () => "/search";

export const toAlbum = ({ id }: { id: string } = { id: "" }) => `/album/${id}`;
export const toArtist: ToDetailsPage = ({ id, fullListType = '' } = { id: '', fullListType: '' }) => `/artist/${id}/${fullListType}`;
export const toTrack = ({ id }: { id: string } = { id: "" }) => `/track/${id}`;