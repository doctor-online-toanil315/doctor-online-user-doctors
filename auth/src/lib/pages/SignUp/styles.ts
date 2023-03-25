import styled from "styled-components";
import loginBg from "../../assets/login-bg.png";
export const ContainerLogin = styled.div`
  position: relative;

  min-height: 100vh;
  background: white;
  background-size: cover;

  display: flex;
  flex-flow: row nowrap;

  .bg-holder {
    width: 50%;
    background: url(${loginBg});
    background-size: cover;
  }

  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 768px) {
    .bg-holder {
      display: none;
    }
  }
`;
export const StyledForm = styled.form`
  width: 550px;
  padding: 10px 40px;
  background-color: rgb(255 255 255 / 1);
  border-radius: 10px;
  height: fit-content;
  margin: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  margin-top: 16px;
  text-align: center;

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
