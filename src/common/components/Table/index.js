import { useSelector } from "react-redux"
import { selectArtistTopTracks } from "../../../slices/artistTopTracksSlice"
import { Image, Row, StyledTable, Caption, TrackOverview, TrackStats, RowHeader, TrackName, TrackStat } from "./styled";
import { useState } from "react";

export const Table = () => {
    const topTracks = useSelector(selectArtistTopTracks);
    const [hideRestTracks, setHideRestTracks] = useState(true);

    return (
        <StyledTable>
            {
                topTracks && (
                    <>
                        <Caption>Popular</Caption>
                        {
                            topTracks.tracks
                                .filter((_, index) => (
                                    hideRestTracks ? index < 5 : index <= 10
                                ))
                                .map(({ album, name, popularity, duration_ms }, index) => (
                                    <Row key={index}>
                                        <TrackOverview>
                                            <RowHeader scope="row">{index + 1}</RowHeader>
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
                        <button
                            onClick={() => setHideRestTracks(hideRestTracks => !hideRestTracks)}
                        >
                            {hideRestTracks ? <>Show more</> : <>Show less</>}
                        </button>
                    </>
                )
            }
        </StyledTable>
    );
};