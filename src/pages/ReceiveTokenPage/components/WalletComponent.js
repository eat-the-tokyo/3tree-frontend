import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ContainedButton } from "../../../components/button";
import Typography from "../../../utils/style/Typography/index";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import { EmptyCard, EditableCard } from "../../../components/card";
import { EmptyWallet, MetamaskIcon } from "../../../assets/icons";
import { DeleteModal } from "../../../components/modal";
import { addWallet, deleteWallet } from "../../../utils/api/wallets";
import {
  receiveTrxs,
  getTrxsLinkInfo,
  toggleIsValid,
} from "../../../utils/api/trxs";
import Chainlist from "../../SendTokenPage/data/SimpleTokenList";
import { useTranslation } from "react-i18next";
import AddWalletAddress from "../../../components/modal/AddWalletAddress";
import { ConfirmModal } from "../../../components/modal";
import { useSetRecoilState } from "recoil";
import { receiveTrxHashState } from "../../../utils/atoms/trxs";

const FullContainer = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 60px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TItleText = styled.div`
  text-align: left;
  ${Typography.Headline1}
  color: ${palette.Black};
`;

const ListContainer = styled.div`
  width: 100%;
  padding-top: 40px;
  display: grid;
  gap: 20px;
`;

const WalletListBox = styled.div`
  min-height: 283px;
`;

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

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x = Math.imul(x, Math.pow(10, e - 1));
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

const WalletComponent = ({
  walletList,
  setInfoChange,
  infoChange,
  setComplete,
  setReceiveInfo,
  linkInfo,
  setLoading,
  setFailed,
  resend,
  select,
  setSelect,
}) => {
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [realDelete, setRealDelete] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(-1);
  const [addedWallet, setAddedWallet] = useState();
  const [transactionHash, setTransactionHash] = useState(null);
  const [checkStatus, setCheckStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const setReceiveTrxHash = useSetRecoilState(receiveTrxHashState);
  const { t } = useTranslation();

  const Web3 = require("web3");
  let web3 = "";
  if (Number(linkInfo.networkId) == 137) {
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_POLYGON_URL)
    );
  } else {
    web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_GO_URL)
    );
  }

  useEffect(() => {
    if (resend) {
      getTokenOnClick();
    }
  }, []);

  useEffect(() => {
    if (transactionHash) {
      const interval = setInterval(() => {
        web3.eth
          .getTransactionReceipt(transactionHash)
          .then((receipt) => {
            if (!receipt) {
              console.log("pending");
              setLoading(true);
            } else {
              setLoading(false);
              setComplete(true);
              clearInterval(interval);
            }
          })
          .catch((err) => {
            // 존재하지 않는 hash 값일 경우 (+ pending이 길게 되어 tx가 사라진 경우)
            console.log(err);
            setLoading(false);
            setFailed(true);
            clearInterval(interval);
          });
      }, 1000);
    }
  }, [transactionHash, checkStatus]);

  useEffect(() => {
    if (realDelete) {
      deleteWallet(walletList[deleteIdx].index).then(() => {
        setDeleteIdx(-1);
        setRealDelete(false);
        setInfoChange(!infoChange);
      });
    }
  }, [realDelete]);

  useEffect(() => {
    (async () => {
      if (addedWallet) {
        //중복 검사
        let notDuplicated = true;
        walletList.forEach((wallet) => {
          if (wallet.walletAddress == addedWallet) {
            notDuplicated = false;
          }
        });
        if (notDuplicated) {
          // 추가하는 action
          await addWallet("METAMASK", addedWallet).then(() => {
            var tmpWalletList = walletList;
            tmpWalletList.push({
              walletAddress: addedWallet,
            });

            setAddedWallet();
            setInfoChange(!infoChange);
          });
        }
      }
    })();
  }, [addedWallet]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteOnClick = (idx) => {
    setDeleteIdx(idx);
    setDeleteModalOn(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOn(false);
  };

  function isMobileDevice() {
    return (
      ("ontouchstart" in window || "onmsgesturechange" in window) &&
      !window.ethereum
    );
  }

  const walletConnectOnClick = async () => {
    if (!window.ethereum && !isMobileDevice()) {
      setShowModal(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelect(value);
  };

  const getTokenOnClick = async () => {
    await getTrxsLinkInfo(linkInfo.linkKey).then(async (infoRes) => {
      if (infoRes.isValid) {
        if (resend) {
          setLoading(true);
        }
        const chainIndex = Chainlist.findIndex(
          (v) => v.chainId == Number(linkInfo.networkId) // 지금은 goerli 밖에 없으니까..
        );
        const chainInfo = Chainlist[chainIndex]?.tokenList;
        const tokenIndex = chainInfo.findIndex(
          (v) => v.symbol == linkInfo.tokenUdenom
        );
        const tokenInfo = chainInfo[tokenIndex];

        const account = await web3.eth.accounts.privateKeyToAccount(
          process.env.REACT_APP_WALLET_PRIVATE_KEY
        );

        if (tokenInfo.symbol == "USDC" || tokenInfo.symbol == "USDT") {
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
            //transfer
            {
              constant: false,
              inputs: [
                { name: "_to", type: "address" },
                { name: "_value", type: "uint256" },
              ],
              name: "transfer",
              outputs: [{ name: "", type: "bool" }],
              payable: false,
              stateMutability: "nonpayable",
              type: "function",
            },
            //approve
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
          ];

          const tempContract = new web3.eth.Contract(minABI, tokenInfo.address);

          async function sendToken() {
            setLoading(true);
            let data = tempContract.methods
              .transfer(
                walletList[select].walletAddress,
                web3.utils.toHex(
                  toFixed(
                    Number(linkInfo.tokenAmount) *
                      Math.pow(10, tokenInfo.decimals)
                  )
                )
              )
              .encodeABI();
            return data;
          }

          sendToken().then(async (data) => {
            const getGasAmount = async (fromAddress, toAddress) => {
              const gasAmount = await web3.eth.estimateGas({
                to: toAddress,
                from: fromAddress,
                data: data,
              });
              return gasAmount;
            };

            const gasAmount = await getGasAmount(
              account.address,
              tokenInfo.address,
              toFixed(Number(linkInfo.tokenAmount))
            );

            const fee = gasAmount;

            const txObj = {
              data: data,
              value: 0,
              gas: fee,
              to: tokenInfo.address,
            };

            await web3.eth.accounts.signTransaction(
              txObj,
              process.env.REACT_APP_WALLET_PRIVATE_KEY,
              async (err, signedTx) => {
                if (err) {
                  console.log(err);
                  return err;
                } else {
                  setReceiveTrxHash(signedTx.transactionHash);
                  setTransactionHash(signedTx.transactionHash); // asnyc 문제 때문에

                  return await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                    async (err, res) => {
                      if (err) {
                        console.log(err);
                        if (
                          String(err).startsWith(
                            "Error: Returned error: already known"
                          ) ||
                          String(err).startsWith(
                            "Error: Returned error: replacement transaction underpriced"
                          )
                        ) {
                          setLoading(false);
                          setFailed(true);
                        }
                      } else {
                        setTransactionHash(res); // 저장해야할 hash값

                        const interval = setInterval(() => {
                          web3.eth
                            .getTransactionReceipt(signedTx.transactionHash)
                            .then((receipt) => {
                              if (!receipt) {
                                console.log("pending");
                                setLoading(true);
                              } else {
                                setLoading(false);
                                setComplete(true);
                                clearInterval(interval);
                              }
                            })
                            .catch((err) => {
                              // 존재하지 않는 hash 값일 경우 (+ pending이 길게 되어 tx가 사라진 경우)
                              console.log(err);
                              setLoading(false);
                              setFailed(true);
                              clearInterval(interval);
                            });
                        }, 1000);

                        let tmpReceiveInfo = linkInfo;
                        tmpReceiveInfo.receiverWalletAddress =
                          walletList[select].walletAddress;
                        tmpReceiveInfo.transactionHash = res;
                        toggleIsValid(linkInfo.id, false);
                        await receiveTrxs(
                          walletList[select].walletAddress,
                          "METAMASK",
                          0.000001,
                          linkInfo.id
                        ).then((data) => {
                          setReceiveInfo(data);
                        });
                        setLoading(true);
                        setCheckStatus(!checkStatus);
                      }
                    }
                  );
                }
              }
            );
          });
        } else {
          const getGasAmount = async (fromAddress, toAddress, amount) => {
            const gasAmount = await web3.eth.estimateGas({
              to: toAddress,
              from: fromAddress,
              value: web3.utils.toWei(`${amount}`, "ether"),
            });
            return gasAmount;
          };

          const gasAmount = await getGasAmount(
            account.address,
            walletList[select].walletAddress,
            toFixed(Number(linkInfo.tokenAmount))
          );
          const fee = gasAmount;
          const txObj = {
            value: web3.utils.toHex(
              toFixed(Number(linkInfo.tokenAmount) * Math.pow(10, 18))
            ),
            gas: fee,
            to: walletList[select].walletAddress,
            from: account.address,
          };

          await web3.eth.accounts.signTransaction(
            txObj,
            process.env.REACT_APP_WALLET_PRIVATE_KEY,
            async (err, signedTx) => {
              if (err) {
                console.log(err);
                return err;
              } else {
                setReceiveTrxHash(signedTx.transactionHash);
                setTransactionHash(signedTx.transactionHash); // asnyc 문제 때문에

                return await web3.eth.sendSignedTransaction(
                  signedTx.rawTransaction,
                  async (err, res) => {
                    if (err) {
                      console.log(err);
                      setLoading(false);
                      setFailed(true);
                    } else {
                      setTransactionHash(res); // 저장해야할 hash값

                      let tmpReceiveInfo = linkInfo;
                      tmpReceiveInfo.receiverWalletAddress =
                        walletList[select].walletAddress;
                      tmpReceiveInfo.transactionHash = res;
                      toggleIsValid(linkInfo.id, false);
                      await receiveTrxs(
                        walletList[select].walletAddress,
                        "METAMASK",
                        0.000001,
                        linkInfo.id
                      ).then((data) => {
                        setReceiveInfo(data);
                      });
                      setLoading(true);
                      setCheckStatus(!checkStatus);
                    }
                  }
                );
              }
            }
          );
        }
      } else {
        alert(t("receiveTokenAlreadyReceived1"));
        window.location.href = "/";
      }
    });
  };

  return (
    <>
      {showModal && (
        <ConfirmModal
          visible={setShowModal}
          onClose={() => setShowModal(false)}
          text={<>{t("addWalletModalAlert")}</>}
          buttonText={<>{t("addWalletModalAlertButton")}</>}
          subActionOnClick={() => {
            window.open(
              "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
            );
          }}
        />
      )}
      {modalVisible && (
        <AddWalletAddress
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          setAddedWallet={setAddedWallet}
        />
      )}
      {!resend && (
        <FullContainer>
          {deleteModalOn && (
            <DeleteModal
              visible={deleteModalOn}
              closable={true}
              maskClosable={true}
              onClose={closeDeleteModal}
              text={<>{t("manageProfilePageAlertDeleteWallet1")}</>}
              setRealDelete={setRealDelete}
            />
          )}
          <TitleContainer>
            {walletList?.length > 0 && (
              <>
                <TItleText>{t("manageProfilePage3")}</TItleText>
                <ContainedButton
                  type="secondary"
                  styles="filled"
                  states="default"
                  size="small"
                  label={t("manageProfilePage4")}
                  onClick={walletConnectOnClick}
                />
              </>
            )}
          </TitleContainer>
          {walletList?.length == 0 ? (
            <>
              <EmptyCard icon={EmptyWallet} text={t("selectWalletPage3_3")} />
              <ContainedButton
                type="primary"
                styles="filled"
                states="default"
                size="large"
                label={t("selectWalletPage5")}
                onClick={walletConnectOnClick}
              />
            </>
          ) : (
            <>
              <WalletListBox>
                <ListContainer>
                  {walletList?.map((wallet, idx) => (
                    <EditableCard
                      key={wallet.index}
                      label={walletConvert(wallet.walletAddress)}
                      isEdit={false}
                      isTrash={false}
                      isCheck={true}
                      select={select}
                      idx={idx}
                      icon={MetamaskIcon}
                      deleteOnClick={() => deleteOnClick(idx)}
                      checkOnClick={handleSelectChange}
                    ></EditableCard>
                  ))}
                </ListContainer>
              </WalletListBox>
              <ContainedButton
                type="primary"
                styles="filled"
                states="default"
                size="large"
                label={t("selectWalletPage8")}
                onClick={getTokenOnClick}
              />
            </>
          )}
        </FullContainer>
      )}
    </>
  );
};

export default WalletComponent;
