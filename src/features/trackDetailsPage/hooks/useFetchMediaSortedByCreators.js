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
    const artistsIdsList = useMemo(() => creatorsDetails?.map(({ id }) => id), [creatorsDetails]);
    const endpointType = useMemo(() => creatorsDetails?.[0].type, [creatorsDetails]);

    const mediaSortedByCreator = useSelector(selectMediaSortedByCreatorData);
    const mediaSortedByCreatorStatus = useSelector(selectMediaSortedByCreatorStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!!accessToken && !!artistsIdsList) {
            dispatch(fetchMediaSortedByCreator({ creatorsIDs: artistsIdsList, accessToken, endpointType }))
        }

        return () => dispatch(clearMediaSortedByCreator())

    }, [accessToken, dispatch, artistsIdsList, endpointType]);

    return { mediaSortedByCreator, mediaSortedByCreatorStatus };
};