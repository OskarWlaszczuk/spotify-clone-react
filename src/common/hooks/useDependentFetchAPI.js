import { useEffect, useState } from "react";
import { fetchFromAPI } from "../functions/fetchFromAPI";
import { error, initial, loading, success } from "../constants/fetchStatuses";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../slices/authSlice";

export const useDependentFetchAPI = ({ endpoint, fetchCondition, dependencies = [] }) => {
    const accessToken = useSelector(selectAccessToken);

    const [datas, setDatas] = useState("");
    const [datasStatus, setDatasStatus] = useState(initial);

    useEffect(() => {
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