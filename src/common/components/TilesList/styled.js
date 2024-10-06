import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledSection = styled.section`
    display: grid;
    grid-gap: 25px;
`;

export const TitleContent = styled.div`
  display: flex; 
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.header`
    font-weight: 600;
    font-size: 30px; 
`;

export const TitleAsLink = styled(Link)`
    font-size: 24px;
    font-weight: 600;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};

    &:hover{
        text-decoration: underline;
    };
`;

export const FullListLink = styled(Link)`
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

export const List = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    grid-gap: 15px 0;
`;