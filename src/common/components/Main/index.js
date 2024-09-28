import { MainContent } from "./styled"
import { SectionContainer } from "../SectionContainer";

export const Main = ({ content, gradientAvailable }) => {
    return (
        <MainContent>
            <SectionContainer $gradient={gradientAvailable}>
                {content}
            </SectionContainer>
        </MainContent>
    );
};