import { useEffect, useRef, useState } from "react";
import { List, TitleContent, ExtraContent } from "./styled";

export const TilesList = ({ title, hideRestListPart, list, renderItem, moreItems, extraContentText, extraContentLink }) => {
    const [tilesPerRow, setTilesPerRow] = useState(0);
    const containerRef = useRef(null);

    const calculateTilesPerRow = () => {
        const containerWidth = containerRef.current.offsetWidth;
        const tileWidth = 150;

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

    const previewList = list.slice(0, tilesPerRow);
    const wholeList = list;

    const iterateOnList = list => {
        return list.map((item) => (
            renderItem(item)
        ))
    };

    const headerElement = hideRestListPart ? <h2>{title}</h2> : <h1>{title}</h1>;
    return (
        <>
            <TitleContent>
                {headerElement}
                {hideRestListPart && <ExtraContent onClick={extraContentLink}>{extraContentText}</ExtraContent>}
            </TitleContent>
            <List ref={containerRef} moreItems={moreItems}>
                {iterateOnList(hideRestListPart ? previewList : wholeList)}
            </List>

        </>
    );
};