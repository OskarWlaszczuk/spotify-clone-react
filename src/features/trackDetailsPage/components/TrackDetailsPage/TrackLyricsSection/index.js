import { useState } from "react";
import { ToggleViewButton } from "../../../../../common/components/ToggleViewButton"
import { LyricsLine, LyricsSection } from "./styled"

const formatLyrics = (lyrics) => {
    return lyrics?.split('\n').map((line, index) => (
        <LyricsLine key={index}>{line}</LyricsLine>
    ));
};

export const TrackLyricsSection = ({ lyrics }) => {

    const [isHideLyrics, setIsHideLyrics] = useState(true);
    const lyricsPreview = lyrics?.split('\n').slice(0, 13).join('\n');

    return (
        <>
            <LyricsSection>
                {formatLyrics(isHideLyrics ? lyricsPreview : lyrics)}
                <ToggleViewButton
                    onClick={() => setIsHideLyrics(hideRestLyrics => !hideRestLyrics)}
                >
                    {isHideLyrics ? "...Show more" : "Show less lyrics"}
                </ToggleViewButton>
            </LyricsSection>
        </>
    )
};