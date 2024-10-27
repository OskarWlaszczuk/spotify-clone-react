import { List, TitleContent, StyledSection, Title, TitleAsLink, FullListLink, ExtraSubContentSection } from "./styled";
import { useTilesPerRow } from "../../../features/artistDetailsPage/hooks/useTilesPerRow";
import { ReactElement, ReactNode } from "react";
import { MediaItem } from "../../interfaces/MediaItem";

interface TilesListProps {
    title: ReactNode;
    subExtraContent?: ReactElement;
    hideRestListPart?: true | undefined;
    //generyczny typ do list
    list: MediaItem[] | undefined;
    //generyczny typ do list
    renderItem: (list: MediaItem, index: number) => ReactElement;
    fullListPathname?: string;
};

export const TilesList = ({
    title,
    subExtraContent,
    hideRestListPart,
    list,
    renderItem,
    fullListPathname,
}: TilesListProps
) => {

    const { tilesPerRow, containerRef } = useTilesPerRow();

    const previewList = list?.slice(0, tilesPerRow);
    const fullList = list;

    const iterateOnList = <T extends MediaItem>(list: T[]) => (
        list.map((item: T, index: number) => renderItem(item, index))
    );

    const titleElement = (
        fullListPathname ?
            <TitleAsLink to={fullListPathname}>{title}</TitleAsLink> :
            <Title>{title}</Title>
    );

    return (
        <StyledSection>
            <TitleContent>
                {titleElement}
                {fullListPathname && <FullListLink to={fullListPathname}>Show all</FullListLink>}
            </TitleContent >
            <ExtraSubContentSection>{subExtraContent}</ExtraSubContentSection>
            <List ref={containerRef} >
                {list && iterateOnList(hideRestListPart ? previewList! : fullList!)}
            </List >
        </StyledSection>
    );
};