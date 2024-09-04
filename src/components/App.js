import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationPanel } from "./NavigationPanel";
import { toAlbum, toHome, toSearch } from "../routes";
import { Home } from "./features/Home";
import { Search } from "./features/Search";
import { Album } from "./features/Album";
import { Library } from "./features/Library";

export const App = () => {
  return (
    <HashRouter>
      <NavigationPanel />
      <Library />
      <Routes>
        <Route path={toHome()} element={<Home />} />
        <Route path={toSearch()} element={<Search />} />
        <Route path={toAlbum()} element={<Album />} />
        <Route path="*" element={<Navigate to={toHome()} />} />
      </Routes>
    </HashRouter>
  );
};
