import { ReactElement } from "react";
import { MainContent, MainSection } from "./styled";
import { error, loading, success } from "../../constants/fetchStatuses";

interface MainProps {
    content: ReactElement;
    fetchStatus: string;
    banner?: ReactElement | false;
}

export const Main = ({ content, banner, fetchStatus }: MainProps) => {

    switch (fetchStatus) {
        case success:
            return (
                <MainSection>
                    {banner}
                    <MainContent $bannerAvailable={!!banner}>
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
