import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationPanel } from "./NavigationPanel";
import { toAlbum, toHome, popularListPathname, toSearch } from "../routes";
import { Home } from "./features/Home";
import { Search } from "./features/Search";
import { Album } from "./features/Album";
import { Library } from "./features/Library";
import { PopularList } from "./features/PopularList";
import { Artist } from "./features/Artist";

export const App = () => {
  return (
    <HashRouter>
      <NavigationPanel />
      <Library />
      <Routes>
        <Route path={toHome()} element={<Home />} />
        <Route path={toSearch()} element={<Search />} />
        <Route path={toAlbum()} element={<Album />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path={popularListPathname()} element={<PopularList />} />
        <Route path="*" element={<Navigate to={toHome()} />} />
      </Routes>
    </HashRouter>
  );
};
