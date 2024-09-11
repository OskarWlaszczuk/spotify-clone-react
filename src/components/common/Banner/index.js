import { useSelector } from "react-redux"
import { selectArtist } from "../../../slices/artistSlice";
import { Caption, Container, Details, MetaDatas, Picture, Title } from "./styled";

export const Banner = ({ picture, metaDatas, title, caption }) => {
    const { name, followers, images } = useSelector(selectArtist)

    return (
        <Container>
            <Picture banner picture={images[0].url} artistPictureStyle={true} />
            <Details>
                <Caption>Verified artist</Caption>
                <Title>{name}</Title>
                <MetaDatas>{followers.total.toLocaleString()} followers</MetaDatas>
            </Details>
        </Container>
    );
};