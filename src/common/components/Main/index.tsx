import { ReactElement } from "react";
import { MainContent, MainSection } from "./styled";
import { error, loading, success } from "../../constants/fetchStatuses";
import { FetchStatus } from "../../types/FetchStatus";

interface MainProps {
    content: ReactElement;
    currentFetchStatus: FetchStatus;
    useGradient?: boolean;
    bannerContent?: ReactElement | false;
};

export const Main = ({ content, bannerContent, currentFetchStatus, useGradient = false }: MainProps) => {

    switch (currentFetchStatus) {
        case success:
            return (
                <MainSection>
                    {bannerContent}
                    <MainContent $gradientAvailable={useGradient} $bannerAvailable={!!bannerContent}>
                        {content}
                    </MainContent>
                </MainSection>
            );

        case loading:
            return <>Ładowanie</>;

        case error:
            return <>Błąd</>;

        default:
            return <>Initial</>;
    };
};
