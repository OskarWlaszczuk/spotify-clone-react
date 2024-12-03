import { useEffect, useState } from "react";
import { fetchFromAPI } from "../functions/fetchFromAPI";
import { error, initial, loading, success } from "../constants/fetchStatuses";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../slices/authSlice";

export const useDependentFetchAPI = ({ endpointsList, fetchCondition, dependencies = [] }) => {
    const accessToken = useSelector(selectAccessToken);

    const [depentendApiData, setDepentendApiData] = useState(null);
    const [depentendApiDataStatus, setDepentendApiDataStatus] = useState(initial);

    useEffect(() => {
        if (!fetchCondition || !accessToken) return;

        const fetchDependData = async () => {
            setDepentendApiDataStatus(loading);
            try {
                const response = await Promise.all(endpointsList.map(({ endpoint }) => {
                    return fetchFromAPI({ endpoint, accessToken })
                }))

                setDepentendApiData(response);
                setDepentendApiDataStatus(success);
            } catch {
                setDepentendApiDataStatus(error);
            }
        };

        fetchDependData();

        return () => {
            setDepentendApiData(null);
            setDepentendApiDataStatus(initial);
        };

    }, [...dependencies, accessToken, fetchCondition, endpointsList]);


    return { depentendApiData, depentendApiDataStatus };
};