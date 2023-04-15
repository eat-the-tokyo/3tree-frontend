import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import { TooltipBubbleTail } from "../../assets/icons";

const FullBox = styled.div`
  display: absolute;
`;

const BubbleTailBox = styled.img`
  width: 14px;
  position: absolute;
  top: 20px;
  left: -5px;
`;

const Container = styled.div`
  width: 227px;
  padding: 18px 16px;
  border-radius: 16px;
  background-color: ${palette.grey_1};
  display: flex;
  position: absolute;
  top: 27px;
  left: -34px;
`;

const DropBoxOuterBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: 0px auto;
  position: relative;
  z-index: 900;
`;

const Tooltip = ({ className, onClose, maskClosable, text }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <>
      <DropBoxOuterBox
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
      >
        <FullBox>
          <BubbleTailBox src={TooltipBubbleTail} />
          <Container>{text}</Container>
        </FullBox>
      </DropBoxOuterBox>
    </>
  );
};

export default Tooltip;
