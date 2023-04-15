import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import { CardEdit, CardTrash } from "../../assets/icons";

const CardContainer = styled.div`
  width: 100%;
  //   min-width: 350px;
  padding: 18px 16px;
  border-radius: 16px;
  background-color: ${palette.white};
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 6px 0px #f0f1f2;
  //   box-shadow: 0px 4px 20px 0px #E9EAEC33;
  //   border: 1px solid;
  border: ${(props) => (props.value ? `1px solid ${palette.sky_1}` : "")};
`;

const CardContainerButton = styled.button`
  width: 100%;
  //   min-width: 350px;
  padding: 18px 16px;
  border-radius: 16px;
  background-color: ${palette.white};
  display: flex;
  justify-content: space-between;
  // box-shadow: 0px 0px  6px 0px #f0f1f2;
  //   box-shadow: 0px 4px 20px 0px #E9EAEC33;
  //   border: 1px solid;
  border: hidden;
`;

const CardInfoBox = styled.div`
  display: flex;
  justify-content: left;
  gap: 8px;
`;

const CardLabel = styled.div`
  ${Typograpy.Headline2}
  color: ${palette.Black};
  margin: auto 0px;
`;

const CardIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const CardToolBox = styled.div`
  display: flex;
  justify-content: right;
`;

const CardToolButton = styled.button`
  width: 32px;
  height: 32px;
  background-image: url(${({ icon }) => icon});
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  padding: 6px;
  border: hidden;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  width: auto;
  position: relative;
  // border: 1px solid #ccc;
  box-sizing: border-box;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #ccc;
    &::after {
      // content: "\f005";
      // font-family: "FontAwesome";
      // display: block;
      // color: white;
      // width: 12px;
      // height: 12px;
      // margin: 4px;
    }
  }
  &:checked + ${Item} {
    background: ${palette.blue_1};
    border: 2px solid ${palette.blue_1};
  }
  &:checked + ${RadioButtonLabel} {
    background: ${palette.blue_1};
    border: 1px solid ${palette.blue_1};
    box-shadow: 0 0 0 4px #fff inset;
    &::after {
      // content: "\f005";
      // font-family: "FontAwesome";
      // display: block;
      // color: white;
      // width: 12px;
      // height: 12px;
      // margin: 4px;
    }
  }
`;

const EditableCard = ({
  label,
  icon,
  isEdit,
  isTrash,
  isCheck,
  deleteOnClick,
  editOnClick,
  onClick,
  checkOnClick,
  select,
  idx,
  ref,
  style,
}) => {
  return (
    <div ref={ref}>
      {onClick ? (
        <CardContainerButton style={style} onClick={onClick}>
          <CardInfoBox>
            <CardIcon src={icon} />
            <CardLabel style={style}>{label}</CardLabel>
          </CardInfoBox>
          <CardToolBox></CardToolBox>
        </CardContainerButton>
      ) : (
        <CardContainer value={isCheck && select == idx} style={style}>
          <CardInfoBox>
            <CardIcon src={icon} />
            <CardLabel>{label}</CardLabel>
          </CardInfoBox>
          <CardToolBox>
            {isEdit ? (
              <CardToolButton icon={CardEdit} onClick={editOnClick} />
            ) : (
              <></>
            )}
            {isTrash ? (
              <CardToolButton icon={CardTrash} onClick={deleteOnClick} />
            ) : (
              <></>
            )}
            {isCheck ? (
              <Item>
                <RadioButton
                  type="radio"
                  name="radio"
                  value={idx}
                  checked={select == idx}
                  onChange={(event) => checkOnClick(event)}
                />
                <RadioButtonLabel />
              </Item>
            ) : (
              <></>
            )}
          </CardToolBox>
        </CardContainer>
      )}
    </div>
  );
};

export default EditableCard;
