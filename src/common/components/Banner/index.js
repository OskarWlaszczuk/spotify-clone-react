import { Caption, Container, Details, MetaDatas, Picture, Title } from "./styled";

export const Banner = ({ picture, metaDatas, title, caption }) => {

    return (
        <Container>
            <Picture banner picture={picture} artistPictureStyle={true} />
            <Details>
                <Caption>{caption}</Caption>
                <Title>{title}</Title>
                <MetaDatas>{metaDatas}</MetaDatas>
            </Details>
        </Container>
    );
};