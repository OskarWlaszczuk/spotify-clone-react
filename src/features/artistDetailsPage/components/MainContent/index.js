import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { artistAlbumsSelectors } from "../../slices/artistAlbumsSlice";
import { relatedArtistsSelectors } from "../../slices/relatedArtistsSlice";
import { artistTopTracksSelectors } from "../../slices/artistTopTracksSlice";
import { TilesList } from "../../../../common/components/TilesList";
import { Tile } from "../../../../common/components/Tile";
import { Table } from "../../../../common/components/Table";
import { toArtist, toListPage } from "../../../../common/functions/routes";
import { ListToggleButton } from "../../../../common/components/ListToggleButton";
import { ItemsList } from "../../../../common/components/ItemsList";
import { artistSinglesSelectors } from "../../slices/artistSinglesSlice";
import { artistCompilationSelectors } from "../../slices/artistCompilationSlice";
import { getYear } from "../../../../common/functions/getYear";
import { capitalizeFirstLetter } from "../../../../common/functions/capitalizeFirstLetter";
import { setList } from "../../../ListPage/listSlice";
import { removeDuplicates } from "../../functions/removeDuplicates"
import { replaceReleaseDateIfCurrentYear } from "../../functions/replaceReleaseDateIfCurrentYear";
import { isLatestReleased } from "../../functions/isLatestReleased";
import { isListEmpty } from "../../functions/isListEmpty";
import { useCurrentGroupType } from "../../hooks/useCurrentGroupType";
import { popularReleasesGroup, albumsGroup, singlesGroup, compilationsGroup } from "../../constants/groups";
import { isAlbumGroupMatch } from "../../functions/isAlbumGroupMatch";
import { artistAppearsOnSelectors } from "../../slices/artistAppearsOnSlice";

export const MainContent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const appearsOn = useSelector(artistAppearsOnSelectors.selectDatas)?.datas.items;
    const albums = useSelector(artistAlbumsSelectors.selectDatas)?.datas.items;
    const compilations = useSelector(artistCompilationSelectors.selectDatas)?.datas.items;
    const singles = useSelector(artistSinglesSelectors.selectDatas)?.datas.items;
    const relatedArtists = useSelector(relatedArtistsSelectors.selectDatas)?.datas.artists;
    const topTracks = useSelector(artistTopTracksSelectors.selectDatas)?.datas.tracks;

    const popularReleases = topTracks?.map(({ album }) => album);
    const newestPopularRelease = popularReleases?.slice().sort(
        (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
    )[0];

    const sortedPopularReleasesWithNewestFirst = [
        { ...(newestPopularRelease ?? {}) },
        ...(popularReleases?.slice() ?? []),
    ];

    const { matchedGroup, currentGroupType, setCurrentGroupType } = useCurrentGroupType(popularReleasesGroup, {
        albums, singles, compilations, sortedPopularReleasesWithNewestFirst
    });


    const groupToDisplay = removeDuplicates(matchedGroup.group);

    return (
        <>
            <Table />
            <TilesList
                title="Discography"
                subContent={
                    <ItemsList
                        items={
                            <>
                                {
                                    isListEmpty(popularReleases) && (
                                        <ListToggleButton
                                            toggleList={() => setCurrentGroupType(popularReleasesGroup)}
                                            text="Popular releases"
                                            isActive={isAlbumGroupMatch(popularReleasesGroup, currentGroupType)}
                                        />
                                    )
                                }
                                {
                                    isListEmpty(albums) && (
                                        <ListToggleButton
                                            toggleList={() => setCurrentGroupType(albumsGroup)}
                                            text="Albums"
                                            isActive={isAlbumGroupMatch(albumsGroup, currentGroupType)}
                                        />
                                    )
                                }
                                {
                                    isListEmpty(singles) && (
                                        <ListToggleButton
                                            toggleList={() => setCurrentGroupType(singlesGroup)}
                                            text="Singles"
                                            isActive={isAlbumGroupMatch(singlesGroup, currentGroupType)}
                                        />
                                    )
                                }
                                {
                                    isListEmpty(compilations) && (
                                        <ListToggleButton
                                            toggleList={() => setCurrentGroupType(compilationsGroup)}
                                            text="Compilations"
                                            isActive={isAlbumGroupMatch(compilationsGroup, currentGroupType)}
                                        />
                                    )
                                }
                            </>
                        }
                    />
                }
                list={groupToDisplay}
                renderItem={
                    ((item, index) => {
                        const { id, name, release_date, images, album_group = "", album_type = "" } = item;

                        return <Tile
                            id={id}
                            picture={images[0].url}
                            title={name}
                            subInfo={`
                                            ${index === 0 && isLatestReleased(item)
                                    ? replaceReleaseDateIfCurrentYear(item).release_date
                                    : getYear(release_date)
                                }
                                            ${capitalizeFirstLetter(album_group) || capitalizeFirstLetter(album_type)}
                                        `}
                        />
                    })
                }
                hideRestListPart
                extraContentText="Show all"
                extraContentAction={
                    () => dispatch(
                        setList({ title: matchedGroup.title, list: groupToDisplay, isArtistsList: false })
                    )
                }
                extraContentLink={() => navigate(toListPage())}
            />
            <TilesList
                title="Fans also like"
                list={relatedArtists}
                renderItem={({ images, name, type, id }) => (
                    <Tile
                        key={id}
                        id={id}
                        picture={images[0].url}
                        title={name}
                        subInfo={type}
                        useArtistPictureStyle
                        navigateTo={toArtist({ id })}
                    />
                )}
                hideRestListPart
                extraContentText="Show all"
                extraContentAction={
                    () => dispatch(setList({ title: "Fans also like", list: relatedArtists, isArtistsList: true }))
                }
                extraContentLink={() => navigate(toListPage())}
            />
            <TilesList
                title="Appears on"
                list={appearsOn}
                renderItem={({ images, name, type, id }) => (
                    <Tile
                        key={id}
                        id={id}
                        picture={images[0].url}
                        title={name}
                        subInfo={type}
                    // navigateTo={navigate(toArtist({ id }))}
                    />
                )}
                hideRestListPart
                extraContentText="Show all"
                extraContentAction={
                    () => dispatch(setList({ title: "Appears on", list: appearsOn }))
                }
                extraContentLink={() => navigate(toListPage())}
            />
        </>
    )
}