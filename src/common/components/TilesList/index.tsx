import { List, TitleContent, StyledSection, Title, TitleAsLink, FullListLink, ExtraSubContentSection, OverExtraContent, TitleSection } from "./styled";
import { useTilesPerRow } from "../../../features/artistDetailsPage/hooks/useTilesPerRow";
import { ReactElement, ReactNode } from "react";
import { isNotEmpty } from "../../functions/isNotEmpty";
import { AvatarImage } from "../AvatarImage";
import { MediaItem } from "../../Interfaces/MediaItem";

interface FullListData {
    pathname: string;
    text: string;
}

interface ExtraTitleImageData {
    imageURL: string;
    isArtistImage: boolean;
}

interface TitleExtraContent {
    subTitleExtraContent?: ReactNode;
    overTitleExtraContent?: ReactNode;
    extraTitleImage?: ExtraTitleImageData;
    titleLink?: string;
}

interface TilesListProps {
    title: string;
    list: MediaItem[];
    renderItemFunction: (item: MediaItem, index: number) => ReactElement;
    titleExtraContent?: TitleExtraContent;
    // subTitleExtraContent?: ReactNode;
    // overTitleExtraContent?: ReactNode;
    // extraTitleImage?: string;
    showPreviewListPart?: boolean;
    fullListData?: FullListData;
    areHorizontatItems?: boolean;
};

export const TilesList = ({
    title,
    titleExtraContent,
    // subTitleExtraContent,
    // overTitleExtraContent,
    showPreviewListPart,
    list,
    renderItemFunction,
    fullListData,
    areHorizontatItems,
    // extraTitleImage,
}: TilesListProps
) => {

    const subTitleExtraContent = titleExtraContent?.subTitleExtraContent;
    const overTitleExtraContent = titleExtraContent?.overTitleExtraContent;
    const titleLink = titleExtraContent?.titleLink;

    const extraTitleImage = titleExtraContent?.extraTitleImage;

    const fullListPathname = fullListData?.pathname;
    const fullListText = fullListData?.text;

    const { tilesPerRow, containerRef } = useTilesPerRow();

    const previewList = list?.slice(0, tilesPerRow);
    const fullList = list;

    const iterateOnList = (list: MediaItem[]) => (
        list.map((item, index) => renderItemFunction(item, index))
    );

    const titleElement = (
        titleLink ?
            <TitleAsLink to={titleLink!}>{title}</TitleAsLink> :
            <Title>{title}</Title>
    );

    return (
        <>
            {
                isNotEmpty(list) && (
                    <StyledSection>
                        <TitleSection $extraTitleImageAvailable={!!extraTitleImage}>
                            {extraTitleImage && <AvatarImage $useArtistPictureStyle={extraTitleImage.isArtistImage} $picture={extraTitleImage.imageURL} />}
                            <div>
                                {overTitleExtraContent && <OverExtraContent>{overTitleExtraContent}</OverExtraContent>}
                                <TitleContent>
                                    {titleElement}
                                    {fullListData && <FullListLink to={fullListPathname!}>{fullListText}</FullListLink>}
                                </TitleContent >
                            </div>
                        </TitleSection>
                        {subTitleExtraContent && <ExtraSubContentSection>{subTitleExtraContent}</ExtraSubContentSection>}
                        <List ref={containerRef} $horizontatItems={areHorizontatItems}>
                            {list && iterateOnList(showPreviewListPart ? previewList! : fullList!)}
                        </List >
                    </StyledSection>
                )
            }
        </>
    );
};