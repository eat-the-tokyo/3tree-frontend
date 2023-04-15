import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import MetamaskChainList from "./MetamaskChainlist";
import { MetamaskIcon } from "../../../assets/icons";
import { DropIcon, InputHelp, InputError } from "../../../assets/icons";
import { ContainedButton } from "../../../components/button";
import { Tooltip } from "../../../components/card";
import Chainlist from "../data/SimpleTokenList";
import { bignumber, format, subtract } from "mathjs";
import { useTranslation } from "react-i18next";
import { MobileNetworkBox, TokenBottomModal, CheckSendModal, DropBox } from ".";
import { ConfirmModal } from "../../../components/modal";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
`;

const WalletContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
`;

const IconBox = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const AddressBox = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
`;

const HelpTextContainer = styled.div`
  width: 100%;
  display: flex;
  color: ${palette.gray};
  margin-bottom: 30px;
  align-items: center;
`;

const HelpText = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_4};
`;

const EmailCheckBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EmailInfo = styled.div`
  display: flex;
  align-items: center;
`;

const EmailIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const EmailBox = styled.div`
  ${Typography.Headline3}
  color: ${palette.Black};
`;

const EmailBoxText = styled.div`
  ${Typography.Subhead}
  color: ${palette.Black};
`;

const SendContainer = styled.div`
  display: inline-block;
  align-items: center;
  margin-top: 36px;
`;

const SelectTokenBox = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 104px;
  width: auto;
  height: 40px;
  border-radius: 20px;
  background-color: ${palette.white};
  padding: 8px 6px;
  border: 1px solid ${palette.grey_7};
  margin: 0px auto;
  margin-bottom: 30px;
`;

const TokenInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TokenIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

const TokenName = styled.div`
  ${Typography.Headline2}
  color: ${palette.Black};
`;

const DropIconBox = styled.img`
  width: 24px;
  height: 24px;
`;

const AmountInputBox = styled.input`
  border: hidden;
  width: 100%;
  height: 41px;
  padding: 0px 10px;
  ${Typography.Title2}
  text-align: center;
  &::-webkit-input-placeholder {
    color: ${palette.grey_4};
  }
  &:focus {
    outline: none;
  }
`;

const NetworkWalletInfoBox = styled.div`
  border-radius: 8px;
  border: 1px solid ${palette.sky_3};
  background-color: ${palette.sky_4};
  padding: 20px 16px;
  margin-top: 38px;
`;

const NetworkNameBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const NetworkStatusCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${palette.green_1};
  margin: 5px;
`;

const NetworkName = styled.div`
  ${Typography.Caption1}
  color: ${palette.grey_3};
`;

const WalletTitle = styled.div`
  ${Typography.Headline4}
  color: ${palette.grey_3};
  margin-top: 21px;
`;

const StepButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const ErrorBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  margin-top: 4px;
`;

const ErrorIconBox = styled.img`
  width: 12px;
  height: 12px;
`;

const ErrorText = styled.div`
  ${Typography.Caption2}
  color: ${palette.red_1};
`;

const TooltipStyle = styled.div`
  ${Typography.Footer}
  color: ${palette.white};
  text-align: left;
  font-family: Montserrat;
`;

const NoticeIcon = styled.button`
  width: 16px;
  height: 16px;
  background-image: url(${InputHelp});
  background-size: 13px 13px;
  background-repeat: no-repeat;
  background-position: center;
  border: hidden;
  background-color: transparent;
  position: relative;
  margin-left: 4px;
`;

const CurrentBalanceText = styled.div`
  height: 30px;
  width: 100%;
  ${Typography.Headline3}
  color: ${palette.grey_5};
  text-align: center;
  margin-top: 28px;
`;

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

const walletConvert = (walletAddress) => {
  var returnAddress = walletAddress;
  if (walletAddress?.length > 15) {
    returnAddress =
      walletAddress.substr(0, 6) +
      "..." +
      walletAddress.substr(walletAddress.length - 6, walletAddress.length);
  }
  return returnAddress;
};

function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}

const Step2 = ({
  setWalletType,
  setAddress,
  setNetwork,
  setNetworkId,
  setCurrency,
  setStepStatus,
  walletType,
  address,
  network,
  networkId,
  currency,
  email,
  platformIcon,
  userId,
  stepStatus,
  userIdx,
  setExpired,
  setFinalLink,
  setLoading,
  setFailed,
  resend,
  setBalance,
  balance,
  setRealBalance,
  realBalance,
}) => {
  const [amount, setAmount] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [iconClicked, setIconClicked] = useState(false);
  const [iconHovering, setIconHovering] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [tokenInfo, setTokenInfo] = useState({});
  const [isFinalCheck, setIsFinalCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const TooltipText = (
    <TooltipStyle>
      {/* 이더리움 메인넷 (ETH)
      <br /> */}
      {t("sendpage02_17")}
      <br />
      {t("sendpage02_15")}
    </TooltipStyle>
  );

  function isMobileDevice() {
    return (
      ("ontouchstart" in window || "onmsgesturechange" in window) &&
      !window.ethereum
    );
  }

  useEffect(() => {
    if (!window.ethereum) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    setTokenList(
      Chainlist[Chainlist.findIndex((v) => v.chainId == networkId)]?.tokenList
    );
    if (Chainlist.findIndex((v) => v.chainId == networkId) != -1) {
      setTokenInfo(
        Chainlist[Chainlist.findIndex((v) => v.chainId == networkId)]
          ?.tokenList[0]
      );
    } else {
      setTokenInfo({});
    }
  }, [networkId]);

  useEffect(() => {
    //숫자만 입력하세요.
    if (!(isInt(Number(amount)) || isFloat(Number(amount)))) {
      setErrorMessage(t("sendpage02_3"));
      //보유량만큼만 입력하세요.
    } else if (Number(amount) > Number(realBalance)) {
      setErrorMessage(t("sendpage02_7"));
      //0보다 큰 수치를 입력하세요.
    } else if (amount == "" || Number(amount) == 0) {
      setErrorMessage(t("sendpage02_5"));
      //양수만 입력하세요.
    } else if (Number(amount) < 0) {
      setBalance(0);
      setErrorMessage(t("sendpage02_4"));
      //소숫점 아래 18 자리까지만 입력할 수 있어요.
    } else if (
      isFloat(Number(amount)) &&
      String(amount).split(".")[1] &&
      String(amount).split(".")[1].length > 18
    ) {
      setErrorMessage(t("sendpage02_6"));
    } else {
      //그 외.
      setErrorMessage("");
    }
  }, [amount]);

  useEffect(() => {
    // get balance of custom token (start)
    const Web3 = require("web3");
    let rpcURL;
    if (networkId == 5) {
      rpcURL = process.env.REACT_APP_GO_URL;
    } else if (networkId == 137) {
      rpcURL = process.env.REACT_APP_POLYGON_URL;
    }

    const web3 = new Web3(rpcURL);

    let tokenAddress = tokenInfo.address;
    let walletAddress = address;

    // The minimum ABI to get ERC20 Token balance
    let minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function",
      },
    ];

    let contract = new web3.eth.Contract(minABI, tokenAddress);
    const getBalance = async () => {
      let balance = await contract.methods.balanceOf(walletAddress).call();
      balance = balance / Math.pow(10, tokenInfo.decimals);
      return balance;
    };

    //잔액 가져오기 성공/에러 처리.
    getBalance()
      .then((result) => {
        if (String(result).includes("e")) {
          setBalance(
            result * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
          );
          setRealBalance(
            result * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
          );
        } else {
          setBalance(result);
          setRealBalance(result);
        }
      })
      .catch(async (err) => {
        if (
          !err
            .toString()
            .startsWith(
              "Error: Returned values aren't valid, did it run Out of Gas? "
            )
        ) {
          if (isMobileDevice()) {
            await web3.eth.getBalance(address).then((result) => {
              setBalance(result / Math.pow(10, 18));
              setRealBalance(result / Math.pow(10, 18));
            });
          } else {
            let metamaskProvider = "";
            if (window.ethereum.providers) {
              metamaskProvider = window.ethereum.providers.find(
                (provider) => provider.isMetaMask
              );
            } else {
              metamaskProvider = window.ethereum;
            }

            let balance = "0";

            balance = await metamaskProvider.request({
              method: "eth_getBalance",
              params: [address, "latest"],
            });

            const decimal = parseInt(balance, 16) / Math.pow(10, 18);
            if (String(decimal).includes("e")) {
              setBalance(
                decimal * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
              );
              setRealBalance(
                decimal * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
              );
            } else {
              setBalance(toFixed(decimal));
              setRealBalance(toFixed(decimal));
            }
          }
        } else {
          // 해당 token(asset)이 아예 존재하지 않으면
          setBalance("0");
          setRealBalance("0");
        }
      });

    setAmount("");
    setCurrency(tokenInfo.symbol);
  }, [tokenInfo, address]);

  useEffect(() => {
    if (stepStatus === 2) {
      (async () => {
        setWalletType("Metamask");
        let metamaskProvider = "";
        if (window.ethereum.providers) {
          metamaskProvider = window.ethereum.providers.find(
            (provider) => provider.isMetaMask
          );
        } else {
          metamaskProvider = window.ethereum;
        }

        //계정 목록 가져오기.
        const accounts = await metamaskProvider.request({
          method: "eth_requestAccounts",
        });

        //첫 번째 계정을 선택.
        const account = accounts[0];
        setAddress(account);

        //선택한 계정의 잔액을 가져오기.
        const balance = await metamaskProvider.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });

        //계정이 변경될 때 잔액을 다시 가져오도록 등록.
        metamaskProvider.on("accountsChanged", function (accounts) {
          // 현재 계정 주소를 업데이트.
          setAddress(accounts[0]);
        });

        const decimal = parseInt(balance, 16) / Math.pow(10, 18);
        if (String(decimal).includes("e")) {
          setBalance(
            decimal * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
          );
          setRealBalance(
            decimal * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
          );
        } else {
          setBalance(toFixed(decimal));
          setRealBalance(toFixed(decimal));
        }

        //현재 네트워크 ID와 네이티브 토큰 심볼을 가져옴.
        //네트워크 ID와 currency를 업데이트
        metamaskProvider.on("chainChanged", async function () {
          const balance2 = await metamaskProvider.request({
            method: "eth_getBalance",
            params: [account, "latest"],
          });

          const decimal2 = parseInt(balance2, 16) / Math.pow(10, 18);
          if (String(decimal2).includes("e")) {
            setBalance(
              decimal2 * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
            );
            setRealBalance(
              decimal2 * Math.pow(10, 18 - tokenInfo.decimals).toFixed(12)
            );
          } else {
            setBalance(toFixed(decimal2));
            setRealBalance(toFixed(decimal2));
          }
        });

        const currentNetwork = metamaskProvider.networkVersion;
        setNetworkId(currentNetwork);
        if (currentNetwork == 5 || currentNetwork == 137) {
          // 현재 지원하는 네트워크 유효성 검사
          setNetwork(
            MetamaskChainList[
              MetamaskChainList.findIndex(
                (v) => v.pageProps.chain.chainId == currentNetwork
              )
            ].pageProps.chain.name
          );
        } else {
          setNetwork(t("sendpage02_13"));
        }

        metamaskProvider.on("chainChanged", function (chainId) {
          // Time to reload your interface with accounts[0]!
          const decChainId = parseInt(chainId, 16);
          if (decChainId == 5 || decChainId == 137) {
            // 현재 지원하는 네트워크 유효성 검사
            setNetwork(
              MetamaskChainList[
                MetamaskChainList.findIndex(
                  (v) => v.pageProps.chain.chainId == decChainId
                )
              ].pageProps.chain.name
            );
          } else {
            setNetwork(t("sendpage02_13"));
          }

          setNetworkId(decChainId);
        });
      })();
    }
  }, [stepStatus]);

  const sendOnClick = () => {
    setIsFinalCheck(true);
  };

  const maxOnClick = () => {
    setAmount(balance);
    setBalance(0);
  };

  const notiOnClose = () => {
    setIconClicked(false);
  };

  const navigation = useNavigate();

  return (
    <Container>
      {showModal && (
        <ConfirmModal
          visible={setShowModal}
          onClose={() => navigation("/")}
          text={<>{t("addWalletModalAlert")}</>}
          buttonText={<>{t("addWalletModalAlertButton")}</>}
          subActionOnClick={() => {
            window.open(
              "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
            );
          }}
        />
      )}
      {tokenOpen && tokenList ? (
        <TokenBottomModal
          visible={tokenOpen}
          closable={true}
          maskClosable={true}
          onClose={() => setTokenOpen(false)}
          tokenList={tokenList}
          setTokenInfo={setTokenInfo}
          networkId={networkId}
        />
      ) : (
        <>
          {isFinalCheck && (
            <CheckSendModal
              visible={isFinalCheck}
              closable={true}
              maskClosable={true}
              onClose={() => setIsFinalCheck(false)}
              amount={amount}
              currency={tokenInfo.symbol}
              sender={userId}
              platform={platformIcon}
              receiver={email}
              stepStatus={stepStatus}
              setStepStatus={setStepStatus}
              networkId={networkId}
              userIdx={userIdx}
              address={address}
              setExpired={setExpired}
              setFinalLink={setFinalLink}
              tokenInfo={tokenInfo}
              setLoading={setLoading}
              setFailed={setFailed}
              resend={resend}
            />
          )}
        </>
      )}
      <EmailCheckBox>
        <EmailInfo>
          <EmailIcon src={platformIcon} />
          <EmailBox>{email}</EmailBox>
        </EmailInfo>
        <EmailBoxText>{t("sendpage02_1")}</EmailBoxText>
      </EmailCheckBox>
      <SendContainer>
        <SelectTokenBox onClick={() => setTokenOpen(true)}>
          <TokenInfo>
            {tokenInfo?.symbol && (
              <>
                <TokenIcon src={tokenInfo?.logoURI} />
                <TokenName>{tokenInfo?.symbol}</TokenName>
              </>
            )}
          </TokenInfo>
          <DropIconBox src={DropIcon} />
        </SelectTokenBox>
        <AmountInputBox
          placeholder={t("sendpage02_2")}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            if (
              (isInt(Number(e.target.value)) ||
                isFloat(Number(e.target.value))) &&
              !(Number(e.target.value) > Number(realBalance))
            ) {
              const result = subtract(
                bignumber(Number(realBalance)),
                bignumber(Number(e.target.value))
              );
              setBalance(String(result));
            } else {
              setBalance(toFixed(realBalance));
            }
          }}
        />
        {errorMessage && (
          <ErrorBox>
            <ErrorIconBox src={InputError} />
            <ErrorText>{errorMessage}</ErrorText>
          </ErrorBox>
        )}
        {realBalance == balance ? (
          <ContainedButton
            type="secondary"
            styles="outlined"
            states="default"
            size="small"
            label={
              balance && realBalance
                ? `${t("sendpage02_8")}${balance} ${currency}${t(
                    "sendpage02_9"
                  )}`
                : t("sendpage02_10")
            }
            style={{ margin: "0px auto", marginTop: "32px" }}
            onClick={balance && realBalance ? maxOnClick : null}
          />
        ) : (
          <CurrentBalanceText>
            {t("sendpage02_11")}
            {balance} {currency}
          </CurrentBalanceText>
        )}
      </SendContainer>
      <>
        {isMobileDevice() ? (
          <MobileNetworkBox
            networkId={networkId}
            setNetworkId={setNetworkId}
            network={network}
          />
        ) : (
          <>
            <NetworkWalletInfoBox>
              <NetworkNameBox>
                {network == t("sendpage02_13") || !network ? (
                  <>
                    {/* <NetworkStatusCircle style={{backgroundColor:palette.red_2}}/> */}
                    <NetworkName style={{ color: palette.red_2 }}>
                      {t("sendpage02_13")}
                    </NetworkName>
                  </>
                ) : (
                  <>
                    <NetworkStatusCircle />
                    <NetworkName> {network}</NetworkName>
                  </>
                )}
              </NetworkNameBox>
              <WalletTitle>{t("sendpage02_12")}</WalletTitle>
              <WalletContainer>
                <IconBox src={MetamaskIcon} />
                <AddressBox>{walletConvert(address)}</AddressBox>
              </WalletContainer>
            </NetworkWalletInfoBox>
            <HelpTextContainer>
              <HelpText>{t("sendpage02_14")}</HelpText>
              <NoticeIcon
                onClick={() => setIconClicked(!iconClicked)}
                onMouseEnter={() => {
                  setIconHovering(true);
                }}
                onMouseLeave={() => {
                  setIconHovering(false);
                }}
              >
                {(iconClicked || iconHovering) && (
                  <Tooltip
                    text={TooltipText}
                    closable={true}
                    maskClosable={true}
                    onClose={notiOnClose}
                  />
                )}
              </NoticeIcon>
            </HelpTextContainer>
          </>
        )}
      </>
      <StepButtonContainer>
        {!errorMessage && tokenInfo?.symbol ? (
          <ContainedButton
            type="primary"
            styles="filled"
            states="default"
            size="large"
            label={t("sendpage02_16")}
            onClick={sendOnClick}
          />
        ) : (
          <ContainedButton
            type="primary"
            styles="filled"
            states="disabled"
            size="large"
            label={t("sendpage02_16")}
          />
        )}
      </StepButtonContainer>
    </Container>
  );
};

export default Step2;
