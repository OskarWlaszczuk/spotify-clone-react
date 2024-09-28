import { Link } from "react-router-dom";
import styled from "styled-components";

export const ShowAllLink = styled(Link)`
    color: ${({ theme }) => theme.colors.white};
    font-size: 14px;
    font-weight: 450;
    text-decoration: none;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
        filter: brightness(105%);
    };
`;