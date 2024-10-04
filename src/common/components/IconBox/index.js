import { Container, Content, ContentWrapper, ExtraContent } from "./styled";

export const IconBox = ({ Icon, text, toPage, extraContent }) => {

    return (
        <Container to={toPage}>
            <ContentWrapper $withoutText={!text}>
                <Icon />
                <Content>{text}</Content>
            </ContentWrapper>
            {extraContent && (<ExtraContent>{extraContent}</ExtraContent>)}
        </Container>
    );
}
