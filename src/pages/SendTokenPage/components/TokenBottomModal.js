import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { BottomModal } from "../../../components/modal";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Typography from "../../../utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //   margin-top: 109px;
  //   padding: 20px;
  z-index: 903;
`;

const IntroTextBox = styled.div`
  width: 100%;
  margin: 0px auto;
  padding-top: 100px;
`;

const FirstIntro = styled.div`
  font-family: Montserrat;
  font-size: 23px;
  font-weight: 600;
  text-align: left;
  color: ${palette.Black};
  line-height: 33.35px;
  padding-left: 16px;
`;

const SecondIntro = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
  line-height: 23.8px;
  margin-top: 14px;
`;

const TermsBox = styled.div`
  margin-top: 64px;
  ${Typography.Caption2}
  color: ${palette.grey_5};
`;

const TokenListBox = styled.div`
  padding: 12px 8px;
  margin-top: 10px;
`;

const TokenListItem = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 20px 16px;
`;

const TokenIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin: 4px;
`;

const TokenTextInfo = styled.div`
  margin-left: 8px;
`;

const TokenCurrency = styled.div`
  text-align: left;
  margin-bottom: 4px;
  ${Typography.Heading2}
  ${palette.Black};
`;

const TokenSemi = styled.div`
  ${Typography.Caption2}
  ${palette.grey3};
`;

const LoginModalInner = (
  type,
  setStatus,
  onClose,
  tokenList,
  setTokenInfo,
  networkId
) => {
  const { t } = useTranslation();

  const TokenItemOnClick = (idx) => {
    setTokenInfo(tokenList[idx]);
    document.body.style.overflow = "auto";
    onClose();
  };

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>{t("selectTokenModalTitle")}</FirstIntro>
      </IntroTextBox>
      <TokenListBox>
        {tokenList.map((token, idx) => (
          <TokenListItem onClick={() => TokenItemOnClick(idx)}>
            <TokenIcon src={token.logoURI} />
            <TokenTextInfo>
              <TokenCurrency>{token.symbol}</TokenCurrency>
              <TokenSemi>{token.name}</TokenSemi>
            </TokenTextInfo>
          </TokenListItem>
        ))}
      </TokenListBox>
    </FullContainer>
  );
};

const TokenBottomModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  type,
  setStatus,
  tokenList,
  setTokenInfo,
}) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={() =>
        LoginModalInner(type, setStatus, onClose, tokenList, setTokenInfo)
      }
    />
  );
};

export default TokenBottomModal;
