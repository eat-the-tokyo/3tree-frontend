import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const FullContainer = styled.div`
  height: 212px;
  width: 100%;
  padding-top: 40px;
  margin-bottom: 38px;
`;

const ImageContainer = styled.img`
  width: 100px;
  height: 100px;
  margin: 0px auto;
  margin-bottom: 24px;
`;

const TextContainer = styled.div`
  width: 100%;
  ${Typograpy.Body}
  text-align: center;
  color: ${palette.grey_2};
`;

const EmptyCard = ({ icon, text }) => {
  const { t } = useTranslation();

  return (
    <FullContainer>
      <ImageContainer src={icon} />
      <TextContainer>
        {t("selectWalletPage3")}
        {text}
        {t("selectWalletPage3_2")}
        <br />
        {t("selectWalletPage4")}
      </TextContainer>
    </FullContainer>
  );
};

export default EmptyCard;
