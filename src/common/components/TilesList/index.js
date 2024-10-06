import { List, TitleContent, StyledSection, Title, TitleAsLink, FullListLink } from "./styled";
import { useTilesPerRow } from "../../../features/artistDetailsPage/hooks/useTilesPerRow";

export const TilesList = ({
    id,
    title,
    subExtraContent,
    hideRestListPart,
    list,
    renderItem,
    fullListPathname,
}) => {
    
    const { tilesPerRow, containerRef } = useTilesPerRow();

    const previewList = list.slice(0, tilesPerRow);
    const fullList = list;

    const iterateOnList = list => {
        return list.map((item, index) => (
            renderItem(item, index)
        ));
    };

    const titleElement = (
        hideRestListPart ?
            <TitleAsLink to={fullListPathname}>{title}</TitleAsLink> :
            <Title>{title}</Title>
    );

    return (
        <StyledSection>
            <TitleContent>
                {titleElement}
                {hideRestListPart && <FullListLink to={fullListPathname}>Show all</FullListLink>}
            </TitleContent >
            {subExtraContent}
            <List ref={containerRef} >
                {iterateOnList(hideRestListPart ? previewList : fullList)}
            </List >
        </StyledSection>
    );
};