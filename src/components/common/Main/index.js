import { MainContent } from "./styled"
import { SectionContainer } from "../SectionContainer";

export const Main = ({ content }) => {
    return (
        <MainContent>
            <SectionContainer>
                {content}
            </SectionContainer>
        </MainContent>
    );
};