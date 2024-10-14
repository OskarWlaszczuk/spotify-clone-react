import styled from "styled-components";

export const Wrapper = styled.article`
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    z-index: 3;
`;

export const StyledTable = styled.table`
    width: 100%;
    margin-bottom: 10px;
`;

export const Caption = styled.caption`
    font-size: 24px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 20px;
`;

export const Row = styled.tr`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 5px 10px;
    border-radius: 8px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.brightMineShaft};
    };

    &:active {
      filter: brightness(150%);
    };
`;

export const Image = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 5px;
    vertical-align: middle;
`;

export const TrackOverview = styled.td`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
`;

export const RowIndex = styled.th`
    width: 30px;
    text-align: right;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 450;
    font-size: 15px;
`;
export const TrackName = styled.td`
    font-weight: 400;
    font-size: 15px;
    max-width: 530px;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    };
`;

export const TrackDuration = styled.td`
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 500;
    font-size: 15px;
    justify-self: end;
`;