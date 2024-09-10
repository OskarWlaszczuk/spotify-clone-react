import { SectionContainer } from "../../common/SectionContainer";
import { IconBox } from "../../common/IconBox";
import { ReactComponent as MyLibrary } from "./icons/MyLibrary.svg";
import { AsidePanel } from "./styled";

export const Library = () => {
  return (
    <AsidePanel>
      <SectionContainer>
        <IconBox
          Icon={MyLibrary}
          content="My library"
          extraContent="+"
        />
      </SectionContainer>
    </AsidePanel>
  );
};