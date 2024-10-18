import { ReactElement } from "react";
import { MainContent, MainSection } from "./styled";
import { error, loading, success } from "../../constants/fetchStatuses";

interface MainProps {
    content: ReactElement;
    fetchStatus: string;
    useGradient?: true | undefined;
    bannerContent?: ReactElement | false;
};

export const Main = ({ content, bannerContent, fetchStatus, useGradient }: MainProps) => {

    switch (fetchStatus) {
        case success:
            return (
                <MainSection>
                    {bannerContent}
                    <MainContent $gradientAvailable={useGradient || false} $bannerAvailable={!!bannerContent}>
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
    }
};
