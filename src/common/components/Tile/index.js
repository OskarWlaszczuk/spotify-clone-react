import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "../../functions/capitalizeFirstLetter";
import { Container, Picture, SubInfo, Title } from "./styled";
import { setNavigationID } from "../../../features/ListPage/listSlice";

export const Tile = ({ picture, title, subInfo, id, navigateTo, useArtistPictureStyle }) => {

    const dispatch = useDispatch();

    return (
        <Container onClick={() => {
            navigateTo();
            dispatch(setNavigationID({ id }))
        }}>
            <Picture picture={picture} artistPictureStyle={useArtistPictureStyle} />
            <Title>{title}</Title>
            <SubInfo>{capitalizeFirstLetter(subInfo)}</SubInfo>
        </Container>
    );
};