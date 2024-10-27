import styled, { css } from "styled-components";

interface AvatarImageProps {
    $smaller?: boolean;
    $useArtistPictureStyle?: boolean;
};

export const AvatarImage = styled.img<AvatarImageProps>`
    width: 42px;
    height: 42px;
    border-radius: 5px;
    vertical-align: middle;

   ${({ $smaller }) => $smaller && css`
        width: 30px;
        height: 30px;
   `};

   ${({ $useArtistPictureStyle }) => $useArtistPictureStyle && css`
        border-radius: 50%;
   `};
`;