import styled, { css } from "styled-components";

interface MainContentprops {
    $bannerAvailable: boolean;
    $gradientAvailable: boolean;
}

export const MainSection = styled.main`
    grid-area: main;
    overflow: hidden;
`;

export const MainContent = styled.div<MainContentprops>`
    background-color: ${({ theme }) => theme.colors.black};
    width: 100%;
    border-radius: 10px;
    display: grid;
    grid-gap: 40px;
    padding: 20px;

    ${({ $bannerAvailable }) => $bannerAvailable && css`
       border-radius: 0px;
    `};

    ${({ $gradientAvailable }) => $gradientAvailable && css`
        background: linear-gradient(180deg, rgba(40, 40, 40, 1) 0%, rgba(24, 20, 20, 1) 23%);
    `}
`;