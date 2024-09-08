import styled, { css } from "styled-components";

export const Container = styled.li`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 8px;
    border-radius: 5px;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.brightMineShaft};
    };
`;

export const Picture = styled.div
    .attrs(({ picture }) => ({
        style: {
            backgroundImage: `url(${picture})`
        }
    }))`
    
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    padding-top: calc(100% *585/ 537);
    
    ${({ artistPictureStyle }) => artistPictureStyle && css`
        border-radius: 50%;
    `};

`;

export const Title = styled.header`
    font-size: 13px;
    font-weight: 500;
`;


export const SubInfo = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.nobel};
`;