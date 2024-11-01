import { useEffect, useRef, useState } from "react";

export const useTilesPerRow = () => {

    const [tilesPerRow, setTilesPerRow] = useState(0);
    const containerRef = useRef(null);

    const calculateTilesPerRow = () => {
        const containerWidth = containerRef.current?.offsetWidth;
        const tileWidth = 165;

        const effectiveTileWidth = tileWidth + 10;
        const count = Math.floor(containerWidth / effectiveTileWidth);
        setTilesPerRow(count);
    };

    useEffect(() => {
        window.addEventListener('resize', calculateTilesPerRow);
        calculateTilesPerRow();

        return () => {
            window.removeEventListener('resize', calculateTilesPerRow);
        };
    });

    return { tilesPerRow, containerRef };
};