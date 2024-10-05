import { Link } from "react-router-dom";
import styled from "styled-components";

export const TitleContent = styled.header`
  display: flex; 
  align-items: center;
  justify-content: space-between;
`;

export const ExtraContent = styled(Link)`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 13px;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    };
`;

export const List = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-gap: 15px 0;
    margin-bottom: 50px;
    padding: 0;
`;