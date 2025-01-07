import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface ContainerProps {
  $useHorizontalLayout?: boolean;
};

export const Container = styled(Link) <ContainerProps>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 8px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    
    ${({ $useHorizontalLayout }) => $useHorizontalLayout && css`
        display: grid;
        align-items: center;
        grid-template-columns: 60px 1fr; 
        background-color: ${({ theme }) => theme.colors.brightMineShaft};
        padding: 0px;
    `}
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.brightMineShaft};
      cursor: pointer;
    };

    &:active {
      background-color: ${({ theme }) => theme.colors.codGray};
    };
`;

export const Title = styled.header`
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;


  &:hover{
    text-decoration: underline;
  }
`;

const sharedSubInfoStyles = css`
 font-size: 13px;
 color: ${({ theme }) => theme.colors.nobel};
`;


export const SubInfo = styled.span`
  ${sharedSubInfoStyles}
`;

export const SubInfoAsLink = styled(Link)`
  ${sharedSubInfoStyles}
  text-decoration:none;
`;