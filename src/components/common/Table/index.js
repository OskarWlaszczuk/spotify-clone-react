import { useSelector } from "react-redux"
import { selectArtistTopTracks } from "../../../slices/artistTopTracksSlice"
import { Picture } from "./styled";
import { useState } from "react";

export const Table = () => {
    const { tracks } = useSelector(selectArtistTopTracks);
    const [hideRestTracks, setHideRestTracks] = useState(true);

    return (
        <>
            {
                tracks && (
                    <table>
                        <caption>The most popular</caption>
                        {
                            tracks
                                .filter((_, index) => (
                                    hideRestTracks ? index < 5 : index <= 10
                                ))
                                .map(({ album, name, popularity, duration_ms }, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td><Picture src={album.images[0].url} /></td>
                                        <td>{name}</td>
                                        <td>{popularity}/100</td>
                                        <td>{(duration_ms / 60000).toFixed(2).replace(".", ":")}</td>
                                    </tr>
                                ))
                        }
                        <button
                            onClick={() => setHideRestTracks(hideRestTracks => !hideRestTracks)}
                        >
                            {hideRestTracks ? <>Show more</> : <>Show less</>}
                        </button>
                    </table>
                )
            }
        </>
    )
}