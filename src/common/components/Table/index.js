import { Image, Row, StyledTable, Caption, TrackOverview, TrackStats, RowHeader, TrackName, TrackStat } from "./styled";
import { useState } from "react";
import { ToggleViewButton } from "../ToggleViewButton";
import { StyledPlayIcon } from "../StyledPlayIcon";

export const Table = ({ list }) => {
    const [hideRestTracks, setHideRestTracks] = useState(true);
    const [activeIndex, setActiveIndex] = useState(undefined);

    const handleOnRowMouseEnter = (trackIndex) => setActiveIndex(list.findIndex((_, index) => index === trackIndex));
    const handleOnRowMouseLeave = () => setActiveIndex(undefined);

    return (
        <StyledTable>
            {list && (
                <>
                    <Caption>Popular</Caption>
                    {
                        list
                            .filter((_, index) => (hideRestTracks ? index < 5 : index <= 10))
                            .map(({ album, name, popularity, duration_ms }, index) => (
                                <Row
                                    key={index}
                                    onMouseEnter={() => handleOnRowMouseEnter(index)}
                                    onMouseLeave={handleOnRowMouseLeave}
                                >
                                    <TrackOverview>
                                        <RowHeader scope="row">
                                            {activeIndex === index ? <StyledPlayIcon /> : index + 1}
                                        </RowHeader>
                                        <td><Image src={album.images[0].url} /></td>
                                        <TrackName>{name}</TrackName>
                                    </TrackOverview>
                                    <TrackStats>
                                        <TrackStat>{popularity}/100</TrackStat>
                                        <TrackStat>{(duration_ms / 60000).toFixed(2).replace(".", ":")}</TrackStat>
                                    </TrackStats>
                                </Row>
                            ))
                    }
                    <ToggleViewButton onClick={() => setHideRestTracks(hideRestTracks => !hideRestTracks)}>
                        {hideRestTracks ? <>Show more</> : <>Show less</>}
                    </ToggleViewButton>
                </>
            )}
        </StyledTable>
    );
};
