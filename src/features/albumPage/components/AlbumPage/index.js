import { useFetchStatus } from "../../../../common/hooks/useFetchStatuses";
import { useParams } from "react-router-dom";
import { Main } from "../../../../common/components/Main";
import { Banner } from "../../../../common/components/Banner";
import { getImage } from "../../../../common/functions/getImage";
import { useAlbumDetails } from "../../hooks/useAlbumDetails";
import { useMainArtistData } from "../../hooks/useMainArtistData";
import { calculateTotalDuration } from "../../functions/calculateTotalDuration";
import { renderSubTitleContent } from "../../../../common/functions/renderSubTitleContent";
import { renderMetaDataContent } from "../../../../common/functions/renderMetaDataContent";
import { getSpecificKeys } from "../../../../common/functions/getSpecificKeys";
import { MainContent } from "./MainContent";

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

  const tracksList = albumTracksData?.items;

  const {
    mainArtistDetails,
    mainArtistReleases,
    mainArtistDataStatuses
  } = useMainArtistData({ artistsList: albumArtistsList, albumId });

  const [{
    name: mainArtistName,
    images: mainArtistImage,
    id: mainArtistId
  }] = getSpecificKeys(mainArtistDetails, ["images", "name", "id"]);

  const fetchStatus = useFetchStatus([
    albumDetailsStatus,
    ...mainArtistDataStatuses,
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