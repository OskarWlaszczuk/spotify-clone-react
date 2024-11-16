interface ToPageParams {
    additionalPath?: string | undefined;
};

interface ToDetailsPageParams extends ToPageParams {
    id: string;
};

type ToPage = (optionalParams?: ToPageParams) => string;
type ToDetailsPage = (params: ToDetailsPageParams) => string;

export const toHome: ToPage = ({ additionalPath = '' } = { additionalPath: '' }) => `/home/${additionalPath}`;
export const toSearch: ToPage = () => "/search";

export const toAlbum = ({ albumID }: { albumID: string } = { albumID: "" }) => `/album/${albumID}`;
export const toArtist: ToDetailsPage = ({ id, additionalPath = '' } = { id: '', additionalPath: '' }) => `/artist/${id}/${additionalPath}`;
export const toTrack = ({ trackID }: { trackID: string } = { trackID: "" }) => `/track/${trackID}`;