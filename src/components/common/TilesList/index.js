import { useEffect, useRef, useState } from "react";
import { List, TitleContent, ExtraContent } from "./styled";
import { useSelector } from "react-redux";
import { selectArtistsFetchStatus } from "../../../slices/artistsSlice";
import { success } from "../../../fetchStatuses";

export const TilesList = ({ title, hideRestListPart, list, renderItem, extraContentText, extraContentLink }) => {
    const artistsFetchStatus = useSelector(selectArtistsFetchStatus);

    const [tilesPerRow, setTilesPerRow] = useState(0);
    const containerRef = useRef(null);

    const calculateTilesPerRow = () => {
        const containerWidth = containerRef.current.offsetWidth;
        const tileWidth = 180;

        const effectiveTileWidth = tileWidth + 10;
        const count = Math.floor(containerWidth / effectiveTileWidth);
        setTilesPerRow(count);
    };

    useEffect(() => {
        if (artistsFetchStatus === success) {
            calculateTilesPerRow();
            window.addEventListener('resize', calculateTilesPerRow);
        }

        return () => {
            window.removeEventListener('resize', calculateTilesPerRow);
        };
    }, [artistsFetchStatus]);

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
            <List ref={containerRef}>
                {iterateOnList(hideRestListPart ? previewList : wholeList)}
            </List>
        </>
    );
};