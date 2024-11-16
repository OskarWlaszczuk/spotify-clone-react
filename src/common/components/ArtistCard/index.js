import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const LyricsAndArtistsCardSectionContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 50%);
`;

export const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
`

export const ArtistCardSection = styled.section`
   width: 65%;
`;

export const ArtistCardContainer = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    grid-gap: 15px;
    margin: 20px 0;
    padding: 15px;
    border-radius: 5px;
    transition: 0.3s;
    
    &:hover{
        background-color:  ${({ theme }) => theme.colors.brightMineShaft};
    }
`;

export const Text = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Paragraph = styled.p`
    display: inline;
    margin: 0;

    ${({ $specialOnHover }) => $specialOnHover && css`
      &:hover{
        text-decoration: underline;
      };
    `};
`;