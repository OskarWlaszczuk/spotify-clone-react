import { Container, Content, ContentWrapper, ExtraContent } from "./styled";

export const IconBox = ({ Icon, content, navigateTo, extraContent }) => {

    return (
        <Container onClick={navigateTo}>
            <ContentWrapper>
                <Icon />
                <Content>{content}</Content>
            </ContentWrapper>
            {extraContent && (<ExtraContent>{extraContent}</ExtraContent>)}
        </Container>
    );
}
