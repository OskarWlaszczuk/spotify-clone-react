import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAccessToken } from "../functions/fetchAccessToken";
import { useParams } from "react-router-dom";

export const useFetchAPI = (fetchConfigs) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {

        const fetchAccessTokenAndData = async () => {
            const accessToken = await fetchAccessToken();

            fetchConfigs.forEach(({ fetchAction, endpoint }) => {
                dispatch(fetchAction({ endpoint, accessToken }));
            });
        };

        fetchAccessTokenAndData();

        return () => {
            fetchConfigs.forEach(({ clearAction }) => dispatch(clearAction()));
        };

    }, [dispatch, id]);

};