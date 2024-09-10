import styled from "styled-components";

export const TitleContent = styled.header`
  display: flex; 
  align-items: center;
  justify-content: space-between;
`;

export const ExtraContent = styled.a`
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