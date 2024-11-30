import { useEffect, useState } from "react";

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
                console.error(error, "Błąd przy fetchoaniu napisów");
            }
        };

        if (!!artist && !!track) {
            getLyricsForTrack(artist, track);
        }

    }, [artist, track]);

    return { lyrics };
};