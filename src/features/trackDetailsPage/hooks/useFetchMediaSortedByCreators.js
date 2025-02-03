import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../../../common/slices/authSlice";
import {
    clearMediaSortedByCreator,
    fetchMediaSortedByCreator,
    selectMediaSortedByCreatorData,
    selectMediaSortedByCreatorStatus
} from "../../../common/slices/mediaSortedByCreatorSlice";

export const useFetchMediaSortedByCreators = ({ creatorsDetails }) => {
    const accessToken = useSelector(selectAccessToken);

    const fetchActionPayload = useMemo(() => ({
        creatorsIDs: creatorsDetails?.map(({ id }) => id),
        endpointType: creatorsDetails?.[0].type,
    }), [creatorsDetails]);

    const mediaSortedByCreator = useSelector(selectMediaSortedByCreatorData);
    const mediaSortedByCreatorStatus = useSelector(selectMediaSortedByCreatorStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!!accessToken && !!fetchActionPayload.creatorsIDs) {
            dispatch(fetchMediaSortedByCreator({ accessToken, ...fetchActionPayload }))
        }

        return () => dispatch(clearMediaSortedByCreator())

    }, [accessToken, fetchActionPayload, dispatch]);

    return { mediaSortedByCreator, mediaSortedByCreatorStatus };
};