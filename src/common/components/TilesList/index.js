import { List, TitleContent } from "./styled";
import { ShowAllLink } from "../ShowAllLink";
import { useTilesPerRow } from "../../../features/artistDetailsPage/hooks/useTilesPerRow";

export const TilesList = ({
    title,
    subExtraContent,
    hideRestListPart,
    list,
    renderItem,
    titleExtraAsideContent
}) => {
    const { tilesPerRow, containerRef } = useTilesPerRow();

    const previewList = list.slice(0, tilesPerRow);
    const wholeList = list;

    const iterateOnList = list => {
        return list.map((item, index) => (
            renderItem(item, index)
        ))
    };

    const headerElement = hideRestListPart ? <h2>{title}</h2> : <h1>{title}</h1>;

    return (
        <>
            <TitleContent>
                {headerElement}
                {hideRestListPart && <ShowAllLink to={titleExtraAsideContent.link}>{titleExtraAsideContent.text}</ShowAllLink>}
            </TitleContent >
            {subExtraContent}
            < List ref={containerRef} >
                {iterateOnList(hideRestListPart ? previewList : wholeList)}
            </List >
        </>
    );
};