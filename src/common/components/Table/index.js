import { Image, Row, StyledTable, Caption, TrackOverview, RowHeader, TrackName, TrackDuration, Wrapper } from "./styled";
import { useState } from "react";
import { ToggleViewButton } from "../ToggleViewButton";
import { StyledPlayIcon } from "../StyledPlayIcon";
import { getAlbumArtists } from "../../functions/getAlbumArtists";
import { nanoid } from "nanoid";

export const Table = ({ list }) => {
    const [hideRestTracks, setHideRestTracks] = useState(true);
    const [activeIndex, setActiveIndex] = useState(undefined);


    const handleOnRowMouseEnter = (trackIndex) => setActiveIndex(list.findIndex((_, index) => index === trackIndex));
    const handleOnRowMouseLeave = () => setActiveIndex(undefined);

    // const refs = useRef([]);
    // useEffect(() => {
    //     const checkEllipsis = () => {
    //         if (refs.current.length > 0) {

    //             refs.current.forEach(({ scrollWidth, clientWidth }) => {
    //                 console.log(scrollWidth, clientWidth)
    //             });
    //         }
    //     };

    //     checkEllipsis();

    //     window.addEventListener("resize", checkEllipsis);
    //     return () => window.removeEventListener("resize", checkEllipsis);
    // }, []);

    return (
        <Wrapper>
            <StyledTable>
                {list && (
                    <>
                        <Caption>Popular</Caption>
                        <tbody>
                            {
                                list
                                    .filter((_, index) => (hideRestTracks ? index < 5 : index <= 10))
                                    .map(({ id, album, name, duration_ms, artists }, index) => (
                                        <Row
                                            key={nanoid()}
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
                                                <TrackName
                                                // $isEllipsis={isEllipsis}
                                                // ref={(el) => refs.current[index] = el}
                                                >
                                                    {name}
                                                </TrackName>
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
                See {hideRestTracks ? <>more</> : <>less</>}
            </ToggleViewButton>
        </Wrapper>
    );
};
