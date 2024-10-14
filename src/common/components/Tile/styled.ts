import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 8px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    

    &:hover {
      background-color: ${({ theme }) => theme.colors.brightMineShaft};
      cursor: pointer;
    };

    &:active {
      background-color: ${({ theme }) => theme.colors.codGray};
    };
`;

export const Title = styled.header`
    font-size: 13px;
    font-weight: 500;
`;

export const SubInfo = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.nobel};
`;