import { postParentSignin } from "api/login/parentloginapi";
import { postTeacherSignin } from "api/login/teacherloginapi";
import PasswordField from "components/user/PasswordField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";
import cleanupBt from "../../../images/tabler_circle-x-filled.svg";
import LoginIdField from "./LoginIdField";
import SocialSignin from "../../../components/user/SocialSignin";
import { studentsignin } from "api/login/childerenapi";
import { useRecoilState } from "recoil";
import { userRoleState } from "atoms/userState";

const Signin = ({ children, naviState, setNaviState }) => {
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  const navi = useNavigate();

  const login = async e => {
    e.preventDefault();
    const reqData = {
      teacherId: userId,
      password: userPass,
    };
    const request = {
      uid: userId,
      upw: userPass,
    };
    const tempData = {
      studentUid: userId,
      studentPwd: userPass,
    };
    if (userId === "" || userPass === "") {
      setErrMsg("빈칸을 모두 입력해주세요");
      return;
    }
    if (naviState === "signin") {
      const result = await postParentSignin(request);
      // console.log(result);
      if (result === "유저정보가 없습니다.") {
        console.log(result);
        // window.location.replace("/");
        // console.log(userRole);
        // navi("/");
        return;
      }
      if (result) {
        window.location.replace("/");
      }
    }
    if (naviState === "teacherlogin") {
      const result = await postTeacherSignin(reqData);
      if (result.status === 200 && getCookie("userRole") === "ROLE_ADMIN") {
        window.location.replace("/admin");
      }
      if (result.status === 200 && getCookie("userRole") === "ROLE_TEACHER") {
        window.location.replace("/");
      }
    }
    if (naviState === "studentlogin") {
      const result = await studentsignin(tempData);
      console.log(result);
      window.location.replace("/");
    }
  };

  useEffect(() => {
    setNaviState(children);
    return;
  }, [setNaviState]);

  useEffect(() => {
    setUserPass("");
    setUserId("");
  }, [naviState]);

  useEffect(() => {
    if (userPass === "" || userId === "") {
      setErrMsg("");
    }
  }, [userPass, userId]);

  return (
    <>
      <form
        className="login-wrap-panel"
        onSubmit={e => {
          login(e);
        }}
      >
        <LoginIdField
          cleanupBt={cleanupBt}
          userId={userId}
          setUserId={setUserId}
        >
          아이디
        </LoginIdField>
        <PasswordField userPass={userPass} setUserPass={setUserPass}>
          비밀번호
        </PasswordField>
        <div className="fields-section-errmsg">{errMsg}</div>
        <button className="login-wrap-panel-loginbt">로그인</button>
        {naviState === "signin" ? <SocialSignin /> : null}
      </form>
    </>
  );
};

export default Signin;
