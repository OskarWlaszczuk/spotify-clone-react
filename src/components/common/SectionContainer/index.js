import styled, { css } from "styled-components";

export const SectionContainer = styled.section`
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.black};

    ${({ gradient }) => gradient && css`
        background: linear-gradient(0deg, rgba(24, 20, 20, 1) 52%, rgb(39 39 39) 100%);
    `};

    ${({ bannerAvailable }) => bannerAvailable && css`
        border-radius: unset;
    `};
`;