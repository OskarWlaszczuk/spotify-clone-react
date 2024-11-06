import { ContentRow, StyledTable, Caption, TrackOverview, Index, TrackName, TrackDuration, Wrapper, TrackArtists, TrackDetailsWrapper, HeaderRow, StyledTimer, Header, ArtistName, DiscNumberContainer, ArtistNameContainer, TrackLink, SubCaption } from "./styled";
import React, { useState } from "react";
import { ToggleViewButton } from "../ToggleViewButton";
import { StyledPlayIcon } from "../StyledPlayIcon";
import { getAlbumArtists } from "../../functions/getAlbumArtists";
import { nanoid } from "nanoid";
import { TrackListItem } from "../../interfaces/TrackCollection";
import { fromMillisecondsToMinutes } from "../../functions/fromMillisecondsToMinutes";
import { toArtist, toTrack } from "../../functions/routes";
import { StyledDiscIcon } from "../StyledDiscIcon";
import { AvatarImage } from "../AvatarImage";

interface TableProps {
    list: TrackListItem[];
    discsNumbers?: number[];
    useAlbumView?: boolean;
    caption?: string;
    subCaption?: string;
};

export const Table = ({ list, useAlbumView, discsNumbers, caption, subCaption }: TableProps) => {
    const [hideRestTracks, setHideRestTracks] = useState<boolean>(!useAlbumView);
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    const handleOnRowMouseEnter = (trackIndex: number): void => setActiveIndex(list.findIndex((_, index: number) => index === trackIndex));
    const handleOnRowMouseLeave = (): void => setActiveIndex(undefined);

    const renderTableContent = (
        {
            list,
            useAlbumView,
            discsNumbers,
            hideRestTracks,
            activeIndex,
            handleOnRowMouseEnter,
            handleOnRowMouseLeave
        }: {
            list: any
            useAlbumView: any;
            discsNumbers: any;
            hideRestTracks: any
            activeIndex: any;
            handleOnRowMouseEnter: any;
            handleOnRowMouseLeave: any;
        }
    ) => {
        const renderRows = (tracks: any) => tracks?.map(({ album, name, duration_ms, artists, id }: { album: any, name: any, duration_ms: any, artists: any, id: any }, index: any) => (
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
                        <TrackName>
                            <TrackLink to={toTrack({ trackID: id, artistsIDs: artists.map(({ id }: any) => id).join(",") })}>{name}</TrackLink>
                        </TrackName>
                        {useAlbumView && (
                            <TrackArtists>
                                {artists?.map(({ name, id }: { name: any, id: any }, artistIndex: any) => (
                                    <ArtistNameContainer key={id}>
                                        {artistIndex !== 0 && ", "}
                                        <ArtistName $rowActive={activeIndex === index} to={toArtist({ id })}>{name}</ArtistName>
                                    </ArtistNameContainer>
                                ))}
                            </TrackArtists>
                        )}
                    </TrackDetailsWrapper>
                </TrackOverview>
                <TrackDuration>{fromMillisecondsToMinutes(duration_ms).replace(".", ":")}</TrackDuration>
            </ContentRow>
        ));

        if (discsNumbers && discsNumbers.length > 1) {
            return discsNumbers.map((discNumber: any) => (
                <React.Fragment key={discNumber}>
                    <DiscNumberContainer>
                        <StyledDiscIcon /> Disc {discNumber}
                    </DiscNumberContainer>
                    {renderRows(list.filter(({ disc_number }: { disc_number: any }) => disc_number === discNumber)
                        .filter((_: any, index: any) => hideRestTracks ? index < 5 : useAlbumView ? index >= 0 : index <= 10))}
                </React.Fragment>
            ));
        }

        return renderRows(list?.filter((_: any, index: any) => hideRestTracks ? index < 5 : useAlbumView || !hideRestTracks ? index >= 0 : index <= 10));
    };

    return (
        <Wrapper>
            <StyledTable>
                {caption && (
                    <Caption>
                        {caption}
                        {subCaption && <SubCaption>{subCaption}</SubCaption>}
                    </Caption>
                )}
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
                    {renderTableContent({
                        list,
                        useAlbumView,
                        discsNumbers,
                        hideRestTracks,
                        activeIndex,
                        handleOnRowMouseEnter,
                        handleOnRowMouseLeave
                    })}
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