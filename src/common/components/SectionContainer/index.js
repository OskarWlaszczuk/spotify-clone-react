import styled, { css } from "styled-components";

export const SectionContainer = styled.section`
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.black};

    ${({ gradient }) => gradient && css`
        background: linear-gradient(180deg, rgba(41,40,40,1) 0%, rgba(24,20,20,1) 17%);
    `};

    ${({ bannerAvailable }) => bannerAvailable && css`
        border-radius: unset;
    `};
`;