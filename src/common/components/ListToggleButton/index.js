import { Button } from "./styled";

export const ListToggleButton = ({ toggleList, text, isActive }) => {

    return (
        <Button
            onClick={toggleList}
            $active={isActive}
        >
            {text}
        </Button>
    );
};