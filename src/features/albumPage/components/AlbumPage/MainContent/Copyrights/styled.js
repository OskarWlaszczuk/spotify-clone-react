import styled, { css } from "styled-components";

export const Text = styled.p`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 14px;
    margin: 0;

    ${({$smaller}) => $smaller && css`
        font-size: 10px;
    `};
`;