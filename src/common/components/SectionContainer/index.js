import styled, { css } from "styled-components";

export const SectionContainer = styled.section`
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.black};
    padding: 15px 20px;

    ${({ $gradient }) => $gradient && css`
        background: linear-gradient(180deg, rgba(41, 40, 40, 1) 0%, rgba(24, 20, 20, 1) 24%);
    `}
`;