import styled from "styled-components";

export const Container = styled.a`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
`;

export const Content = styled.p`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 13px;
    font-weight: bold;
    margin: 0;
`;

export const ExtraContent = styled.div``