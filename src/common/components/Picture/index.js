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
    padding-top: calc(100%* 585 / 582);
    padding: calc(100%* 585 / 582) 5px 5px 0;
    box-shadow: 0px 0px 30px 9px #00000061;
    position: relative;

    display: flex;
    justify-content: end;
    align-items: end;

    ${({ $useArtistPictureStyle }) => $useArtistPictureStyle && css`
        border-radius: 50%;
    `};
`;