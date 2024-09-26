import { useEffect, useRef, useState } from "react";
import { List, TitleContent, ExtraContent } from "./styled";

export const TilesList = ({
    title,
    subContent,
    hideRestListPart,
    list,
    renderItem,
    extraContentText,
    extraContentAction,
    navigateTo
}) => {

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
        return list.map((item, index) => (
            renderItem(item, index)
        ))
    };

    const headerElement = hideRestListPart ? <h2>{title}</h2> : <h1>{title}</h1>;

    return (
        <>
            <TitleContent>
                {headerElement}
                {hideRestListPart &&
                    <ExtraContent
                        to={navigateTo}
                        onClick={() => extraContentAction()}
                    >
                        {extraContentText}
                    </ExtraContent>
                }
            </TitleContent >
            {subContent}
            < List ref={containerRef} >
                {iterateOnList(hideRestListPart ? previewList : wholeList)}
            </List >
        </>
    );
};