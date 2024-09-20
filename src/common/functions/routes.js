export const toHome = () => "/home";
export const toSearch = () => "/search";
export const toAlbum = () => "/album";
export const popularListPathname = () => "/popularList";

export const toArtist = ({ id } = {id: "id"}) => `/artist/${id}`;

export const toPopularList = (navigate, datas) => {
    navigate("/popularList", datas)
};