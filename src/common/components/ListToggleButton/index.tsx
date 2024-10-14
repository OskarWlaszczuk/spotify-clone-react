import { Button } from "./styled";

interface ListToggleButtonProps {
    toggleList: () => void;
    text: string;
    isActive: boolean;
};

export const ListToggleButton = ({ toggleList, text, isActive }: ListToggleButtonProps) => {

    return (
        <Button
            onClick={toggleList}
            $active={isActive}
        >
            {text}
        </Button>
    );
};