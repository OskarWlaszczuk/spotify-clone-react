import { isMatch } from "./isMatch"

export const filterByAlbumGroup = (album, targetAlbumGroup) => album?.filter(({ album_type }) => isMatch(album_type, targetAlbumGroup));