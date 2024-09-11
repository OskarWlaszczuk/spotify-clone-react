import { MainContent } from "./styled"
import { SectionContainer } from "../SectionContainer";

export const Main = ({ content, banner }) => {
    return (
        <MainContent>
            {banner}
            <SectionContainer main bannerAvailable={banner}>
                {content}
            </SectionContainer>
        </MainContent>
    );
};