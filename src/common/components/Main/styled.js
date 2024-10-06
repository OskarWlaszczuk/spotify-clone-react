import styled, { css } from "styled-components";

export const MainSection = styled.main`
    grid-area: main;
    overflow: hidden;
`;

export const MainContent = styled.div`
    background-color: ${({ theme }) => theme.colors.black};
    width: 100%;
    border-radius: 10px;
    display: grid;
    grid-gap: 40px;
    padding: 20px;

    ${({ $bannerAvailable }) => $bannerAvailable && css`
       border-radius: 0px;
    `};
`;