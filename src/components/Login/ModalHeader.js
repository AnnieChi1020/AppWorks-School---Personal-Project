import { Modal, Form } from "react-bootstrap";
import styled from "styled-components";

const StyledModalHeader = styled(Modal.Header)`
justify-content: space-evenly;
border: none;
`;

const Header = styled.div`
  width: 100%;
  font-size: 20px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #dee2e6;
  cursor: pointer;
`;

const UserHeaderActive = styled(Header)`
  font-weight: 600;
  cursor: default;
  border-bottom: 2px solid #40a3cb;
  color: #40a3cb;
`;

const OrgHeaderActive = styled(UserHeaderActive)`
  border-bottom: 2px solid #54a783;
  color: #54a783;
`;


function ModalHeader  (props)  {
  return props.identity === "user" && props.action === "login" ? (
    <StyledModalHeader className="mx-2 pb-0">
      <UserHeaderActive id={"user"} onClick={(e) => props.changeIdentity(e)}>
        志工登入
      </UserHeaderActive>
      <Header id={"organization"} onClick={(e) => props.changeIdentity(e)}>
        機構登入
      </Header>
    </StyledModalHeader>
  ) : props.identity === "user" ? (
    <StyledModalHeader className="mx-2 pb-0">
      <UserHeaderActive id={"user"} onClick={(e) => props.changeIdentity(e)}>
        志工註冊
      </UserHeaderActive>
      <Header id={"organization"} onClick={(e) => props.changeIdentity(e)}>
        機構註冊
      </Header>
    </StyledModalHeader>
  ) : props.action === "login" ? (
    <StyledModalHeader className="mx-2 pb-0">
      <Header id={"user"} onClick={(e) => props.changeIdentity(e)}>
        志工登入
      </Header>
      <OrgHeaderActive
        id={"organization"}
        onClick={(e) => props.changeIdentity(e)}
      >
        機構登入
      </OrgHeaderActive>
    </StyledModalHeader>
  ) : (
    <StyledModalHeader className="mx-2 pb-0">
      <Header id={"user"} onClick={(e) => props.changeIdentity(e)}>
        志工註冊
      </Header>
      <OrgHeaderActive
        id={"organization"}
        onClick={(e) => props.changeIdentity(e)}
      >
        機構註冊
      </OrgHeaderActive>
    </StyledModalHeader>
  );
};

export default ModalHeader