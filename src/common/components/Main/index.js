import { MainContent, MainSection } from "./styled"

export const Main = ({ content, banner }) => (
    <MainSection>
        {banner}
        <MainContent
            $bannerAvailable={!!banner}
        >
            {content}
        </MainContent>
    </MainSection>
);