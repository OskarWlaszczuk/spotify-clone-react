import { IconBox } from "../../../common/components/IconBox";
import { ReactComponent as MyLibrary } from "./icons/MyLibrary.svg";
import { AsidePanel } from "./styled";

export const Library = () => {
  return (
    <AsidePanel>
      <IconBox
        Icon={MyLibrary}
        text="My library"
        extraContent="+"
      />
    </AsidePanel>
  );
};