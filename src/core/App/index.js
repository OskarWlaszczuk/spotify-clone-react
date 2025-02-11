import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationPanel } from "./components/NavigationPanel";
import { toHome, toSearch } from "../../common/functions/routes";
import { HomePage } from "../../features/homePage/components/HomePage";
import { Search } from "../../features/Search";
import { AlbumPage } from "../../features/albumPage/components/AlbumPage";
import { Library } from "./components/Library";
import { ArtistDetailsPage } from "../../features/artistDetailsPage/components/ArtistDetailsPage";
import { TrackDetailsPage } from "../../features/trackDetailsPage/components/TrackDetailsPage";
import { useAuth } from "./hooks/useAuth";
import { ShowPage } from "../../features/showsPage/ShowPage";
import { EpisodePage } from "../../features/episodePage/EpisodePage";
import { allFacetParam } from "../../features/homePage/constants/facetParams";
import { facetAllCategory } from "../../features/homePage/constants/facetCategories";

export const App = () => {
    useAuth();

    return (
        <HashRouter>
            <NavigationPanel />
            <Library />
            <Routes>
                <Route path="/home/:facetType?/:fullListType?" element={<HomePage />} />
                <Route path={toSearch()} element={<Search />} />
                <Route path="/track/:id" element={<TrackDetailsPage />} />
                <Route path="/album/:id" element={<AlbumPage />} />
                <Route path="/show/:id" element={<ShowPage />} />
                <Route path="/episode/:id" element={<EpisodePage />} />
                <Route path="/artist/:id/:fullListType?" element={<ArtistDetailsPage />} />
                <Route path="*" element={<Navigate to={toHome({ facetType: facetAllCategory })} />} />
            </Routes>
        </HashRouter>
    );
};
