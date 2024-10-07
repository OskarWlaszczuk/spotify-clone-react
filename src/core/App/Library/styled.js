import styled from "styled-components";

export const AsidePanel = styled.aside`
    grid-area: aside;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.black};
    padding: 15px 20px;

    @media (max-width: 800px) {
        display: none;
    }
`;