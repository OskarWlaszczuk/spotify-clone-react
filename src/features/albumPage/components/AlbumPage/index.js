import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { toAlbum, toArtist } from "../../../../common/functions/routes";
import { Table } from "../../../../common/components/Table";
import { allReleaseParamDiscography } from "../../../../common/constants/params";
import { Copyrights } from "../../../../common/components/Copyrights";
import { getImage } from "../../../../common/functions/getImage";
import { useAlbumDetails } from "../../hooks/useAlbumDetails";
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

  const { filteredAlbumDetails, albumDetailsStatus } = useAlbumDetails(albumId);

  const [{
    name: albumName,
    images: albumImages,
    type: albumType,
    release_date: albumReleaseDate,
    copyrights: albumCopyrights,
    total_tracks: albumTotalTracks,
    tracks: albumTracksData,
    artists: albumArtistsList,
  }] = filteredAlbumDetails;

  const tracksList = albumTracksData?.items;

  const {
    mainArtistDetails,
    mainArtistAllReleasesList,
    mainArtistDataStatus
  } = useMainArtistData({ artistsList: albumArtistsList, albumId });
  const [{
    name: mainArtistName,
    images: mainArtistImage,
    id: mainArtistId
  }] = getSpecificKeys(mainArtistDetails, ["images", "name", "id"]);

  const fetchStatus = useFetchStatus([
    albumDetailsStatus,
    mainArtistDataStatus,
  ]);

  const metaDataContent = renderMetaDataContent({
    releaseDate: albumReleaseDate,
    duration: calculateTotalDuration(tracksList),
    uniqueData: `${albumTotalTracks} songs`
  });
  const subTitleContent = renderSubTitleContent({
    artistsList: albumArtistsList,
    artistImage: getImage(mainArtistImage),
  });

  return (
    <Main
      fetchStatus={fetchStatus}
      bannerContent={
        <Banner
          picture={getImage(albumImages)}
          subTitleContent={subTitleContent}
          metaData={metaDataContent}
          title={albumName}
          caption={albumType}
        />
      }
      content={
        <>
          <Table list={tracksList} useAlbumView discsNumbers={getUniqueDiscNumbers(tracksList)} />
          <Copyrights date={albumReleaseDate} copyrights={albumCopyrights} />
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