import { forwardRef } from "react";
import { List, TitleContent, Title, ExtraContent } from "./styled";

export const TilesList = forwardRef(({ title, hideRestListPart, listContent, extraContentText, extraContentLink }, ref = null) => {

    return (
        <>
            <TitleContent>
                <Title as={hideRestListPart ? "h2" : "h1"}>{title}</Title>
                {hideRestListPart && <ExtraContent onClick={extraContentLink}>{extraContentText}</ExtraContent>}
            </TitleContent>
            <List ref={ref}>
                {listContent}
            </List>
        </>
    );
})