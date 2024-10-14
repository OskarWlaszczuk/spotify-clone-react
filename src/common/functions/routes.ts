interface ToPageParams {
    id?: string;
    additionalPath?: string;
};

type ToPage = (optionalParams?: ToPageParams) => string

export const toHome: ToPage = ({ additionalPath = '' } = { additionalPath: '' }) => `/home/${additionalPath}`;

export const toSearch: ToPage = () => "/search";
export const toAlbum: ToPage = () => "/album";

export const toArtist: ToPage = ({ id, additionalPath = '' } = { id: '', additionalPath: '' }) => `/artist/${id}/${additionalPath}`;