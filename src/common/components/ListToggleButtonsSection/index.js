import { isMatch } from "../../functions/isMatch"
import { ListToggleButton } from "../ListToggleButton"

export const ListToggleButtonsSection = ({ listToggleButtonDataList, setCurrentCategoryData, targetCategory }) => {
    return (
        <>
            {
                listToggleButtonDataList.map(({ list, category, text }) => (
                    <ListToggleButton
                        list={list}
                        toggleList={() => setCurrentCategoryData({
                            category,
                            list,
                        })}
                        text={text}
                        isActive={isMatch(category, targetCategory)}
                    />
                ))
            }
        </>
    )
}