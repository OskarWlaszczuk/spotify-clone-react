import styled, { css } from "styled-components";

export const Button = styled.button`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.mineShaft};
    border-radius: 15px;
    border: unset;
    font-weight: 350;
    font-size: 13px;
    padding: 8px;
    transition: 0.3s;

    &:hover{
        filter: brightness(115%);
        cursor: pointer;
    };

    ${({ $active }) => $active && css`
        color: ${({ theme }) => theme.colors.black};
        background-color: ${({ theme }) => theme.colors.white};
        font-weight: 400;

        &:hover{
            filter: brightness(85%);
        };
    `};
`;