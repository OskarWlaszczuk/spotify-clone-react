import styled from "styled-components";

export const HeaderContent = styled.header`
  display: flex; 
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.header`

`

export const PopularListLink = styled.a`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 13px;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    };
`;

export const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 15px 0;
    margin-bottom: 50px;
    padding: 0;
`;