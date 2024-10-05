import { MainContent } from "./styled"

export const Main = ({ content, isGradientAvailable }) => (
    <MainContent $useGradient={isGradientAvailable}>{content}</MainContent>
);