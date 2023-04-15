import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import TextButton from "./TextButton";
import { ChevronRightGray } from "../../assets/icons";

const ButtonContainer = styled.button`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  background-color: transparent;
  border: hidden;
`;

const LabelBox = styled.div`
  ${Typograpy.Headline2}
`;

const RightIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ListButton = ({ label, select, onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>
      <LabelBox>{label}</LabelBox>
      {select ? (
        <TextButton
          styles="active"
          states="default"
          size="large"
          style={{ marginRight: "-10px" }}
          label={select}
        />
      ) : (
        <RightIcon src={ChevronRightGray} />
      )}
    </ButtonContainer>
  );
};

export default ListButton;
