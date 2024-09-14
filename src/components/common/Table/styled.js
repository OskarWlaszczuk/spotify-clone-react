import styled from "styled-components";

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
    margin: 10px 0;
    padding: 5px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.brightMineShaft};
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
`;

export const RowHeader = styled.th`
    width: 30px;
    text-align: right;
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 400;
    font-size: 14px;
`;

export const TrackStats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: end;
`;

export const TrackName = styled.td`
    font-weight: 350;
    font-size: 14px;
`;

export const TrackStat = styled.td`
    color: ${({ theme }) => theme.colors.nobel};
    font-weight: 400;
    font-size: 14px;
`;