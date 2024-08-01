import styled from "@emotion/styled";
import { useNavigate } from "react-router";

const HeaderMemuStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 999;
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fa;

  .header-menu-wrap {
    display: flex;
    position: absolute;
    left: 0;

    width: calc(100vw - 10%);
    max-width: calc(100% - 10%);
    min-width: 1000px;

    border-radius: 0px 50px 50px 0px;

    width: 100%;
    height: 100%;
    background-color: #5f909f;

    margin-right: 60px;

    .header-menu-inner {
      display: flex;
      justify-content: center;

      position: relative;
      width: 100%;

      height: 100%;
      overflow: hidden;
      margin-right: 130px;
      /* padding: 0px 180px; */

      ul {
        position: absolute;
        right: 0px;
        height: 100%;
        min-width: 70%;
        width: 100%;
        max-width: 900px;

        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }

      ul > li {
        white-space: nowrap;
        font-size: 22px;
        color: white;
        cursor: pointer;
      }
    }
  }
`;

const HeaderMemu = () => {
  const navigate = useNavigate();

  const moveMyPage = pageNum => {
    switch (pageNum) {
      case 1:
        navigate("/notice/list/classid");
        break;
      case 2:
        navigate("/test");
        break;
      case 3:
        console.log("설정 안됬어요.");
        // navigate("/selftest");
        break;
      case 4:
        navigate("/online/test/create");
        break;
      case 5:
        navigate("/selftest");
        break;
      default:
        break;
    }
  };

  return (
    <HeaderMemuStyle>
      <div className="header-menu-wrap">
        <nav className="header-menu-inner">
          <ul>
            <li
              onClick={() => {
                moveMyPage(1);
              }}
            >
              알림 마당
            </li>
            <li
              onClick={() => {
                moveMyPage(2);
              }}
            >
              학생 마당
            </li>
            <li
              onClick={() => {
                moveMyPage(3);
              }}
            >
              학부모 마당
            </li>
            <li
              onClick={() => {
                moveMyPage(4);
              }}
            >
              선생님 마당
            </li>
            <li
              onClick={() => {
                moveMyPage(5);
              }}
            >
              온라인 학습
            </li>
          </ul>
        </nav>
      </div>
    </HeaderMemuStyle>
  );
};

export default HeaderMemu;
