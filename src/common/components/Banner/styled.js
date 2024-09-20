import styled, { css } from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-gap: 30px;
    padding: 20px;
    grid-template-columns: 204px 1fr;
    background-color: #4468a1;
    border-radius: 10px 10px 0 0 ;
    background-color: rgb(39 39 39);
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
    padding-top: calc(100%* 585 / 582);

    ${({ artistPictureStyle }) => artistPictureStyle && css`
        border-radius: 50%;
    `};

    ${({ banner }) => banner && css`
        box-shadow: 0px 0px 30px 9px #00000061;
    `};
`;

export const Details = styled.div`
    display: grid;
    align-content: center;
`;

export const Title = styled.h1`
    margin: 12px 0;
    font-size: 64px;
    font-weight: 900;
`;

export const Caption = styled.p`
    margin: 0;
`;

export const MetaDatas = styled.p`
    margin: 0;
`;