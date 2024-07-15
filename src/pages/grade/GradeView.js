import Signature from "pages/grade/Signature";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../scss/student/grade.css";
import "../../scss/student/studentEdit.css";
import {
  getStudentGrade1,
  getStudentGrade2,
  getStudentGradeSelect1,
  getStudentGradeSelect2,
  getStudentInfo,
} from "api/student/studentapi";

const GradeView = () => {
  // 네비게이트
  const navigate = useNavigate();
  const { studentPk } = useParams();
  const handleClick = () => {
    navigate(`/students/edit/${studentPk}`);
  };

  const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [grade, setGrade] = useState("1"); // 선택된 학년 상태
  const [semester, setSemester] = useState("1"); // 선택된 학기 상태
  const [list, setList] = useState([]);

  const [midGrades, setMidGrades] = useState({
    국어: "",
    수학: "",
    "바른 생활": "",
    "사회/도덕": "",
    과학: "",
    영어: "",
    실과: "",
    체육: "",
    음악: "",
    미술: "",
  });
  const [finalGrades, setfinalGrades] = useState({
    국어: "",
    수학: "",
    "바른 생활": "",
    "사회/도덕": "",
    과학: "",
    영어: "",
    실과: "",
    체육: "",
    음악: "",
    미술: "",
  });

  const subjects = [
    "국어",
    "수학",
    "바른 생활",
    "사회/도덕",
    "과학",
    "영어",
    "실과",
    "체육",
    "음악",
    "미술",
  ];
  const [classStudentCount, setClassStudentCount] = useState("-");
  const [gradeStudentCount, setGradeStudentCount] = useState("-");
  const [classRank, setClassRank] = useState("-");
  const [gradeRank, setGradeRank] = useState("-");

  // 학생 정보 불러오기
  const studentInfoData = async () => {
    try {
      const response = await getStudentInfo(studentPk);
      const result = response.data;

      setStudentInfo(result);
      setStudentName(result.studentName);
      setStudentClass(result.studentClass);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // 학생 데이터 불러오기
    studentInfoData();
  }, [studentPk]);

  // 최초 조회 시 성적 불러오기 중간고사
  const studentGrade1 = async () => {
    try {
      const response = await getStudentGrade1(studentPk);
      const result = response.data.data.list || [];
      const midgradeMap = {};

      if (result.length > 0) {
        setClassStudentCount(result[0].classStudentCount || "-");
        setGradeStudentCount(result[0].gradeStudentCount || "-");
        setClassRank(result[0].classRank || "-");
        setGradeRank(result[0].gradeRank || "-");

        result.forEach(subject => {
          const {
            name,
            mark,
            classAvg,
            classRank,
            gradeAvg,
            gradeRank,
            subjectGradeRank,
          } = subject;
          midgradeMap[name] = {
            mark,
            classAvg,
            classRank,
            gradeAvg,
            gradeRank,
            subjectGradeRank,
          };
        });

        setMidGrades(midgradeMap);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //     const list = result || [];

  //     // 과목별 성적을 매핑할 객체
  //     const midgradeMap = {};
  //     setClassStudentCount(result[0].classStudentCount || "-");
  //     setGradeStudentCount(result[0].gradeStudentCount || "-");
  //     setClassRank(result[0].classRank || "-");
  //     setGradeRank(result[0].gradeRank || "-");

  //     // 각 과목에 대해 데이터 추출 및 매핑
  //     list.forEach(subject => {
  //       const {
  //         name, // 과목 이름
  //         mark, // 원점수
  //         classAvg, // 반평균
  //         classRank, // 반 등수
  //         gradeAvg, // 학년 평균
  //         gradeRank, // 학교 등수
  //         subjectGradeRank, // 과목별 등수
  //         gradeStudentCount, // 전체 학년
  //         classStudentCount, // 반 몇 명?
  //       } = subject;
  //       midgradeMap[name] = {
  //         mark, // 원점수
  //         classAvg, // 반평균
  //         classRank, // 반 등수
  //         gradeAvg, // 학년 평균
  //         gradeRank, // 학교 등수
  //         subjectGradeRank, // 과목별 등수
  //         gradeStudentCount, // 전체 학년
  //         classStudentCount, // 반 몇 명?
  //       }; // 필요한 데이터들을 객체 형태로 매핑
  //     });
  //     setMidGrades(prevGrades => ({ ...prevGrades, ...midgradeMap }));

  //     // console.log(result);
  //     // console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    studentGrade1();
  }, [studentPk]);

  // 최초 조회 시 성적 불러오기 기말고사
  const studentGrade2 = async () => {
    try {
      const response = await getStudentGrade2(studentPk);
      const result = response.data.data.list || [];
      const finalgradeMap = {};

      if (result.length > 0) {
        setClassStudentCount(result[0].classStudentCount || "-");
        setGradeStudentCount(result[0].gradeStudentCount || "-");
        setClassRank(result[0].classRank || "-");
        setGradeRank(result[0].gradeRank || "-");

        result.forEach(subject => {
          const {
            name,
            mark,
            classAvg,
            classRank,
            gradeAvg,
            gradeRank,
            subjectGradeRank,
          } = subject;
          finalgradeMap[name] = {
            mark,
            classAvg,
            classRank,
            gradeAvg,
            gradeRank,
            subjectGradeRank,
          };
        });

        setfinalGrades(finalgradeMap);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //     setList(result);

  //     // 과목별 성적을 매핑할 객체
  //     const finalgradeMap = {};
  //     setClassStudentCount(result[0].classStudentCount || "-");
  //     setGradeStudentCount(result[0].gradeStudentCount || "-");
  //     setClassRank(result[0].classRank || "-");
  //     setGradeRank(result[0].gradeRank || "-");

  //     // 각 과목에 대해 데이터 추출 및 매핑
  //     list.forEach(subject => {
  //       const {
  //         name, // 과목 이름
  //         mark, // 원점수
  //         classAvg, // 반평균
  //         classRank, // 반 등수
  //         gradeAvg, // 학년 평균
  //         gradeRank, // 학교 등수
  //         subjectGradeRank, // 과목별 등수
  //         gradeStudentCount, // 전체 학년
  //         classStudentCount, // 반 몇 명?
  //       } = subject;
  //       finalgradeMap[name] = {
  //         mark, // 원점수
  //         classAvg, // 반평균
  //         classRank, // 반 등수
  //         gradeAvg, // 학년 평균
  //         gradeRank, // 학교 등수
  //         subjectGradeRank, // 과목별 등수
  //         gradeStudentCount, // 전체 학년
  //         classStudentCount, // 반 몇 명?
  //       }; // 필요한 데이터들을 객체 형태로 매핑
  //     });
  //     setfinalGrades(prevGrades => ({ ...prevGrades, ...finalgradeMap }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    studentGrade2();
  }, [studentPk]);

  const handleGradeChange = e => {
    setGrade(e.target.value);
  };
  const handleSemesterChange = e => {
    setSemester(e.target.value);
  };

  // 학기, 학년 선택 성적 출력 중간고사
  const studentGradeSelect1 = async () => {
    try {
      const response = await getStudentGradeSelect1(studentPk, grade, semester);
      console.log(response.data);
      const result = response.data.data.list || [];
      const midgradeMap = {};

      if (result.length > 0) {
        setClassStudentCount(result[0].classStudentCount || "-");
        setGradeStudentCount(result[0].gradeStudentCount || "-");
        setClassRank(result[0].classRank || "-");
        setGradeRank(result[0].gradeRank || "-");

        result.forEach(subject => {
          const {
            name,
            mark,
            classAvg,
            classRank,
            gradeAvg,
            gradeRank,
            subjectGradeRank,
          } = subject;
          midgradeMap[name] = {
            mark,
            classAvg,
            classRank,
            gradeAvg,
            gradeRank,
            subjectGradeRank,
          };
        });

        setMidGrades(midgradeMap);
        setfinalGrades({}); // 기말고사 데이터를 초기화
      }
    } catch (error) {
      console.log(error);
    }
  };
  //     // const list = result || [];

  //     const lists = result;

  //     setList(lists);
  //     console.log("result :", result);
  //     console.log("lists :", lists);

  //     // 과목별 성적을 매핑할 객체
  //     const midgradeMap = {};
  //     setClassStudentCount(result[0].classStudentCount || "-");
  //     setGradeStudentCount(result[0].gradeStudentCount || "-");
  //     setClassRank(result[0].classRank || "-");
  //     setGradeRank(result[0].gradeRank || "-");

  //     // 각 과목에 대해 데이터 추출 및 매핑
  //     list.forEach(subject => {
  //       const {
  //         name, // 과목 이름
  //         mark, // 원점수
  //         classAvg, // 반평균
  //         classRank, // 반 등수
  //         gradeAvg, // 학년 평균
  //         gradeRank, // 학교 등수
  //         subjectGradeRank, // 과목별 등수
  //         gradeStudentCount, // 전체 학년
  //         classStudentCount, // 반 몇 명?
  //       } = subject;
  //       midgradeMap[name] = {
  //         mark, // 원점수
  //         classAvg, // 반평균
  //         classRank, // 반 등수
  //         gradeAvg, // 학년 평균
  //         gradeRank, // 학교 등수
  //         subjectGradeRank, // 과목별 등수
  //         gradeStudentCount, // 전체 학년
  //         classStudentCount, // 반 몇 명?
  //       }; // 필요한 데이터들을 객체 형태로 매핑
  //     });
  //     setMidGrades(prevGrades => ({ ...prevGrades, ...midgradeMap }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 학기, 학년 선택 성적 출력 기말고사
  const studentGradeSelect2 = async () => {
    try {
      const response = await getStudentGradeSelect2(studentPk, grade, semester);
      console.log(response.data);
      const result = response.data.data.list || [];
      const finalgradeMap = {};

      if (result.length > 0) {
        setClassStudentCount(result[0].classStudentCount || "-");
        setGradeStudentCount(result[0].gradeStudentCount || "-");
        setClassRank(result[0].classRank || "-");
        setGradeRank(result[0].gradeRank || "-");

        result.forEach(subject => {
          const {
            name,
            mark,
            classAvg,
            classRank,
            gradeAvg,
            gradeRank,
            subjectGradeRank,
          } = subject;
          finalgradeMap[name] = {
            mark,
            classAvg,
            classRank,
            gradeAvg,
            gradeRank,
            subjectGradeRank,
          };
        });

        setMidGrades({});
        setfinalGrades(finalgradeMap);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{studentClass}</span>
        <p>{studentName} 성적 확인</p>
      </div>
      <div className="user-info-wrap">
        {/* <!-- 탭 선택 부분 --> */}
        <div className="user-info-tap">
          <div className="property">
            <div
              className="div-wrapper"
              onClick={() => {
                handleClick();
              }}
            >
              <div className="info-subtitle">신상 정보</div>
            </div>
            <div className="frame">
              <div className="text-wrapper">성적 입력</div>
            </div>
            <div className="div-wrapper">
              <div className="info-subtitle">차트</div>
            </div>
          </div>
          <div className="info-button">
            <button
              onClick={e => {
                studentGradeSelect1(e);
              }}
            >
              조회
            </button>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-top">
            <div className="info-title" id="info-grade-select">
              <span>학기 선택</span>
              <div className="select-grade">
                <select
                  name="grade"
                  onChange={e => {
                    handleGradeChange(e);
                  }}
                  value={grade}
                >
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                  <option value="5">5학년</option>
                  <option value="6">6학년</option>
                </select>
                <select
                  name="semester"
                  onChange={e => {
                    handleSemesterChange(e);
                  }}
                  value={semester}
                >
                  <option value="1">1학기</option>
                  <option value="2">2학기</option>
                </select>
              </div>
              <div className="total-student">
                <p>반/학년 전체 인원</p>
                <input
                  value={`${classStudentCount} / ${gradeStudentCount}`}
                  readOnly
                />
                명
              </div>
            </div>
          </div>
        </div>
        <div className="exam-table">
          <div className="property">
            <div className="frame">
              <div className="text-wrapper">중간고사</div>
            </div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-top">
            {subjects.map((subject, index) => (
              <div className="info-title" id="info-grade-select" key={index}>
                <span>{subject}</span>
                <div className="grade-info-section">
                  <div className="grade-info">
                    <p>원점수</p>
                    <input
                      // type="number"
                      readOnly
                      value={midGrades[subject]?.mark || "-"}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 평균</p>
                    <input
                      readOnly
                      // placeholder="-"
                      value={`${midGrades[subject]?.classAvg || "-"} / ${midGrades[subject]?.gradeAvg || "-"}`}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 등수</p>
                    <input
                      readOnly
                      value={`${midGrades[subject]?.classRank || "-"} / ${midGrades[subject]?.subjectGradeRank || "-"}`}
                    />
                    등
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input readOnly value={gradeRank} /> 등
          </div>
          <div className="grade-rank">
            반 등수 <input readOnly value={classRank} /> 등
          </div>
        </div>
        <Signature />

        <div className="exam-table">
          <div className="property">
            <div className="frame">
              <div className="text-wrapper">기말고사</div>
            </div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-top">
            {subjects.map((subject, index) => (
              <div className="info-title" id="info-grade-select" key={index}>
                <span>{subject}</span>
                <div className="grade-info-section">
                  <div className="grade-info">
                    <p>원점수</p>
                    <input
                      // type="number"
                      readOnly
                      value={finalGrades[subject]?.mark || "-"}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 평균</p>
                    <input
                      readOnly
                      // placeholder="-"
                      value={`${finalGrades[subject]?.classAvg || "-"} / ${finalGrades[subject]?.schoolAvg || "-"}`}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 등수</p>
                    <input
                      readOnly
                      value={`${finalGrades[subject]?.classRank || "-"} / ${finalGrades[subject]?.schoolRank || "-"}`}
                    />
                    등
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input readOnly placeholder="-" /> /312등
          </div>
          <div className="grade-rank">
            반 등수 <input readOnly placeholder="-" /> /312등
          </div>
        </div>
        <Signature />
      </div>
    </div>
  );
};

export default GradeView;
