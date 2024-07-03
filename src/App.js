import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Home from "pages/Home";
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import SignUp from "pages/Signup";
import Students from "pages/Students";
import AdminHome from "pages/admin/AdminHome";
import AdminLogin from "pages/admin/AdminLogin";
import Grade from "pages/grade/Grade";
import GradeStatistics from "pages/grade/GradeStatistics";
import Notice from "pages/notice/Notice";
import NoticeClass from "pages/notice/NoticeClass";
import NoticeEdit from "pages/notice/NoticeEdit";
import NoticeModify from "pages/notice/NoticeModify";
import StudentEdit from "pages/student/StudentEdit";
import StudentGrade from "pages/student/StudentGrade";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./css/reset.css";
import "../src/scss/common.scss";
import "./App.css";
// import Main from "components/layout/Main";
import styled from "@emotion/styled";

const Main = styled.div`
  background-color: #f3f9fa;
  width: 1180px;
  height: 100%;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 80px;
  min-height: 687px;
`;

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/students" element={<Students />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route path="/admin" element={<Navigate to="/admin/login" />}>
            <Route path="login" element={<AdminLogin />}></Route>
            <Route path="home" element={<AdminHome />}></Route>
          </Route>

          <Route path="/grade" element={<Navigate to="*" />}>
            <Route
              path="statistics/:userid"
              element={<GradeStatistics />}
            ></Route>
            <Route path=":userid" element={<Grade />}></Route>
          </Route>

          <Route path="/student" element={<Navigate to="*" />}>
            <Route path="edit/:userid" element={<StudentEdit />}></Route>
            <Route path="grade/:studentid" element={<StudentGrade />}></Route>
          </Route>

          <Route path="/notice" element={<Notice />}>
            <Route path=":classid" element={<NoticeClass />}></Route>
            <Route path="edit" element={<NoticeEdit />}></Route>
            <Route path="modify/:noticeid" element={<NoticeModify />}></Route>
          </Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
