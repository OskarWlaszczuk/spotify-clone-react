interface ToPageParams {
    additionalPath?: string | undefined | any;
};

interface ToDetailsPageParams extends ToPageParams {
    id: string;
};

type ToPage = (optionalParams?: ToPageParams) => string;
type ToDetailsPage = (params: ToDetailsPageParams) => string;

export const toHome: ToPage = ({ additionalPath = '' } = { additionalPath: '' }) => `/home/${additionalPath}`;
export const toSearch: ToPage = () => "/search";

export const toAlbum = ({ id }: { id: string } = { id: "" }) => `/album/${id}`;
export const toArtist: ToDetailsPage = ({ id, additionalPath = '' } = { id: '', additionalPath: '' }) => `/artist/${id}/${additionalPath}`;
export const toTrack = ({ id }: { id: string } = { id: "" }) => `/track/${id}`;