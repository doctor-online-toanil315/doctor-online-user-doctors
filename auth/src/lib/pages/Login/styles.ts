import styled from 'styled-components';
import loginBg from '../../assets/login-bg.svg';
export const ContainerLogin = styled.div`
  position: relative;
  display: block;
  min-height: 100vh;
  background: url(${loginBg}) no-repeat;
  background-size: cover;
`;
export const StyledForm = styled.form`
  padding: 40px;
  background-color: rgb(255 255 255 / 1);
  border-radius: 10px;
  width: 450px;
  height: fit-content;
  margin: auto;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
export const StyledLogo = styled.img`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  max-width: 100%;
  height: auto;
  display: block;
  vertical-align: middle;
`;
export const StyledGroupRemembers = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
export const LabelRemember = styled.label`
  font-weight: 600;
  margin-left: 10px;
  color: ${(props) => props.theme.textDefault};
  font-size: 15px;
  cursor: pointer;
`;
export const Contact = styled.p`
  margin-top: 8px;

  a {
    font-weight: 600;
    color: ${(props) => props.theme.link};
  }
`;
export const StyledButton = styled.div`
  margin-top: 24px;
  button {
    margin: auto;
    width: 240px;
  }
`;
export const InputMessageStyled = styled.span`
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.red};
  display: inline-block;
  margin-top: 4px;
  width: 100% !important;
  text-align: left;
`;
//# sourceMappingURL=styles.js.map
