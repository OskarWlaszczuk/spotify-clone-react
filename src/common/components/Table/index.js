import { useSelector } from "react-redux";
import { Image, Row, StyledTable, Caption, TrackOverview, TrackStats, RowHeader, TrackName, TrackStat } from "./styled";
import { useEffect, useRef, useState } from "react";
import { artistTopTracksSelectors } from "../../../features/artistDetailsPage/slices/artistTopTracksSlice";

export const Table = () => {
    const topTracks = useSelector(artistTopTracksSelectors.selectDatas)?.datas.tracks;
    const [hideRestTracks, setHideRestTracks] = useState(true);

    // const trackNameRefs = useRef([]);
    // const [isOverflowingArray, setIsOverflowingArray] = useState([]);

    // const onTrackNameResize = () => {
    //     const newOverflowingArray = trackNameRefs.current.map(trackNameRef =>
    //         trackNameRef.scrollWidth > trackNameRef.clientWidth
    //     );
    //     setIsOverflowingArray(newOverflowingArray);
    // };

    // useEffect(() => {
    //     window.addEventListener('resize', onTrackNameResize);
    //     onTrackNameResize(); // Sprawdzenie po załadowaniu elementu

    //     return () => {
    //         window.removeEventListener('resize', onTrackNameResize);
    //     };
    // }, [topTracks]);

    return (
        <StyledTable>
            {topTracks && (
                <>
                    <Caption>Popular</Caption>
                    {
                        topTracks
                            .filter((_, index) => (hideRestTracks ? index < 5 : index <= 10))
                            .map(({ album, name, popularity, duration_ms }, index) => (
                                <Row key={index}>
                                    <TrackOverview>
                                        <RowHeader scope="row">{index + 1}</RowHeader>
                                        <td><Image src={album.images[0].url} /></td>
                                        <TrackName
                                        // ref={trackNameRef => trackNameRefs.current[index] = trackNameRef}
                                        // $ellipsis={isOverflowingArray[index]}
                                        >
                                            {name}
                                        </TrackName>
                                    </TrackOverview>
                                    <TrackStats>
                                        <TrackStat>{popularity}/100</TrackStat>
                                        <TrackStat>{(duration_ms / 60000).toFixed(2).replace(".", ":")}</TrackStat>
                                    </TrackStats>
                                </Row>
                            ))
                    }
                    <button onClick={() => setHideRestTracks(hideRestTracks => !hideRestTracks)}>
                        {hideRestTracks ? <>Show more</> : <>Show less</>}
                    </button>
                </>
            )}
        </StyledTable>
    );
};
