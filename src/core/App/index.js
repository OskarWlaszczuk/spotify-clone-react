import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationPanel } from "../../core/App/NavigationPanel";
import { toAlbum, toHome, popularListPathname, toSearch } from "../../common/functions/routes";
import { HomePage } from "../../features/homePage/HomePage";
import { Search } from "../../features/Search";
import { Album } from "../../features/Album";
import { Library } from "./Library";
import { PopularList } from "../../features/PopularList";
import { ArtistDetailsPage } from "../../features/artistDetailsPage/ArtistDetailsPage";

export const App = () => {
  return (
    <HashRouter>
      <NavigationPanel />
      <Library />
      <Routes>
        <Route path={toHome()} element={<HomePage />} />
        <Route path={toSearch()} element={<Search />} />
        <Route path={toAlbum()} element={<Album />} />
        <Route path="/artist/:id" element={<ArtistDetailsPage />} />
        <Route path={popularListPathname()} element={<PopularList />} />
        <Route path="*" element={<Navigate to={toHome()} />} />
      </Routes>
    </HashRouter>
  );
};