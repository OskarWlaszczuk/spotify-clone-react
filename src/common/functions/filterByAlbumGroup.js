import { isMatch } from "./isMatch"

export const filterByAlbumGroup = (album, targetAlbumGroup) => album?.filter(({ album_group }) => isMatch(album_group, targetAlbumGroup));