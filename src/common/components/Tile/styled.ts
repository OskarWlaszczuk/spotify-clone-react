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

export const Title = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;


  &:hover{
    text-decoration: underline;
  }
`;

export const SubInfo = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.nobel};
`;