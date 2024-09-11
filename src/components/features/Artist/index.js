import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtist, selectArtist, selectArtistFetchStatus } from "../../../slices/artistSlice";
import { success } from "../../../fetchStatuses";

export const Artist = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const fetchArtistStatus = useSelector(selectArtistFetchStatus);
    const artist = useSelector(selectArtist);

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtist(id));
        }, 500);

        return () => clearTimeout(fetchDelayId);
    }, [dispatch, id]);

    return (
        <>
            {
                fetchArtistStatus === success && (
                    <>{artist.name}</>
                )
            }
        </>
    );
};