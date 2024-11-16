import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface ArtistNameLinkProps {
    $thinner?: boolean;
}

export const ArtistNameLink = styled(Link) <ArtistNameLinkProps>`
    color:${({ theme }) => theme.colors.white};
    text-decoration:none;

    &:hover{
        text-decoration: underline;
    };

    ${({ $thinner }) => $thinner && css`
        font-weight: 350;
    `};
`;