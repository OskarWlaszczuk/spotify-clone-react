import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { Table } from "../../../../common/components/Table";
import { allReleaseParamDiscography } from "../../../../common/constants/params";
import { Copyrights } from "../../../../common/components/Copyrights";
import { getImage } from "../../../../common/functions/getImage";
import { useAlbumData } from "../../hooks/useAlbumData";
import { getUniqueDiscNumbers } from "../../functions/getUniqueDiscNumbers";
import { useRenderTilesList } from "../../../../common/functions/useRenderTilesList";
import { useMainArtistData } from "../../hooks/useMainArtistData";
import { calculateTotalDuration } from "../../functions/calculateTotalDuration";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { renderMetaDataContent } from "../../../../common/functions/renderMetaDataContent";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";

export const AlbumPage = () => {
  const { id: albumId } = useParams();

  const renderTilesList = useRenderTilesList();

  const { filteredAlbumData, albumDataStatus } = useAlbumData(albumId);

  const [{
    name,
    images,
    type,
    release_date,
    copyrights,
    total_tracks,
    tracks,
    artists: artistsList,
  }] = filteredAlbumData;

  const tracksList = tracks?.items;

  const [{ name: mainArtistName, id: mainArtistId }] = getSpecificKeys(artistsList?.[0], ["name", "id"]);

  const isAlbumArtistsListLengthEqualsOne = artistsList?.length === 1;
  const isMainArtistIdExists = !!mainArtistId
  const apiDependencies = [albumId, mainArtistId];

  const { mainArtistImage, mainArtistAllReleasesList, mainArtistDataStatus } = useMainArtistData({
    mainArtistId,
    fetchCondition: isMainArtistIdExists,
    dependencies: apiDependencies,
    isAlbumArtistsListLengthEqualsOne
  });

  const fetchStatus = useFetchStatus([
    albumDataStatus,
    mainArtistDataStatus,
  ]);

  const metaDataContent = renderMetaDataContent({
    releaseDate: release_date,
    duration: calculateTotalDuration(tracksList),
    uniqueData: `${total_tracks} songs`
  });

  const subTitleContent = renderSubTitleContent({
    artistsList: artistsList,
    artistImage: getImage(mainArtistImage),
  });

  return (
    <Main
      fetchStatus={fetchStatus}
      bannerContent={
        <Banner
          picture={getImage(images)}
          subTitleContent={subTitleContent}
          metaData={metaDataContent}
          title={name}
          caption={type}
        />
      }
      content={
        <>
          <Table list={tracksList} useAlbumView discsNumbers={getUniqueDiscNumbers(tracksList)} />
          <Copyrights date={release_date} copyrights={copyrights} />
          {
            renderTilesList([
              {
                title: `More by ${mainArtistName}`,
                list: mainArtistAllReleasesList,
                toPageFunction: toAlbum,
                fullListData: {
                  pathname: toArtist({
                    id: mainArtistId,
                    additionalPath: allReleaseParamDiscography
                  }),
                  text: "Show discography"
                },
              }
            ])
          }
        </>
      }
    />
  );
};