import { List, TitleContent, StyledSection, Title, TitleAsLink, FullListLink, ExtraSubContentSection } from "./styled";
import { useTilesPerRow } from "../../../features/artistDetailsPage/hooks/useTilesPerRow";
import { ReactElement } from "react";

interface Image {
    url: string;
};

interface ListItem {
    id: string;
    name: string;
    images: Image[];
    album_type?: string;
};

interface TilesListProps {
    title: string;
    subExtraContent: ReactElement;
    hideRestListPart?: true;
    list: ListItem[];
    renderItem: (list: ListItem, index: number) => ReactElement;
    fullListPathname: string;
};

export const TilesList = ({
    title,
    subExtraContent,
    hideRestListPart,
    list,
    renderItem,
    fullListPathname,
}
    : TilesListProps
) => {

    const { tilesPerRow, containerRef } = useTilesPerRow();

    const previewList = list.slice(0, tilesPerRow);
    const fullList = list;

    const iterateOnList = (list: ListItem[]) => (
        list.map((item: ListItem, index: number) =>
            renderItem(item, index)
        )
    );

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
            <ExtraSubContentSection>{subExtraContent}</ExtraSubContentSection>
            <List ref={containerRef} >
                {iterateOnList(hideRestListPart ? previewList : fullList)}
            </List >
        </StyledSection>
    );
};