import { useState } from "react";
import { isMatch } from "../functions/isMatch";

interface TileData {
    activeTileIndex: number | undefined;
    activeTilesListID: number | undefined;
};

export const useActiveTile = () => {
    const [activeTile, setActiveTile] = useState<TileData>({
        activeTileIndex: undefined,
        activeTilesListID: undefined,
    });

    const { activeTileIndex, activeTilesListID } = activeTile;

    const isTileActive = (targetTileIndex: number, targetListId: number): boolean => {
        return isMatch(activeTileIndex, targetTileIndex) && isMatch(activeTilesListID, targetListId)
    };

    return { setActiveTile, isTileActive };
};