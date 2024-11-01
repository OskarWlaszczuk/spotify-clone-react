import { ContentRow, StyledTable, Caption, TrackOverview, Index, TrackName, TrackDuration, Wrapper, TrackArtists, TrackDetailsWrapper, HeaderRow, StyledTimer, Header, ArtistName, DiscNumberContainer, ArtistNameContainer } from "./styled";
import { useState } from "react";
import { ToggleViewButton } from "../ToggleViewButton";
import { StyledPlayIcon } from "../StyledPlayIcon";
import { getAlbumArtists } from "../../functions/getAlbumArtists";
import { nanoid } from "nanoid";
import { TrackListItem } from "../../interfaces/TrackCollection";
import { fromMillisecondsToMinutes } from "../../functions/fromMillisecondsToMinutes";
import { toArtist } from "../../functions/routes";
import { StyledDiscIcon } from "../StyledDiscIcon";
import { AvatarImage } from "../AvatarImage";

interface TableProps {
    list: TrackListItem[];
    discsNumbers?: number[];
    useAlbumView?: boolean;
};

export const Table = ({ list, useAlbumView, discsNumbers }: TableProps) => {
    const [hideRestTracks, setHideRestTracks] = useState<boolean>(!useAlbumView);
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    const handleOnRowMouseEnter = (trackIndex: number): void => setActiveIndex(list.findIndex((_, index: number) => index === trackIndex));
    const handleOnRowMouseLeave = (): void => setActiveIndex(undefined);
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
                {!useAlbumView && <Caption>Popular</Caption>}
                {
                    useAlbumView && (
                        <thead>
                            <HeaderRow $albumViewNotAvailable={!!useAlbumView}>
                                <Header $larger scope="col">#</Header>
                                <Header scope="col">Title</Header>
                                <Header scope="col"><StyledTimer /></Header>
                            </HeaderRow>
                        </thead>
                    )
                }
                <tbody>
                    {
                        discsNumbers && discsNumbers.length > 1 ?
                            discsNumbers?.map(discNumber => {
                                return (
                                    <>
                                        <DiscNumberContainer><StyledDiscIcon /> Disc {discNumber}</DiscNumberContainer>
                                        {
                                            list?.filter((_, index) => (hideRestTracks ? index < 5 : useAlbumView ? index >= 0 : index <= 10))
                                                .filter(({ disc_number }) => disc_number === discNumber)
                                                .map(({ album, name, duration_ms, artists }, index: number) => (
                                                    <>
                                                        <ContentRow
                                                            key={nanoid()}
                                                            onMouseEnter={() => handleOnRowMouseEnter(index)}
                                                            onMouseLeave={handleOnRowMouseLeave}
                                                        >
                                                            <TrackOverview rowSpan={useAlbumView ? 2 : 1}>
                                                                <Index
                                                                    scope="row"
                                                                    title={`Play ${name} by ${getAlbumArtists(artists)}`}
                                                                >
                                                                    {activeIndex === index ? <StyledPlayIcon /> : index + 1}
                                                                </Index>
                                                                {!useAlbumView && <td><AvatarImage src={album.images[0].url} /></td>}
                                                                <TrackDetailsWrapper>
                                                                    <TrackName
                                                                    // $isEllipsis={isEllipsis}
                                                                    // ref={(el) => refs.current[index] = el}
                                                                    >
                                                                        {name}
                                                                    </TrackName>
                                                                    {useAlbumView && (
                                                                        <TrackArtists>{artists?.map(({ name, id }, artistIndex) => (
                                                                            <ArtistName $rowActive={activeIndex === index} to={toArtist({ id })}>{artistIndex !== 0 && ","}{name}</ArtistName>
                                                                        ))}
                                                                        </TrackArtists>)
                                                                    }
                                                                </TrackDetailsWrapper>
                                                            </TrackOverview>
                                                            <TrackDuration>{fromMillisecondsToMinutes(duration_ms).replace(".", ":")}</TrackDuration>
                                                        </ContentRow>
                                                    </>
                                                ))
                                        }
                                    </>
                                )
                            }) :
                            list?.filter((_, index) => (hideRestTracks ? index < 5 : useAlbumView || !hideRestTracks ? index >= 0 : index <= 10))
                                .map(({ album, name, duration_ms, artists }, index: number) => (
                                    <>
                                        <ContentRow
                                            key={nanoid()}
                                            onMouseEnter={() => handleOnRowMouseEnter(index)}
                                            onMouseLeave={handleOnRowMouseLeave}
                                        >
                                            <TrackOverview rowSpan={useAlbumView ? 2 : 1}>
                                                <Index
                                                    scope="row"
                                                    title={`Play ${name} by ${getAlbumArtists(artists)}`}
                                                >
                                                    {activeIndex === index ? <StyledPlayIcon /> : index + 1}
                                                </Index>
                                                {!useAlbumView && <td><AvatarImage src={album.images[0].url} /></td>}
                                                <TrackDetailsWrapper>
                                                    <TrackName
                                                    // $isEllipsis={isEllipsis}
                                                    // ref={(el) => refs.current[index] = el}
                                                    >
                                                        {name}
                                                    </TrackName>
                                                    {useAlbumView && (
                                                        <TrackArtists>{artists?.map(({ name, id }, artistIndex) => (
                                                            <ArtistNameContainer>
                                                                {artistIndex !== 0 && ", "}
                                                                <ArtistName $rowActive={activeIndex === index} to={toArtist({ id })}>{name}</ArtistName>
                                                            </ArtistNameContainer>
                                                        ))}
                                                        </TrackArtists>)
                                                    }
                                                </TrackDetailsWrapper>
                                            </TrackOverview>
                                            <TrackDuration>{fromMillisecondsToMinutes(duration_ms).replace(".", ":")}</TrackDuration>
                                        </ContentRow>
                                    </>
                                ))
                    }
                </tbody>
            </StyledTable>
            {
                (!useAlbumView && list?.length > 5) && (
                    <ToggleViewButton onClick={() => setHideRestTracks(hideRestTracks => !hideRestTracks)}>
                        See {hideRestTracks ? <>more</> : <>less</>}
                    </ToggleViewButton>
                )
            }
        </Wrapper >
    );
};
