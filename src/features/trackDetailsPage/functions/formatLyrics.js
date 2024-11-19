import { LyricsLine } from "../components/MainContent/Lyrics/styled";

export const formatLyrics = (lyrics) => {
    return lyrics?.split('\n').map((line, index) => (
        <LyricsLine key={index}>{line}</LyricsLine>
    ));
};