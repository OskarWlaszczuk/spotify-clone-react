import styled from "styled-components";

export const MainContent = styled.main`
    grid-area: main;
    background-color: ${({theme}) => theme.colors.black};
    width: 100%;
    height: 100vh;
`;