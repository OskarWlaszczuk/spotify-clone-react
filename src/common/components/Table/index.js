import { Image, Row, StyledTable, Caption, TrackOverview, RowHeader, TrackName, TrackDuration } from "./styled";
import { useState } from "react";
import { ToggleViewButton } from "../ToggleViewButton";
import { StyledPlayIcon } from "../StyledPlayIcon";
import { getAlbumArtists } from "../../functions/getAlbumArtists";

export const Table = ({ list }) => {
    const [hideRestTracks, setHideRestTracks] = useState(true);
    const [activeIndex, setActiveIndex] = useState(undefined);

    const handleOnRowMouseEnter = (trackIndex) => setActiveIndex(list.findIndex((_, index) => index === trackIndex));
    const handleOnRowMouseLeave = () => setActiveIndex(undefined);

    return (
        <>
            <StyledTable>
                {list && (
                    <>
                        <Caption>Popular</Caption>
                        <tbody>
                            {
                                list
                                    .filter((_, index) => (hideRestTracks ? index < 5 : index <= 10))
                                    .map(({ album, name, duration_ms, artists }, index) => (
                                        <Row
                                            key={index}
                                            onMouseEnter={() => handleOnRowMouseEnter(index)}
                                            onMouseLeave={handleOnRowMouseLeave}
                                        >
                                            <TrackOverview>
                                                <RowHeader
                                                    scope="row"
                                                    title={`Play ${name} by ${getAlbumArtists(artists)}`}
                                                >
                                                    {activeIndex === index ? <StyledPlayIcon /> : index + 1}
                                                </RowHeader>
                                                <td><Image src={album.images[0].url} /></td>
                                                <TrackName>{name}</TrackName>
                                            </TrackOverview>
                                            <TrackDuration>{(duration_ms / 60000).toFixed(2).replace(".", ":")}</TrackDuration>
                                        </Row>
                                    ))
                            }
                        </tbody>
                    </>
                )}
            </StyledTable>
            <ToggleViewButton onClick={() => setHideRestTracks(hideRestTracks => !hideRestTracks)}>
                {hideRestTracks ? <>Show more</> : <>Show less</>}
            </ToggleViewButton>
        </>
    );
};
