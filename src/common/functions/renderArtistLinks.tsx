import { ArtistName, ArtistNameContainer } from "../components/Table/styled"
import { toArtist } from "./routes"

interface ArtistData {
    name: string;
    id: string;
}

export const renderArtistLink = (artistsDataList: ArtistData[], isActive: boolean) => artistsDataList?.map(({ name, id }, artistIndex) => (
    <ArtistNameContainer key={id}>
        {artistIndex !== 0 && ", "}
        <ArtistName $rowActive={isActive} to={toArtist({ id })}>{name}</ArtistName>
    </ArtistNameContainer>
))
