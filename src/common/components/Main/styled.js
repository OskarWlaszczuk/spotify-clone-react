import styled, { css } from "styled-components";

export const MainContent = styled.main`
    grid-area: main;
    background-color: ${({theme}) => theme.colors.black};
    width: 100%;
    border-radius: 10px;
    padding: 15px 20px;

    ${({ $useGradient }) => $useGradient && css`
        background: linear-gradient(180deg, rgba(41, 40, 40, 1) 0%, rgba(24, 20, 20, 1) 24%);
    `};
`;