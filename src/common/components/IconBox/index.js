import { Container, Content, ContentWrapper, ExtraContent } from "./styled";

export const IconBox = ({ Icon, text, navigateTo, extraContent, noText }) => {

    return (
        <Container to={navigateTo}>
            <ContentWrapper withoutText={noText}>
                <Icon />
                <Content>{text}</Content>
            </ContentWrapper>
            {extraContent && (<ExtraContent>{extraContent}</ExtraContent>)}
        </Container>
    );
}
