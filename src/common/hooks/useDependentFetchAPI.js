import { useEffect, useState } from "react";
import { fetchFromAPI } from "../functions/fetchFromAPI";
import { error, initial, loading, success } from "../constants/fetchStatuses";

export const useDependentFetchAPI = ({ endpoint, accessToken, fetchCondition, dependencies = [] }) => {

    const [datas, setDatas] = useState("");
    const [datasStatus, setDatasStatus] = useState(initial);

    useEffect(() => {
        // Przerwij działanie useEffect, jeśli fetchCondition jest fałszywe
        if (!fetchCondition || !accessToken) return;

        const fetchArtistDetails = async () => {
            setDatasStatus(loading);
            try {
                const response = await fetchFromAPI({ endpoint, accessToken });
                setDatas(response);
                setDatasStatus(success);
            } catch {
                setDatasStatus(error);
            }
        };

        fetchArtistDetails();
    }, [...dependencies, accessToken, fetchCondition, endpoint]);


    return { datas, datasStatus };
};