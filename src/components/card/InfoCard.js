import styled from "styled-components";
import { COLORS as palette } from "../../utils/style/Color/colors";
import Typography from "../../utils/style/Typography/index";

const Container = styled.div`
  width: 100%;
`;

const InfoHeader = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_3};
  margin-bottom: 6px;
`;

const InfoDescription = styled.div`
  ${Typography.Footer}
  color: ${palette.grey_3};
`;

const InfoCard = ({ header, info }) => {
  return (
    <Container>
      <InfoHeader>{header}</InfoHeader>
      <InfoDescription>{info}</InfoDescription>
    </Container>
  );
};

export default InfoCard;
