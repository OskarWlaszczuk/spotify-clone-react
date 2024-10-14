import { useState } from "react";

export const useActiveTile = () => {

    const [activeTile, setActiveTile] = useState({
        activeTileIndex: undefined,
        activeTilesListID: undefined,
    });

    const { activeTileIndex, activeTilesListID } = activeTile;

    const isTileActive = (targetTileIndex: number, targetListId: number): boolean => {
        return activeTileIndex === targetTileIndex && activeTilesListID === targetListId
    };

    return { setActiveTile, isTileActive };
};