import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import { InputError, InputVerified, InputHelp } from "../../assets/icons";

const InputBoxContainer = styled.div``;

const LableFullBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
`;

const LabelBox = styled.div`
  ${Typograpy.Headline4}
  color: ${palette.grey_3};
  margin-bottom: 4px;
`;

const RequiredMark = styled.div`
  ${Typograpy.Caption2}
  color: #EF7642;
  margin-left: 2px;
`;

const InputContainer = styled.input`
  width: 100%;
  border: ${({ state }) =>
    state === "typing"
      ? `1px solid ${palette.blue_2}`
      : state === "verified"
      ? `1px solid ${palette.green_1}`
      : state === "error"
      ? `1px solid ${palette.red_1}`
      : `1px solid ${palette.grey_6}`};
  padding: 15px 16px;
  padding-left: ${({ fixedMentSize }) => fixedMentSize};
  border-radius: 8px;
  ${Typograpy.Headline3}
  &::-webkit-input-placeholder {
    color: ${palette.grey_1};
  }
  &:focus {
    outline: none;
  }
`;

const MessageBox = styled.div`
  margin-top: 4px;
  width: 100%;
  display: flex;
  justify-content: left;
`;

const MessageIcon = styled.img.attrs((props) => ({
  src:
    props.state === "verified"
      ? InputVerified
      : props.state === "error"
      ? InputError
      : InputHelp,
}))`
  width: 11px;
  height: 11px;
  margin: 3px;
`;

const MessageText = styled.div`
  ${Typograpy.Caption2}
  color: ${({ state }) =>
    state === "verified"
      ? palette.green_1
      : state === "error"
      ? palette.red_1
      : palette.grey_3};
`;

const InputFullBox = styled.div`
  position: relative;
`;

const FixedMentBox = styled.div`
  position: absolute;
  display: block;
  left: 15px;
  top: 16px;
  ${Typograpy.Headline3}
  color: ${(props) =>
    props.state === "typing" ? `${palette.black}` : `${palette.grey_1}`}
`;

// state = ["inactive", "filled", "typing", "verified", "error", "help"]
const InputBox = ({
  label,
  state,
  isRequired,
  placeholder,
  message,
  fixedMent,
  fixedMentSize,
  value,
  onChange,
  height,
}) => {
  return (
    <InputBoxContainer>
      <LableFullBox>
        <LabelBox>{label}</LabelBox>
        {isRequired && <RequiredMark>*</RequiredMark>}
      </LableFullBox>
      <InputFullBox>
        <InputContainer
          style={height ? { height: `${height}px` } : {}}
          placeholder={placeholder}
          state={state}
          fixedMentSize={fixedMentSize}
          value={value}
          onChange={onChange}
        />
        {fixedMent ? (
          <FixedMentBox state={state}>{fixedMent}</FixedMentBox>
        ) : (
          <></>
        )}
      </InputFullBox>
      {message ? (
        <MessageBox>
          <MessageIcon state={state} />
          <MessageText state={state}>{message}</MessageText>
        </MessageBox>
      ) : (
        <></>
      )}
    </InputBoxContainer>
  );
};

export default InputBox;
