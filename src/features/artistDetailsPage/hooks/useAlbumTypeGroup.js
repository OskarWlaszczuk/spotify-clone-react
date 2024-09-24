import { useState } from "react";

export const useAlbumTypeGroup = (newAlbumTypeGroup) => {
    const [albumTypeGroup, setAlbumTypeGroup] = useState(newAlbumTypeGroup);

    return { albumTypeGroup, setAlbumTypeGroup };
};