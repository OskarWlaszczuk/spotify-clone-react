import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 204px 1fr;
    border-radius: 10px 10px 0 0;
    padding: 20px;
    background-color: #878787;
    position: relative;
    box-shadow: 0 4px 58px 35px #87878775;
    z-index: 2;
    align-items: end;
`;

export const Details = styled.div`
    display: grid;
    align-content: center;
`;

export const Title = styled.h1`
    margin: 0;
    font-size: 32px;
    font-weight: 900;
`;

export const Caption = styled.p`
    margin: 0;
    font-weight: 350;
    font-size: 13px;

`;

export const SubTitleContent = styled.p`
    
`;

export const MetaDatas = styled.span`
    margin: 0;
`;