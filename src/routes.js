export const toHome = () => "/home";
export const toArtist = () => "/artist";
export const toSearch = () => "/search";
export const toAlbum = () => "/album";
export const popularListPathname = () => "/popularList";

export const toPopularList = (navigate, datas) => {
    navigate("/popularList", datas)
};