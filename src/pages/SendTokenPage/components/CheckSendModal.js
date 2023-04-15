import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getHashByEmail } from "utils/api/new";
import { hashState } from "utils/atoms/trxs";
import { Sender3TreeIcon } from "../../../assets/icons";
import { ContainedButton } from "../../../components/button";
import { BottomModal } from "../../../components/modal";
import { sendTrxs } from "../../../utils/api/trxs";
import { COLORS as palette } from "../../../utils/style/Color/colors";
import Typography from "../../../utils/style/Typography/index";

const FullContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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

const SendAmountInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SendAmountBox = styled.div`
  font-family: Montserrat;
  font-size: 28px;
  font-weight: 600;
  margin-right: 8px;
  text-align: left;
`;

const MainInfoBox = styled.div`
  padding: 22px 20px;
`;

const PersonInfoBox = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  width: 100%;
`;

const PersonInfoLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
`;

const PersonCategory = styled.div`
  ${Typography.Body}
  color: ${palette.grey_2};
`;

const PersonInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PersonId = styled.div`
  ${Typography.Headline3}
`;

const PersonIcon = styled.img`
  width: 20px;
  height: 20px;
`;

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

function setExpiredDate() {
  var today = new Date();
  today.setDate(today.getDate() + 3);
  today.setHours(today.getHours() + 9);
  return today.toISOString().substring(0, 19);
}

const LoginModalInner = (
  amount,
  currency,
  sender,
  platform,
  receiver,
  stepStatus,
  setStepStatus,
  onClose,
  networkId,
  userIdx,
  address,
  setExpired,
  setFinalLink,
  tokenInfo,
  setLoading,
  setFailed,
  resend
) => {
  const { t } = useTranslation();
  const [transactionHash, setTransactionHash] = useState();
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [escrowId, setEscrowId] = useState();
  const [expiredDateResult, setExpiredDateResult] = useState();
  const [hash, setHash] = useRecoilState(hashState);
  const { library } = useWeb3React();

  let ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "RELAYER_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "escrowId", type: "uint256" },
        { internalType: "string", name: "signature", type: "string" },
        { internalType: "address", name: "receivingAddress", type: "address" },
      ],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string[]", name: "signatures", type: "string[]" },
        { internalType: "address", name: "receivingAddress", type: "address" },
      ],
      name: "claimAllBySignatures",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "string", name: "senderSnsId", type: "string" },
            { internalType: "address", name: "tokenAddress", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "expiration", type: "uint256" },
            { internalType: "string", name: "wrapperType", type: "string" },
            { internalType: "string", name: "signature", type: "string" },
          ],
          internalType:
            "struct ThreeTreeSocialEscrow.CreateEscrowFromHotWalletInput",
          name: "input",
          type: "tuple",
        },
      ],
      name: "createEscrowFromHotWallet",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "escrowId", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "createEscrowFromSnsId",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getEscrowCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes32", name: "escrowId", type: "bytes32" }],
      name: "getEscrowDataByEscrowId",
      outputs: [
        {
          components: [
            {
              components: [
                { internalType: "uint256", name: "amount", type: "uint256" },
                {
                  internalType: "address",
                  name: "tokenAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "expiration",
                  type: "uint256",
                },
                { internalType: "bool", name: "isActive", type: "bool" },
                { internalType: "bool", name: "isClaimed", type: "bool" },
                { internalType: "string", name: "wrapperType", type: "string" },
                {
                  internalType: "enum ThreeTreeSocialEscrow.TransactionSource",
                  name: "transactionType",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "prevEscrowId",
                  type: "uint256",
                },
              ],
              internalType: "struct ThreeTreeSocialEscrow.EscrowInfo",
              name: "info",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "address payable",
                  name: "sender",
                  type: "address",
                },
                { internalType: "string", name: "senderSnsId", type: "string" },
                {
                  internalType: "address payable",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "receiverSnsId",
                  type: "string",
                },
              ],
              internalType: "struct ThreeTreeSocialEscrow.EscrowParticipants",
              name: "participants",
              type: "tuple",
            },
            { internalType: "string", name: "signature", type: "string" },
          ],
          internalType: "struct ThreeTreeSocialEscrow.EscrowData",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "snsId", type: "string" },
        { internalType: "bool", name: "onlyActive", type: "bool" },
      ],
      name: "getEscrowIdsBySnsId",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
      name: "getRoleAdmin",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "uint256", name: "index", type: "uint256" },
      ],
      name: "getRoleMember",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
      name: "getRoleMemberCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "hasRole",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "escrowId", type: "uint256" },
        { internalType: "string", name: "signature", type: "string" },
      ],
      name: "isSignatureMatching",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "escrowId", type: "uint256" }],
      name: "refund",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string[]", name: "signatures", type: "string[]" },
      ],
      name: "refundAllBySignatures",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const Web3 = require("web3");
  let rpcURL;
  if (networkId == 5) {
    rpcURL = process.env.REACT_APP_GO_URL;
  } else if (networkId == 137) {
    rpcURL = process.env.REACT_APP_POLYGON_URL;
  } else if (networkId == 11155111) {
    rpcURL = process.env.REACT_APP_MUMBAI_URL;
  } else if (networkId == 80001) {
    rpcURL = process.env.REACT_APP_SEPOLIA_URL;
  }

  let metamaskProvider = "";

  if (window?.ethereum?.providers) {
    metamaskProvider = window?.ethereum?.providers.find(
      (provider) => provider.isMetaMask
    );
  } else {
    if (isMobileDevice()) {
      metamaskProvider = library.provider;
    } else {
      metamaskProvider = window?.ethereum;
    }
  }
  const web3 = new Web3(metamaskProvider);

  useEffect(() => {
    if (resend) {
      sendOnClick();
    }
  }, []);

  useEffect(() => {
    if (transactionHash) {
      const interval = setInterval(async () => {
        await fetch(rpcURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getTransactionByHash",
            params: [transactionHash],
          }),
        })
          .then(async (receipt) => {
            setLoading(true);
            if (receipt == null) {
              console.log("pending");
              setTransactionStatus("pending");
            } else {
              setTransactionStatus("mined");
              await sendTrxs(
                address,
                "metamask",
                "google",
                receiver,
                currency,
                amount,
                transactionHash,
                escrowId,
                expiredDateResult,
                tokenInfo.address,
                networkId
              ).then((data) => {
                setFinalLink(data.linkKey);
                setExpired(data.expiredAt);
                setLoading(false);
              });

              setStepStatus(stepStatus + 1);
              onClose();

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
  }, [transactionHash]);

  const sendOnClick = async () => {
    document.body.style.overflow = "auto";

    if (currency == "USDC" || currency == "USDT" || currency == "SepoliaETH") {
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
      ];
      let tempProvider = metamaskProvider;

      if (isMobileDevice()) {
        // tempProvider = new Web3Provider(metamaskProvider, "any");
        tempProvider = new Web3(new Web3.providers.HttpProvider(rpcURL));
      } else {
        tempProvider = new ethers.providers.Web3Provider(metamaskProvider);
      }

      async function sendToken() {
        if (isMobileDevice()) {
          const contract = new web3.eth.Contract(minABI, tokenInfo.address);
          const transferMethod = await contract.methods.transfer(
            process.env.REACT_APP_3TREE_ADDRESS,
            web3.utils.toHex(Number(amount) * Math.pow(10, tokenInfo.decimals))
          );
          const encodedData = await transferMethod.encodeABI();
          alert(encodedData);
          metamaskProvider = library.provider;
          await metamaskProvider
            .request({
              method: "personal_sign",
              params: [encodedData, address],
            })
            .then(async (txHash) => {
              alert(txHash);
              const escrowHash = txHash;
              setEscrowId("1234"); // 현재는 escrow로 관리하지 않으므로 일단 임의의 값
              setExpiredDateResult(setExpiredDate());
              setTransactionHash(escrowHash);
            })
            .catch((error) => {
              alert(JSON.stringify(error));
            });
          setLoading(true);
        } else {
          const tempSigner = await tempProvider.getSigner();
          let tempContract = new ethers.Contract(0, minABI, tempSigner);
          let escrowContract = new ethers.Contract(
            process.env.REACT_APP_SEPOLIA_CONTRACT_ADDRESS,
            ABI,
            tempSigner
          );

          await getHashByEmail(receiver)
            .then(async (data) => {
              setHash(data);
              console.log(data);
            })
            .then(async () => {
              const input = {
                senderSnsId: receiver,
                tokenAddress: process.env.REACT_APP_SEPOLIA_CONTRACT_ADDRESS,
                amount: ethers.utils.parseEther(amount),
                expiration: Math.floor(Date.now(), 1000) + 86400,
                wrappedType: "w" + tokenInfo.name,
                signature: hash,
              };

              await escrowContract.functions
                .createEscrowFromHotWallet(input, { value: input.amount })
                .then(async (transaction) => {
                  console.log("Transaction hash:", transaction.hash);
                  setLoading(true);
                  await transaction.wait().then(async (receipt) => {
                    console.log("Transaction receipt:", receipt);
                    if (receipt.status === 1) {
                      setLoading(false);
                      setStepStatus(stepStatus + 1);
                      onClose();
                    } else if (receipt.status !== undefined) {
                      setLoading(false);
                      setFailed(true);
                    }
                  });
                });
            });
        }
      }

      sendToken();
    } else {
      // 보내고 tx값 받은 다음 백호출
      let metamaskProvider = "";
      if (window?.ethereum?.providers) {
        metamaskProvider = window?.ethereum?.providers.find(
          (provider) => provider.isMetaMask
        );
      } else {
        if (isMobileDevice()) {
          metamaskProvider = library.provider;
          await metamaskProvider
            .request({
              method: "eth_sendTransaction",
              params: [
                {
                  nonce: "0x00", // ignored by MetaMask
                  to: process.env.REACT_APP_3TREE_ADDRESS, // Required except during contract publications.
                  from: address, // must match user's active address.
                  gas: 60000,
                  // maxPriorityFee: (Math.pow(10, 8) * 0.1).toString(16),
                  value: (Math.pow(10, 18) * amount).toString(16), // Only required to send ether to the recipient from the initiating external account.
                  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
                  chainId: networkId.toString(16), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
                },
              ],
            })
            .then(async (txHash) => {
              console.log(txHash);
              // escrow hash와 id 생성 (with escrow Contract)

              const escrowHash = txHash;
              setEscrowId("1234"); // 현재는 escrow로 관리하지 않으므로 일단 임의의 값
              setExpiredDateResult(setExpiredDate());
              setTransactionHash(escrowHash);
              // alert(escrowHash);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          metamaskProvider = window?.ethereum;
        }
      }

      if (!isMobileDevice()) {
        const Web3 = require("web3");
        const web3 = new Web3(metamaskProvider);

        const getGasAmount = async (fromAddress, toAddress, amount) => {
          const gasAmount = await web3.eth.estimateGas({
            to: toAddress,
            from: fromAddress,
            value: web3.utils.toWei(`${amount}`, "ether"),
          });
          console.log(gasAmount);
          return gasAmount;
        };

        const gasPrice = await web3.eth.getGasPrice();
        const gasAmount = await getGasAmount(
          address,
          process.env.REACT_APP_3TREE_ADDRESS,
          amount
          // web3.utils.toHex((Math.pow(10, 18) * amount).toString(16))
        );
        console.log(gasPrice);
        console.log(gasAmount);
        const fee = Number(gasPrice) * gasAmount;
        // const fee = Number(gasPrice) / 100;
        // const fee = gasAmount;
        // const fee = 20000000;

        await metamaskProvider
          .request({
            method: "eth_sendTransaction",
            params: [
              {
                nonce: "0x00", // ignored by MetaMask
                // gasPrice: (Math.pow(10, 8) * 0.1).toString(16), // customizable by user during MetaMask confirmation.
                // gas: (Math.pow(10, 6) * 0.1).toString(16), // customizable by user during MetaMask confirmation.
                // gas: String(fee), //이거임
                to: process.env.REACT_APP_3TREE_ADDRESS, // Required except during contract publications.
                from: address, // must match user's active address.
                // maxPriorityFeePerGas: (Math.pow(10, 8) * 0.1).toString(16),
                // maxPriorityFee: (Math.pow(10, 8) * 0.1).toString(16),
                maxPriorityFee: String(fee),
                // maxFeePerGas: (Math.pow(10, 8) * 0.1).toString(16),
                value: (Math.pow(10, 18) * amount).toString(16), // Only required to send ether to the recipient from the initiating external account.
                data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
                chainId: networkId.toString(16), // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
              },
            ],
          })
          .then(async (txHash) => {
            // escrow hash와 id 생성 (with escrow Contract)

            const escrowHash = txHash;
            setEscrowId("1234"); // 현재는 escrow로 관리하지 않으므로 일단 임의의 값
            setExpiredDateResult(setExpiredDate());
            setTransactionHash(escrowHash);
          })
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <FullContainer>
      <IntroTextBox>
        <FirstIntro>{t("sendConfirmModal1")}</FirstIntro>
      </IntroTextBox>
      <MainInfoBox>
        <SendAmountInfo>
          <SendAmountBox>
            <font size={4} color={palette.grey_1}>
              {t("sendConfirmModal2")}
            </font>
            {amount} {currency}{" "}
            <font size={4} color={palette.grey_1}>
              {t("sendConfirmModal3")}
            </font>
          </SendAmountBox>
        </SendAmountInfo>
        <PersonInfoBox>
          <PersonInfoLine>
            <PersonCategory>{t("sendConfirmModal4")}</PersonCategory>
            <PersonInfo>
              <PersonId>{receiver}</PersonId>
              <PersonIcon src={platform} />
            </PersonInfo>
          </PersonInfoLine>
          <PersonInfoLine>
            <PersonCategory>{t("sendConfirmModal5")}</PersonCategory>
            <PersonInfo>
              <PersonId>@{sender}</PersonId>
              <PersonIcon src={Sender3TreeIcon} />
            </PersonInfo>
          </PersonInfoLine>
        </PersonInfoBox>
        <ContainedButton
          type="primary"
          styles="filled"
          states="default"
          size="large"
          label={t("sendConfirmModal8")}
          onClick={sendOnClick}
        />
      </MainInfoBox>
    </FullContainer>
  );
};

const CheckSendModal = ({
  visible,
  closable,
  maskClosable,
  onClose,
  amount,
  currency,
  sender,
  platform,
  receiver,
  stepStatus,
  setStepStatus,
  networkId,
  userIdx,
  address,
  setExpired,
  setFinalLink,
  tokenInfo,
  setLoading,
  setFailed,
  resend,
}) => {
  return (
    <BottomModal
      visible={visible}
      closable={closable}
      maskClosable={maskClosable}
      onClose={onClose}
      renderInput={() =>
        LoginModalInner(
          amount,
          currency,
          sender,
          platform,
          receiver,
          stepStatus,
          setStepStatus,
          onClose,
          networkId,
          userIdx,
          address,
          setExpired,
          setFinalLink,
          tokenInfo,
          setLoading,
          setFailed,
          resend
        )
      }
    />
  );
};

export default CheckSendModal;
