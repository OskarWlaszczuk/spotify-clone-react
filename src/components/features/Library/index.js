import { SectionContainer } from "../../common/SectionContainer";
import { IconBoxList } from "../../common/IconBoxList";
import { IconBox } from "../../common/IconBox";
import { ReactComponent as MyLibrary } from "./icons/MyLibrary.svg";
import { AsidePanel } from "./styled";

export const Library = () => {
  return (
    <AsidePanel>
      <SectionContainer>
        <IconBoxList>
          <IconBox
            Icon={MyLibrary}
            content="My library"
            extraContent="+"
          />
        </IconBoxList>
      </SectionContainer>
    </AsidePanel>
  );
};