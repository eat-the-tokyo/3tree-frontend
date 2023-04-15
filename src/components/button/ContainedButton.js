import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";

const PrimaryButton = styled.button`
  min-width: ${({ size }) =>
    size === "large" ? "115px" : size === "small" ? "101px" : "108px"};
  width: ${({ size }) => (size === "large" ? "100%" : "")};
  height: ${({ size }) =>
    size === "large" ? "56px" : size === "small" ? "36px" : "40px"};
  border-radius: ${({ size }) =>
    size === "large" ? "18px" : size === "small" ? "10px" : "12px"};
  /* // padding: ${({ size }) =>
    size === "large"
      ? "18px 16px"
      : size === "small"
      ? "8px 16px"
      : "10px 16px"}; */
  display: flex;
  justify-content: center;
  gap: 2px;
  background-color: ${({ styles }) =>
    styles === "filled"
      ? palette.blue_1
      : styles === "outlined"
      ? palette.white
      : palette.blue_1};
  background-color: ${({ states, styles }) =>
    states === "disabled" && styles === "filled" ? palette.grey_7 : ""};
  border: ${({ styles }) =>
    styles === "filled"
      ? "hidden"
      : styles === "outlined"
      ? `1px solid ${palette.blue_3}`
      : "hidden"};
  border: ${({ styles, states }) =>
    states === "disabled" && styles === "outlined"
      ? `1px solid ${palette.grey_6}`
      : ""};
`;

const SecondaryButton = styled.button`
  min-width: ${({ size }) =>
    size === "large" ? "115px" : size === "small" ? "101px" : "108px"};
  width: ${({ size }) => (size === "large" ? "100%" : "")};
  height: ${({ size }) =>
    size === "large" ? "56px" : size === "small" ? "36px" : "40px"};
  border-radius: ${({ size }) =>
    size === "large" ? "18px" : size === "small" ? "10px" : "12px"};
  /* // padding: ${({ size }) =>
    size === "large"
      ? "18px 16px"
      : size === "small"
      ? "8px 16px"
      : "10px 16px"}; */
  display: flex;
  justify-content: center;
  gap: 2px;
  background-color: ${({ styles }) =>
    styles === "filled"
      ? palette.sky_3
      : styles === "outlined"
      ? palette.white
      : palette.sky_3};
  background-color: ${({ states, styles }) =>
    states === "disabled" && styles === "filled" ? palette.grey_7 : ""};
  border: ${({ styles }) =>
    styles === "filled"
      ? "hidden"
      : styles === "outlined"
      ? `1px solid ${palette.grey_6}`
      : "hidden"};
  border: ${({ styles, states }) =>
    states === "disabled" && styles === "outlined"
      ? `1px solid ${palette.grey_6}`
      : ""};
`;

const IconContainer = styled.img`
  width: 20px;
  height: 20px;
  margin: auto 0px;
  margin-right: 6px;
`;

const PrimaryTextBox = styled.div`
  ${Typograpy.Headline2}
  font-size: ${({ size }) =>
    size === "large" ? "17px" : size === "small" ? "13px" : "15px"};
  color: ${({ styles }) =>
    styles === "filled"
      ? palette.white
      : styles === "outlined"
      ? palette.blue_1
      : palette.white};
  color: ${({ states }) => (states === "disabled" ? palette.grey_5 : "")};
  margin: auto 0px;
`;

const SecondaryTextBox = styled.div`
  ${Typograpy.Headline2}
  font-size: ${({ size }) =>
    size === "large" ? "17px" : size === "small" ? "13px" : "15px"};
  color: ${({ styles }) =>
    styles === "filled"
      ? palette.blue_1
      : styles === "outlined"
      ? palette.grey_2
      : palette.blue_1};
  color: ${({ states }) => (states === "disabled" ? palette.grey_5 : "")};
  margin: auto 0px;
`;

// type="primary";
// style="filled";
// states="default";
// size="large";
// label="송금하기";
// Show icon=false;
// Show txt=true;

const ContainedButton = ({
  type,
  styles,
  states,
  size,
  label,
  icon,
  show_txt = true,
  onClick,
  style,
}) => {
  return (
    <>
      {type === "primary" ? (
        <PrimaryButton
          size={size}
          states={states}
          type={type}
          styles={styles}
          onClick={onClick}
          style={style}
        >
          {icon ? <IconContainer src={icon} /> : <></>}
          {show_txt ? (
            <PrimaryTextBox styles={styles} states={states} size={size}>
              {label}
            </PrimaryTextBox>
          ) : (
            <></>
          )}
        </PrimaryButton>
      ) : (
        <SecondaryButton
          size={size}
          states={states}
          type={type}
          styles={styles}
          onClick={onClick}
          style={style}
        >
          {icon ? <IconContainer src={icon} /> : <></>}
          {show_txt ? (
            <SecondaryTextBox styles={styles} states={states} size={size}>
              {label}
            </SecondaryTextBox>
          ) : (
            <></>
          )}
        </SecondaryButton>
      )}
    </>
  );
};

export default ContainedButton;
