import styled, { css } from "styled-components";
import { ReactComponent as Timer } from "../../icons/Timer.svg";
import { Link } from "react-router-dom";

interface ArtistNameProps {
    $rowActive?: boolean;
};

interface HeaderProps {
    $larger?: boolean;
};

interface HeaderRowProps {
    $albumViewNotAvailable?: boolean;
};

export const DiscNumberContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items:center;
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 600;
    margin: 20px 0;
`;

export const StyledTimer = styled(Timer)`
    width: 14px;
`;

export const Wrapper = styled.article`
    position: relative;
    z-index: 3;
`;

export const StyledTable = styled.table`
    width: 100%;
`;

export const Caption = styled.caption`
    font-size: 24px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 20px;
`;

export const HeaderRow = styled.tr<HeaderRowProps>`
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-items: start;
    grid-gap: 10px;
    border-bottom: 1px solid #555050b3;
    padding: 5px 20px;

    ${({ $albumViewNotAvailable: $isAlbumView }) => $isAlbumView && css`
        margin-bottom: 20px;
    `};
`;

export const Header = styled.th<HeaderProps>`
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 400;
    font-size: 14px;

    ${({ $larger }) => $larger && css`
        width: 30px;
    `};
`;

export const ContentRow = styled.tr`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    border-radius: 8px;
    padding: 7px 20px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.brightMineShaft};
    };

    &:active {
      filter: brightness(150%);
    };
`;

export const TrackOverview = styled.td`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
`;

export const Index = styled.th`
    width: 30px;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 450;
    font-size: 15px;
`;

export const TrackDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const TrackName = styled.td`
    font-weight: 400;
    font-size: 15px;
    max-width: 530px;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    };
`;

export const TrackArtists = styled.td`
    max-width: 530px;
`;

export const ArtistNameContainer = styled.span`
    color: ${({ theme }) => theme.colors.nobel};
`;

export const ArtistName = styled(Link) <ArtistNameProps>`
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 400;
    font-size: 14px;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    };

    &:active{
        color: unset;
    };

    ${({ $rowActive }) => $rowActive && css`
        color: ${({ theme }) => theme.colors.white};
    `};
`;

export const TrackDuration = styled.td`
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 400;
    font-size: 15px;
    justify-self: end;
`;