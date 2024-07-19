import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Home from "pages/Home/Home";
import Login from "pages/user/Login";
// import NotFound from "pages/NotFound";
import Signup from "pages/user/Signup";
import AdminHome from "pages/admin/AdminHome";
import Notice from "pages/notice/Notice";
import NoticeEdit from "pages/notice/NoticeEdit";
import NoticeModify from "pages/notice/NoticeModify";
import StudentInfoView from "pages/student/StudentInfoView";
import Students from "pages/student/StudentsList";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../src/scss/common.scss";
import "./App.css";
import "./css/reset.css";

import Modal from "components/common/Modal";
import FindId from "components/login/FindId";
import FindPass from "components/login/FindPass";
import GradeView from "pages/grade/GradeView";
import NoticeItem from "pages/notice/NoticeItem";
import NoticeList from "pages/notice/NoticeList";
import TeacherEdit from "pages/teacher/TeacherEdit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "utils/cookie";
import { openModal } from "slices/modalSlice";
import PrivateRoute from "components/common/PrivateRoute";
import MyChildInfo from "pages/parents/MyChildInfo";
import ReturnHomeRoute from "components/common/ReturnHomeRoute";
import Grade from "pages/grade/Grade";
import GradeChart from "pages/grade/GradeChart";
import NotFound from "components/notfound/NotFound";
import { AuthenticatedRedirect } from "components/common/AuthenticatedRedirect";
import StudentEdit from "pages/student/StudentEdit";
import TeacherProtectedRoute from "components/common/TeacherProtectedRoute";

// import jwt from "jsonwebtoken";

const ModalStyle = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100vw;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    text-shadow: none;
  }

  .not-bg-click-modal {
    position: absolute;
    top: 35%;
    height: 250px;
  }

  .modal-inner {
    height: auto;
  }
`;

const Main = styled.div`
  /* background-color: #f3f9fa;
  width: 1180px; */
  /* min-height: 687px; */
  /* min-height: calc(100vh - 260px);
  height: 100%;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 80px; */

  /* background-color: #f3f9fa; */
  background-color: ${getCookie("accessToken") ? "#FBFAF9" : "#f3f9fa"};
  width: 1180px;
  min-height: calc(100vh - 260px);
  height: 100%;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 0;
  margin-bottom: -40px;

  /* 내부 스타일 */
  & > div,
  main {
    min-height: calc(100vh - 260px);
    padding-bottom: 120px;
  }
`;

function App() {
  const [notFoundPage, setNotFoundPage] = useState(false);
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  const accessToken = getCookie("accessToken");
  const studentPk = getCookie("studentPk");

  useEffect(() => {}, [notFoundPage]);

  /** 모달 상태 관리 */
  const modalState = useSelector(state => state.modalSlice);

  const dispatch = useDispatch();

  /** 모달 호출 */
  const showModal = selectModalType => {
    /**(고정) 모달 활성화 */
    const modalRes = dispatch(openModal(selectModalType));
    // console.log("모달 결과 출력 내용 확인 : ", modalRes);
  };

  // const jwt = require("jsonwebtoken");

  // const token = accessToken; // 여기에 토큰을 넣어주세요

  // // 토큰 디코딩
  // const decoded = jwt.decode(token, { complete: true });

  // if (decoded.payload.exp < Date.now() / 1000) {
  //   console.log("토큰이 만료되었습니다.");
  // } else {
  //   console.log("토큰이 유효합니다.");
  // }

  // useEffect(() => {
  //   const token = req.header.authorization.split(" ")[1];
  //   const data = jwt.verify(accessToken, process.env.ACCESS_SECRET);
  //   console.log("토큰 유효시간 : ", data);
  // }, []);

  return (
    <BrowserRouter>
      {modalState.isOpen ? (
        <ModalStyle>
          <Modal />
        </ModalStyle>
      ) : null}

      <Header />

      <Main>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>

          {/* 로그인 & 회원가입 : 이후 진입시 Home으로 강제 이동 */}
          {/* {accessToken ? (
            <>
              <Route path="/login" element={<AuthenticatedRedirect />}></Route>
              <Route path="/signup" element={<AuthenticatedRedirect />}></Route>
              <Route path="/findid" element={<AuthenticatedRedirect />}></Route>
              <Route
                path="/findpass"
                element={<AuthenticatedRedirect />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/findid" element={<FindId />}></Route>
              <Route path="/findpass" element={<FindPass />}></Route>
            </>
          )} */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/students" element={<Students />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/findid" element={<FindId />}></Route>
          <Route path="/findpass" element={<FindPass />}></Route>

          {/* Admin 계정의 경우 */}
          {loginUserType === "ROLE_ADMIN" ? (
            <>
              <Route
                path="*"
                element={
                  <PrivateRoute
                    component={<AdminHome />}
                    authenticated={accessToken}
                  />
                }
              ></Route>
              <Route path="/admin" element={<AdminHome />}>
                <Route index path="home" element={<AdminHome />}></Route>
              </Route>
            </>
          ) : (
            <Route path="/admin/*" element={<ReturnHomeRoute />}></Route>
          )}

          {/* 교직원 : 학생 리스트 */}
          <Route
            path="/students"
            element={
              <TeacherProtectedRoute
                authenticated={accessToken}
                component={<Students />}
              />
            }
          ></Route>

          {/* 성적 확인/등록 페이지 - 수정중 */}
          {loginUserType === "ROLE_TEAHCER" ? (
            <Route path="/grade/:studentPk" element={<Grade />}></Route>
          ) : (
            // <Route path="/grade/:studentPk" element={<GradeView />}></Route>
            <Route path="/grade/:studentPk" element={<GradeView />}></Route>
          )}

          <Route
            path="/grade/chart/:studentPk"
            element={<GradeChart />}
          ></Route>
          {/* 임시 경로 */}
          {loginUserType === "ROLE_TEAHCER" ? (
            <Route
              path="/students/edit/:studentPk"
              element={<StudentEdit />}
            ></Route>
          ) : (
            <Route
              path="/students/edit/:studentPk"
              element={<StudentInfoView />}
            ></Route>
          )}

          {/* 교직원 : 정보 수정 페이지 */}
          <Route path="/teacherinfo" element={<TeacherEdit />}></Route>
          <Route path="/studentinfo" element={<MyChildInfo />}></Route>
          {/* 학부모 - 학생 : 정보 수정 페이지 */}
          {/* 추가예정 */}

          <Route path="/students" element={<Navigate to="*" />}>
            {/* 경로 수정 후 아래로 변경 */}
            {/* <Route path="edit/:userid" element={<StudentEdit />}></Route> */}
            {/* <Route path="grade/:studntid" element={<StudentGrade />}></Route> */}
          </Route>

          {/* 임시 경로 */}
          <Route
            path="/notice/list/:userClass"
            element={<NoticeList />}
          ></Route>
          <Route
            path="/notice/item/:userClass"
            element={<NoticeItem />}
          ></Route>
          <Route path="/notice/edit" element={<NoticeEdit />}></Route>
          <Route path="/notice" element={<Notice />}>
            {/* <Route path="list/classid" element={<NoticeList />}></Route>
            <Route path="item/classid" element={<NoticeItem />}></Route> */}
            {/* <Route path="edit" element={<NoticeEdit />}></Route> */}
            <Route path="modify/:noticeid" element={<NoticeModify />}></Route>
          </Route>

          <Route
            path="*"
            element={<NotFound />}
            setNotFoundPage={setNotFoundPage}
          ></Route>
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
