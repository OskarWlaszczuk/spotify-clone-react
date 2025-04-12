import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../../../common/slices/authSlice";
import {
    clearMediaSortedByCreator,
    fetchMediaSortedByCreator,
    selectMediaSortedByCreatorData,
    selectMediaSortedByCreatorStatus
} from "../../../common/slices/mediaSortedByCreatorSlice";

export const useFetchMediaSortedByCreators = ({ creatorsDetails, dataName, clearDataOnLeave = true }) => {
    const accessToken = useSelector(selectAccessToken);

    const creatorsIDs = useMemo(() => creatorsDetails?.map(({ id }) => id), [creatorsDetails]);

    const data = useSelector(state => selectMediaSortedByCreatorData(state, dataName));
    const status = useSelector(state => selectMediaSortedByCreatorStatus(state, dataName));

    const mediaSortedByCreator = useMemo(() => ({
        data,
        status,
    }), [data, status]);

    const dispatch = useDispatch();

    const baseFetchCondition = !!accessToken && !!creatorsIDs?.length;
    const fetchConditionOnLeave = clearDataOnLeave ? baseFetchCondition : baseFetchCondition && !data;

    const baseDependenciesArray = [accessToken, creatorsIDs, dispatch, dataName];
    const dependenciesArray = clearDataOnLeave ? baseDependenciesArray : [...baseDependenciesArray, data];

    const clearFunction = () => clearDataOnLeave ? dispatch(clearMediaSortedByCreator({ dataName })) : {};

    console.log(clearFunction);

    useEffect(() => {
        if (fetchConditionOnLeave) {
            dispatch(fetchMediaSortedByCreator({ accessToken, creatorsIDs, dataName }))
        }

        return () => clearFunction();

    }, dependenciesArray);

    return mediaSortedByCreator;
};



// useEffect(() => {
//     if (!!accessToken && !!creatorsIDs?.length) {
//         dispatch(fetchMediaSortedByCreator({ accessToken, creatorsIDs, dataName }))
//     }

//     return () => dispatch(clearMediaSortedByCreator({ dataName }));

// }, [accessToken, creatorsIDs, dispatch, dataName]);

// return mediaSortedByCreator;