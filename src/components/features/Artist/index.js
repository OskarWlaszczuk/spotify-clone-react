import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtist, selectArtist, selectArtistFetchStatus } from "../../../slices/artistSlice";
import { loading, success } from "../../../fetchStatuses";
import { Banner } from "../../common/Banner";
import { Main } from "../../common/Main";

export const Artist = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const fetchArtistStatus = useSelector(selectArtistFetchStatus);
    const artist = useSelector(selectArtist);

    console.log(artist);

    useEffect(() => {
        const fetchDelayId = setTimeout(() => {
            dispatch(fetchArtist(id));
        }, 500);

        return () => clearTimeout(fetchDelayId);
    }, [dispatch, id]);

    return (
        <>
            {
                fetchArtistStatus === loading ?
                    <>Ładowanie</> :
                    <>
                        <Main
                            banner={
                                <Banner />
                            }
                        />
                    </>

            }
        </>
    );
};