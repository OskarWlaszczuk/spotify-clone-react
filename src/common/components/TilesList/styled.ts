import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface ListProps {
    $horizontatItems?: boolean;
}

interface TitleSectionProps {
    $extraTitleImageAvailable?: boolean;
}

export const StyledSection = styled.section`
    display: grid;
    grid-gap: 25px;
`;

export const TitleSection = styled.article<TitleSectionProps>`
   ${({ $extraTitleImageAvailable }) => $extraTitleImageAvailable && css`
        display: grid;
        grid-template-columns:auto 1fr;
        gap: 7px;
        align-items: center;
   `}
`;

export const TitleContent = styled.div`
  display: flex; 
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.header`
    font-weight: 600;
    font-size: 30px; 
`;

export const TitleAsLink = styled(Link)`
    font-size: 24px;
    font-weight: 600;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};

    &:hover{
        text-decoration: underline;
    };
`;

export const FullListLink = styled(Link)`
    color: ${({ theme }) => theme.colors.white};
    font-size: 14px;
    font-weight: 450;
    text-decoration: none;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
        filter: brightness(105%);
    };
`;

export const List = styled.div<ListProps>`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    grid-gap: 15px 0;

    ${({ $horizontatItems }) => $horizontatItems && css`
        grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
        grid-auto-rows: minmax(60px, auto);
        grid-gap: 15px;
    `}
`;

export const ExtraSubContentSection = styled.section`
    display: flex;
    gap: 8px;
`;

export const OverExtraContent = styled.p`
    font-size: 10px;
    color: ${({ theme }) => theme.colors.nobel};
    margin: 0 0 3px;
`;