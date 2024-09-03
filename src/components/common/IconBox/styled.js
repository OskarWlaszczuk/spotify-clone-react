import styled from "styled-components";

export const Container = styled.a`
    display: flex;
    justify-content: space-between;
`;

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
`;

export const Content = styled.a`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 13px;
    font-weight: bold;
`;

export const ExtraContent = styled.div``