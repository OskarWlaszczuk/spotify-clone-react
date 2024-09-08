import { useEffect, useRef, useState } from "react";
import { Tile } from "../Tile";
import { List, TitleContent, Title, PopularListLink } from "./styled";

export const TilesList = ({ header, hideRestListPart, toPopularList, artistsList, list, listType }) => {

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
        calculateTilesPerRow();
        window.addEventListener('resize', calculateTilesPerRow);

        return () => {
            window.removeEventListener('resize', calculateTilesPerRow);
        };
    }, []);

    return (
        <>
            <TitleContent>
                {header && <Title as={hideRestListPart ? "h2" : "h1"}>{header}</Title>}
                {hideRestListPart && <PopularListLink onClick={toPopularList}>Show more</PopularListLink>}
            </TitleContent>
            <List ref={containerRef}>
                {
                    hideRestListPart ?
                        list.slice(0, tilesPerRow).map(({ name, image, job }) => (
                            <Tile
                                useArtistLayout={artistsList}
                                title={name}
                                picture={image}
                                subInfo={job}
                            />
                        )) :
                        list.map(({ name, image, job }) => (
                            <Tile
                                useArtistLayout={artistsList}
                                title={name}
                                picture={image}
                                subInfo={job}
                            />
                        ))
                }
            </List>
        </>
    );
}