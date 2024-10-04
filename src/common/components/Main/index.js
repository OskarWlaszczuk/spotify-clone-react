import { MainContent } from "./styled"
import { SectionContainer } from "../SectionContainer";

export const Main = ({ content, isGradientAvailable }) => {
    return (
        <MainContent>
            <SectionContainer $useGradient={isGradientAvailable}>
                {content}
            </SectionContainer>
        </MainContent>
    );
};