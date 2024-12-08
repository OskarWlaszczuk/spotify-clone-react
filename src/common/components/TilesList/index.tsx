import { List, TitleContent, StyledSection, Title, TitleAsLink, FullListLink, ExtraSubContentSection } from "./styled";
import { useTilesPerRow } from "../../../features/artistDetailsPage/hooks/useTilesPerRow";
import { ReactElement } from "react";
import { MediaItem } from "../../interfaces/MediaItem";
import { isNotEmpty } from "../../functions/isNotEmpty";

interface FullListData {
    pathname: string;
    text: string;
};

interface TilesListProps {
    title: any;
    subExtraContent?:any;
    hideRestListPart?: any;
    //generyczny typ do list
    list:any;
    //generyczny typ do list
    renderItem: (list: MediaItem, index: number) => ReactElement;
    fullListData?: any;
};

export const TilesList = ({
    title,
    subExtraContent,
    hideRestListPart,
    list,
    renderItem,
    fullListData,
}: TilesListProps
) => {

    const fullListPathname = fullListData?.pathname;
    const fullListText = fullListData?.text;

    const { tilesPerRow, containerRef } = useTilesPerRow();

    const previewList = list?.slice(0, tilesPerRow);
    const fullList = list;

    const iterateOnList = <T extends MediaItem>(list: T[]) => (
        list.map((item: T, index: number) => renderItem(item, index))
    );

    const titleElement = (
        fullListPathname ?
            <TitleAsLink to={fullListPathname!}>{title}</TitleAsLink> :
            <Title>{title}</Title>
    );

    return (
        <>
            {
                isNotEmpty(list) && (
                    <StyledSection>
                        <TitleContent>
                            {titleElement}
                            {fullListData && <FullListLink to={fullListPathname!}>{fullListText}</FullListLink>}
                        </TitleContent >
                        {subExtraContent && <ExtraSubContentSection>{subExtraContent}</ExtraSubContentSection>}
                        <List ref={containerRef} >
                            {list && iterateOnList(hideRestListPart ? previewList! : fullList!)}
                        </List >
                    </StyledSection>
                )
            }
        </>
    );
};