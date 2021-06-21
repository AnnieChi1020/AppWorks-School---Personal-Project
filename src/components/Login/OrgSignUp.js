import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledFormControlFeedback = styled(Form.Control.Feedback)`
  position: inherit !important;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const PrimaryButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 20px;
  border-radius: 8px;
  border: solid 1px #dee2e6;
  padding: 0 10px;
  background-color: #40a3cb;
  color: white;
`;

const SecondaryButton = styled(PrimaryButton)`
  border-color: #40a3cb;
  background-color: white;
  color: #40a3cb;
`;

const OrgPrimaryButton = styled(PrimaryButton)`
  background-color: #57bc90;
`;

const OrgSecondaryButton = styled(SecondaryButton)`
  border-color: #57bc90;
  color: #57bc90;
`;

function OrgSignUp(props) {
  return (
    <Form noValidate onSubmit={props.submit}>
      <Form.Group controlId="name">
        <Form.Control
          type="name"
          placeholder="機構名稱"
          required
          isInvalid={props.nameValid}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        <StyledFormControlFeedback type="invalid">
          請輸入機構名稱
        </StyledFormControlFeedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          required
          isInvalid={props.emailValid}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        <StyledFormControlFeedback type="invalid">
          請輸入正確的email
        </StyledFormControlFeedback>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          type="password"
          placeholder="密碼"
          required
          isInvalid={props.passwordValid}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        <StyledFormControlFeedback type="invalid">
          密碼需超過6個字元
        </StyledFormControlFeedback>
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Control
          type="text"
          placeholder="0912345678"
          required
          isInvalid={props.phoneValid}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        <StyledFormControlFeedback type="invalid">
          請輸入正確的連絡電話
        </StyledFormControlFeedback>
      </Form.Group>
      <ButtonContainer>
        <OrgSecondaryButton id="login" onClick={(e) => props.swiftAction(e)}>
          立即登入
        </OrgSecondaryButton>
        <OrgPrimaryButton type="submit">註冊</OrgPrimaryButton>
      </ButtonContainer>
    </Form>
  );
}

export default OrgSignUp;
