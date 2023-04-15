import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";

const PrimaryButton = styled.button`
  min-width: ${({ size }) =>
    size === "large" ? "75px" : size === "small" ? "68px" : "75px"};
  height: 32px;
  border-radius: 15px;
  background-color: transparent;
  border: hidden;
  &:hover {
    background-color: ${palette.grey_6};
  }
  display: flex;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
`;

const PrimaryTextBox = styled.div`
  width: 100%;
  ${Typograpy.Caption1}
  font-size: ${({ size }) =>
    size === "large" ? "15px" : size === "small" ? "10px" : "15px"};
  color: ${({ styles }) =>
    styles === "active"
      ? palette.blue_1
      : styles === "unactive"
      ? palette.grey_5
      : palette.blue_1};
  margin: auto 0px;
`;

// type="primary";
// style="filled";
// states="default";
// size="large";
// label="송금하기";
// Show icon=false;
// Show txt=true;

const TextButton = ({ ref, styles, states, size, label, onClick, style }) => {
  return (
    <PrimaryButton
      size={size}
      states={states}
      styles={styles}
      onClick={onClick}
      style={style}
      ref={ref}
    >
      <PrimaryTextBox styles={styles} states={states} size={size}>
        {label}
      </PrimaryTextBox>
    </PrimaryButton>
  );
};

export default TextButton;
