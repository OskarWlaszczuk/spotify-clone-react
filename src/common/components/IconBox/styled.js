import styled, { css } from "styled-components";

export const Container = styled.a`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;

   ${({ withoutText }) => withoutText && css`
   background-color: ${({ theme }) => theme.colors.brightMineShaft};
        padding: 10px;
        gap: 0px;
        border-radius: 50%;
   `};
`;

export const Content = styled.p`
    color: ${({ theme }) => theme.colors.nobel};
    font-size: 13px;
    font-weight: bold;
    margin: 0;
`;

export const ExtraContent = styled.div``