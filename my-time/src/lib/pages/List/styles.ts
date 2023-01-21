import styled from 'styled-components';

export const ContainerRequestManagement = styled.div`
  margin-top: 24px;
  padding: 24px;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${(props) => props.theme.secondaryText};
  border-radius: 10px;

  .ant-btn[disabled] {
    background: rgb(130, 154, 214) !important;
  }
`;
