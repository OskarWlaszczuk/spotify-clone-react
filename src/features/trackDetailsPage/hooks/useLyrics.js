import { useEffect, useState } from "react";
import { throwError } from "../../../common/functions/throwError";

export const useLyrics = (artist, track) => {
    const [lyrics, setLyrics] = useState(undefined);

    useEffect(() => {
        const getLyricsForTrack = async (artist, track) => {
            try {
                setLyrics("");
                const response = await fetch(`http://localhost:5000/lyrics?artist=${artist}&track=${track}`);
                const data = await response.json();

                setLyrics(data.lyrics);
            } catch (error) {
                throwError("Problem with lyrics fetching", error);
            }
        };

        if (!!artist && !!track) {
            getLyricsForTrack(artist, track);
        }

    }, [artist, track]);

    return { lyrics };
};