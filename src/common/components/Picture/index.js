import styled, { css } from "styled-components";

export const Picture = styled.div
    .attrs(({ picture }) => ({
        style: {
            backgroundImage: `url(${picture})`
        }
    }))`
    
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    /* padding-top: calc(100%* 585 / 582); */
    height: 180px;
    padding-right: 5px;
    box-shadow: 0px 0px 30px 9px #00000061;

    display: flex;
    justify-content: end;
    align-items: end;

    ${({ $useArtistPictureStyle }) => $useArtistPictureStyle && css`
        border-radius: 50%;
    `};
`;