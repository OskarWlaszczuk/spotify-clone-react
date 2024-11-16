import styled, { css } from "styled-components";

interface AvatarImageProps {
     $smaller?: boolean;
     $larger?: boolean;
     $picture: string;
     $useArtistPictureStyle?: boolean;
     $darkened?: boolean;
};
export const AvatarImage = styled.div<AvatarImageProps>`
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 5px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ $smaller }) => $smaller && css`
        width: 30px;
        height: 30px;
    `};

    ${({ $larger }) => $larger && css`
        width: 75px;
        height: 75px;
    `};

    ${({ $useArtistPictureStyle }) => $useArtistPictureStyle && css`
        border-radius: 50%;
    `};

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: ${({ $picture }) => `url(${$picture})`};
        background-size: cover;
        background-position: center;
        border-radius: inherit;
        ${({ $darkened }) => $darkened && css`
            filter: brightness(50%);
        `}
    }

    & > * {
        position: relative;
        z-index: 1;
    }
`;