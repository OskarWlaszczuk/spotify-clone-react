export const toHome = () => "/home";
export const toSearch = () => "/search";
export const toAlbum = () => "/album";
export const toListPage = () => "/listPage";

export const toArtist = ({ id } = { id: "id" }) => `/artist/${id}`;

// export const toListPage = (navigate, datas) => {
//     navigate("/listPage", datas)
// };