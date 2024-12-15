import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { getFirstImage } from "../../../../common/functions/getFirstImage";
import { useAlbumDetails } from "../../hooks/useAlbumDetails";
import { useMainArtistData } from "../../../../common/hooks/useMainArtistData";
import { calculateTotalDuration } from "../../functions/calculateTotalDuration";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { MainContent } from "./MainContent";
import { renderBannerContent } from "../../../../common/functions/renderBannerContent";

export const AlbumPage = () => {
  const { id: albumId } = useParams();

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

  const mainArtistId = albumArtistsList?.[0].id;
  const tracksList = albumTracksData?.items;

  const {
    mainArtistDetails,
    mainArtistReleases,
    mainArtistDataStatuses
  } = useMainArtistData({
    mainArtistId,
    dependencies: [albumId],
  });

  const [{
    name: mainArtistName,
    images: mainArtistImage,
  }] = getSpecificKeys(mainArtistDetails, ["images", "name"]);

  const fetchStatus = useFetchStatus([
    albumDetailsStatus,
    ...mainArtistDataStatuses,
  ]);

  const { metaDataContent, subTitleContent } = renderBannerContent({
    metaData: {
      releaseDate: albumReleaseDate,
      duration: calculateTotalDuration(tracksList),
      uniqueData: `${albumTotalTracks} songs`,
    },
    subTitleData: {
      albumDetailsPageData: {
        artistsList: albumArtistsList,
      },
      artistImagesList: mainArtistImage,
    },
  });

  return (
    <Main
      currentFetchStatus={fetchStatus}
      bannerContent={
        <Banner
          picture={getFirstImage(albumImages)}
          subTitleContent={subTitleContent}
          metaData={metaDataContent}
          title={albumName}
          caption={albumType}
        />
      }
      content={
        <>
          <MainContent
            mainArtistData={{
              id: mainArtistId,
              name: mainArtistName,
              releases: mainArtistReleases?.items,
            }}
            albumData={{
              releaseDate: albumReleaseDate,
              copyrights: albumCopyrights,
            }}
            tracksList={tracksList}
          />
        </>
      }
    />
  );
};