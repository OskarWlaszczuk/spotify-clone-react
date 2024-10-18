import { useState } from "react";

interface TileDatas {
    activeTileIndex: number | undefined;
    activeTilesListID: number | undefined;
}

export const useActiveTile = () => {
    const [activeTile, setActiveTile] = useState<TileDatas>({
        activeTileIndex: undefined,
        activeTilesListID: undefined,
    });

    const { activeTileIndex, activeTilesListID } = activeTile;

    const isTileActive = (targetTileIndex: number, targetListId: number): boolean => {
        return activeTileIndex === targetTileIndex && activeTilesListID === targetListId
    };

    return { setActiveTile, isTileActive };
};