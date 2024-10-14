import { ReactElement } from "react";
import { MainContent, MainSection } from "./styled"

interface MainProps {
    content: ReactElement;
    banner?: ReactElement | false;
};

export const Main = ({ content, banner }: MainProps) => (
    <MainSection>
        {banner}
        <MainContent
            $bannerAvailable={!!banner}
        >
            {content}
        </MainContent>
    </MainSection>
);