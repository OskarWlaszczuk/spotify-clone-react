import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationPanel } from "./NavigationPanel/components";
import { toAlbum, toHome, toSearch } from "../../common/functions/routes";
import { HomePage } from "../../features/homePage/HomePage";
import { Search } from "../../features/Search";
import { Album } from "../../features/Album";
import { Library } from "./Library/components";
import { ArtistDetailsPage } from "../../features/artistDetailsPage/components/ArtistDetailsPage";

export const App = () => {
  return (
    <HashRouter>
      <NavigationPanel />
      <Library />
      <Routes>
        <Route path="/home/:type?" element={<HomePage />} />
        <Route path={toSearch()} element={<Search />} />
        <Route path={toAlbum()} element={<Album />} />
        <Route path="/artist/:id/:type?" element={<ArtistDetailsPage />} />
        <Route path="*" element={<Navigate to={toHome()} />} />
      </Routes>
    </HashRouter>
  );
};
