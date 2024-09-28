import styled, { css } from "styled-components";

export const StyledTable = styled.table`
    width: 100%;
`;

export const Caption = styled.caption`
    font-size: 24px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 20px;
`;

export const Row = styled.tr`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    padding: 10px;
    border-radius: 8px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.brightMineShaft};
      cursor: pointer;
    };
`;

export const Image = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 5px;
    vertical-align: middle;
`;

export const TrackOverview = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
`;

export const RowHeader = styled.th`
    width: 30px;
    text-align: right;
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 450;
    font-size: 14px;
`;

export const TrackStats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-items: center;
`;

export const TrackName = styled.td`
    font-weight: 350;
    font-size: 13px;
    max-width: 530px;
    width: 100%;
 
    /* ${({ $ellipsis }) => $ellipsis && css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `}; */
`;

export const TrackStat = styled.td`
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 500;
    font-size: 14px;
`;