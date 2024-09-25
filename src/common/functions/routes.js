export const toHome = () => "/home";
export const toSearch = () => "/search";
export const toAlbum = () => "/album";
export const toListPage = () => "/listPage";

export const toArtist = ({ id, additionalPath = '' } = { id: 'id', additionalPath: '' }) => `/artist/${id}${additionalPath}`;

// export const toListPage = (navigate, datas) => {
//     navigate("/listPage", datas)
// };