import { IconBox } from "../../../../common/components/IconBox";
import { LibraryIcon } from "./styled";
import { StyledLibraryIcon } from "./StyledLibraryIcon";

export const Library = () => {
  return (
    <LibraryIcon>
      <IconBox
        Icon={StyledLibraryIcon}
        text="My library"
        extraContent="+"
      />
    </LibraryIcon>
  );
};