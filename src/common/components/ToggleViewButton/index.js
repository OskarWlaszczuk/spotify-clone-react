import styled from "styled-components";

export const ToggleViewButton = styled.button`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 13px;
    font-weight: 600;
    background-color: transparent;
    border: none;

    &:hover{
        filter: brightness(120%);
    };
`;