import { useEffect, useMemo, useState } from "react";
import { fetchFromAPI } from "../functions/fetchFromAPI";
import { error, initial, loading, success } from "../constants/fetchStatuses";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../slices/authSlice";

const useMemoizeEndpoint = (endpoint, dependencies) => useMemo(() => endpoint, dependencies);

export const useDependentFetchAPI = ({ endpointConfig: { routePath, params }, fetchCondition, dependencies = [] }) => {
    const accessToken = useSelector(selectAccessToken);
    const memoizedEndpoint = useMemoizeEndpoint(routePath, [params]);

    const [datas, setDatas] = useState(null);
    const [datasStatus, setDatasStatus] = useState(initial);

    useEffect(() => {
        if (!fetchCondition || !accessToken) return;

        const fetchArtistDetails = async () => {
            setDatasStatus(loading);
            try {
                const response = await fetchFromAPI({ endpoint: memoizedEndpoint, accessToken });
                setDatas(response);
                setDatasStatus(success);
            } catch {
                setDatasStatus(error);
            }
        };

        fetchArtistDetails();

        return () => {
            setDatas(null);
            setDatasStatus(initial);
        };

    }, [...dependencies, accessToken, fetchCondition, memoizedEndpoint]);


    return { datas, datasStatus };
};