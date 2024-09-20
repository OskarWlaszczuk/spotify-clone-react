import { MainContent } from "./styled"
import { SectionContainer } from "../SectionContainer";

export const Main = ({ content, banner, gradientAvailable }) => {
    return (
        <MainContent>
            {banner}
            <SectionContainer gradient={gradientAvailable} bannerAvailable={banner}>
                {content}
            </SectionContainer>
        </MainContent>
    );
};