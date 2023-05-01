import styled from "styled-components";

export const StyledVideoConsultingContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;

  .ringing {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      display: block;
      width: 134px;
      height: 134px;
      border-radius: 50%;
      margin-bottom: 15px;
    }

    h3 {
      font-weight: 600;
      font-size: 22px;
      line-height: 33px;
      color: white;
      margin-bottom: 0;
    }

    p {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: white;
      margin-bottom: 0;
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    padding: 10px;
    background-color: #18181d;
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;
    justify-content: center;
    align-items: center;

    .action {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.baseGray03};

      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .hang-up {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.red};
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .big-video {
    width: 100%;
    height: 100%;
  }

  .small-video {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 151px;
    height: 171px;
    border-radius: 10px;
  }
`;
