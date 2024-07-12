import "./css/reset.css";
import "../src/scss/common.scss";
import "./App.css";
import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Home from "pages/Home/Home";
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import Signup from "pages/Signup";
import AdminHome from "pages/admin/AdminHome";
import AdminLogin from "pages/admin/AdminLogin";
import Grade from "pages/grade/Grade";
import GradeStatistics from "pages/grade/GradeStatistics";
import Notice from "pages/notice/Notice";
import NoticeEdit from "pages/notice/NoticeEdit";
import NoticeModify from "pages/notice/NoticeModify";
import StudentInfoView from "pages/student/StudentInfoView";
import Students from "pages/student/StudentsList";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Modal from "components/common/Modal";
import GradeView from "pages/grade/GradeView";
import NoticeItem from "pages/notice/NoticeItem";
import NoticeList from "pages/notice/NoticeList";
import TeacherEdit from "pages/teacher/TeacherEdit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ModalStyle = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  /* height: 100vh; */
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
  /* & > .name { */
  background-color: #f3f9fa;
  width: 1180px;
  height: 100%;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 80px;
  min-height: 687px;

  /* } */
`;

function App() {
  const [notFoundPage, setNotFoundPage] = useState(false);
  useEffect(() => {}, [notFoundPage]);

  /** 모달 상태 관리 */
  const modalState = useSelector(state => state.modalSlice);

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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/students" element={<Students />}></Route>
          <Route path="/signup" element={<Signup />}></Route>

          <Route path="/admin">
            {/* <Route index element={index<AdminLogin />}></Route> */}
            {/* <Route path="login" element={<AdminLogin />}></Route> */}
            <Route index element={<AdminHome />}></Route>
            <Route path="home" element={<AdminHome />}></Route>
          </Route>

          <Route path="/grade" element={<Navigate to="*" />}>
            <Route
              path="statistics/:userid"
              element={<GradeStatistics />}
            ></Route>
            <Route path=":userid" element={<Grade />}></Route>
          </Route>
          {/* 성적 입력 페이지 임시 경로 */}
          <Route path="/grade/1" element={<Grade />}></Route>
          {/* 성적 확인 페이지 임시 경로 */}
          <Route path="/grade/2" element={<GradeView />}></Route>

          {/* 임시 경로 */}
          {/* <Route path="/students/edit" element={<StudentEdit />}></Route> */}
          {/* 학생 본인 정보 수정 페이지 임시 경로 */}
          <Route path="/students/edit/2" element={<StudentInfoView />}></Route>

          {/* 선생님 본인 정보 수정 페이지 */}
          <Route path="/teacher/edit" element={<TeacherEdit />}></Route>
          <Route
            path="/students/studntinfo"
            element={<StudentInfoView />}
          ></Route>

          <Route path="/students" element={<Navigate to="*" />}>
            {/* 경로 수정 후 아래로 변경 */}
            {/* <Route path="edit/:userid" element={<StudentEdit />}></Route> */}
            {/* <Route path="grade/:studentid" element={<StudentGrade />}></Route> */}
          </Route>

          {/* 임시 경로 */}
          <Route path="/notice/list/classid" element={<NoticeList />}></Route>
          <Route path="/notice/item/classid" element={<NoticeItem />}></Route>
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
