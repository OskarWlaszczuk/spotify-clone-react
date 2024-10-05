import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 204px 1fr;
    border-radius: 10px 10px 0 0 ;
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
    font-weight: 350;
    font-size: 13px;

`;

export const MetaDatas = styled.p`
    margin: 0;
`;