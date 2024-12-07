import { ComponentType } from "react";
import { Box, BoxAsLink, Content, ContentWrapper, ExtraContent } from "./styled";

interface IconBoxProps {
    Icon: ComponentType;
    text?: string;
    toPagePath?: string;
    extraContent?: string;
};

export const IconBox = ({ Icon, text, toPagePath, extraContent }: IconBoxProps) => {
    
    const content = (
        <>
            <ContentWrapper $withoutText={!text}>
                <Icon />
                <Content>{text}</Content>
            </ContentWrapper>
            {extraContent && (<ExtraContent>{extraContent}</ExtraContent>)}
        </>
    );

    const boxElement = (toPagePath ?
        <BoxAsLink to={toPagePath}>{content}</BoxAsLink> :
        <Box>{content}</Box>
    );

    return (
        <>
            {boxElement}
        </>
    );
};