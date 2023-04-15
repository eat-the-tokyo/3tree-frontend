import { COLORS as palette } from "../../utils/style/Color/colors";
import Typograpy from "../../utils/style/Typography";
import styled from "styled-components";
import {
  CardEdit,
  CardTrash,
  ProfileDefault,
  ProfileEdit,
  BlingIcon,
} from "../../assets/icons";
import { ContainedButton } from "../button";
import { useTranslation } from "react-i18next";

const FullContainer = styled.div`
  width: 100%;
  padding: 60px 20px;
  background: ${(props) =>
    props.color
      ? "transparent"
      : "linear-gradient(180deg, #edf2fd 0%, rgba(255, 255, 255, 0) 100%)"};
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const ProfileImageBox = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 1px solid ${palette.grey_7};
  background-image: url(${({ profileImg }) =>
    profileImg ? profileImg : ProfileDefault});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  margin: 0px auto;
  margin-bottom: 40px;
`;

const UserNameBox = styled.div`
  ${Typograpy.Headline1}
  color: ${(props) => (props.color ? props.color : palette.Black)};
  margin: 0px auto;
  text-align: center;
`;

const IntroductionBox = styled.div`
  max-width: 400px;
  ${Typograpy.Subhead}
  color: ${(props) => (props.color ? props.color : palette.grey_1)};
  margin: 0px auto;
  margin-top: 14px;
  margin-bottom: 40px;
  text-align: center;
`;

const EditButtonBox = styled.div`
  display: flex;
  gap: 16px;
`;

const ProfileCard = ({
  profileImg,
  userName,
  introduction,
  onClick,
  onClickRight,
  isEditable,
  style,
  color,
}) => {
  const { t } = useTranslation();

  return (
    <FullContainer color={color} style={style}>
      <InnerContainer>
        <ProfileImageBox profileImg={profileImg} />
        <UserNameBox color={color}>{userName}</UserNameBox>
        <IntroductionBox color={color}>{introduction}</IntroductionBox>
        {isEditable ? (
          <EditButtonBox>
            <ContainedButton
              type="primary"
              styles="outlined"
              states="default"
              size="large"
              label={t("manageProfilePage9")}
              icon={ProfileEdit}
              onClick={onClick}
            />
            <ContainedButton
              type="primary"
              styles="filled"
              states="default"
              size="large"
              label={t("manageProfilePage11")}
              icon={BlingIcon}
              onClick={onClickRight}
            />
          </EditButtonBox>
        ) : (
          <></>
        )}
      </InnerContainer>
    </FullContainer>
  );
};

export default ProfileCard;
