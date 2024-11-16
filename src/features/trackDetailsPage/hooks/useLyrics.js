import { useEffect, useState } from "react";
import { error, initial, loading, success } from "../../../common/constants/fetchStatuses";

export const useLyrics = (artist, track) => {
    const [lyrics, setLyrics] = useState(undefined);
    const [lyricsFetchStatus, setLyricsFetchStatus] = useState(initial);

    useEffect(() => {
        const getLyricsForTrack = async (artist, track) => {
            try {
                const response = await fetch(`http://localhost:5000/lyrics?artist=${artist}&track=${track}`);
                const data = await response.json();

                setLyrics(data.lyrics);
                setLyricsFetchStatus(success);
            } catch {
                setLyricsFetchStatus(error);
            }
        };

        if (artist && track) {
            getLyricsForTrack(artist, track);
            setLyricsFetchStatus(loading);
        }

    }, [artist, track]);

    return { lyrics, lyricsFetchStatus };
};