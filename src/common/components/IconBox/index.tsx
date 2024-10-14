import { ComponentType } from "react";
import { Container, Content, ContentWrapper, ExtraContent } from "./styled";

interface IconBoxProps {
    Icon: ComponentType;
    text?: string;
    toPage?: string;
    extraContent?: string;
};

export const IconBox = ({ Icon, text, toPage, extraContent }: IconBoxProps) => (
    <Container to={toPage || ''}>
        <ContentWrapper $withoutText={!text}>
            <Icon />
            <Content>{text}</Content>
        </ContentWrapper>
        {extraContent && (<ExtraContent>{extraContent}</ExtraContent>)}
    </Container>
);