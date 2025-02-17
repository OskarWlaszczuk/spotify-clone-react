import styled, { css } from "styled-components";

interface TitleProps {
    $larger?: boolean;
};

interface ContainerProps {
    $useAlbumLayout?: boolean;
};

export const Container = styled.div<ContainerProps>`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: calc(20% * 585 / 582) 1fr;
    padding: 20px;
    background: linear-gradient(180deg, rgba(119,129,138,1) 0%, rgba(79,89,98,1) 54%);
    position: relative;
    box-shadow: 0 4px 58px 35px #4f596270;
    z-index: 2;

    ${({ $useAlbumLayout }) => $useAlbumLayout && css`
        align-items: end;
    `};
`;

export const Details = styled.div`
    display: grid;
    align-content: space-between;
`;

export const Title = styled.h1<TitleProps>`
    margin: 0;
    font-size: clamp(23px, 30px, 64px);
    font-weight: 900;

    ${({ $larger }) => $larger && css`
    font-size: clamp(23px, 30px, 64px);
    `};
`;

export const Caption = styled.p`
    margin: 0;
    font-weight: 350;
    font-size: 13px;

`;

export const SubTitleContent = styled.p`
    font-weight: 550;
    font-size: 14px;
`;

export const MetaData = styled.span`
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 400;
    font-size: 14px;
`;