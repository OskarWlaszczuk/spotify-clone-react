import { isNotEmpty } from "../../../functions/isNotEmpty";
import { Button } from "./styled";

interface ListToggleButtonProps {
    toggleList: () => void;
    text: string;
    isActive: boolean;
    list: any[];
};

export const ListToggleButton = ({ toggleList, text, isActive, list }: ListToggleButtonProps) => {

    return (
        <>
            {
                isNotEmpty(list) && (
                    <Button
                        onClick={toggleList}
                        $active={isActive}
                    >
                        {text}
                    </Button>
                )
            }
        </>
    );
};