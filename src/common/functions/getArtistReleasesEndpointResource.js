export const getArtistReleasesEndpointResource = ({ isAppearOnReleasesInclude } = { isAppearOnReleasesInclude: false }) => {
    const baseEndpoint = "albums?include_groups=album%2Csingle%2Ccompilation&limit=50";
    const withAppearsOn = "albums?include_groups=album%2Csingle%2Cappears_on%2Ccompilation&limit=50";

    return isAppearOnReleasesInclude ? withAppearsOn : baseEndpoint;
};