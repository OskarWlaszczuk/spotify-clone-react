export const musicFacetParam = "facet=music";
export const podcastsFacetParam = "facet=podcasts";
export const allFacetParam = "facet=all";

export type FacetParam = typeof musicFacetParam | typeof podcastsFacetParam | typeof allFacetParam;