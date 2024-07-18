import {
  getStudentGrade1,
  getStudentGrade2,
  getStudentGradeSelect1,
  getStudentGradeSelect2,
  getStudentInfo,
  postStudentGradeScore,
} from "api/student/studentapi";

import Signature from "pages/grade/Signature";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../../scss/student/grade.css";
import "../../scss/student/studentEdit.css";
import styled from "@emotion/styled";

const initData = [
  {
    name: "국어",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "수학",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "바른 생활",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "사회/도덕",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "과학",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "영어",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "실과",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "체육",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "음악",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "미술",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
];

const Grade = () => {
  // 네비게이트
  const navigate = useNavigate();
  const { studentPk } = useParams();
  const handleClick = () => {
    navigate(`/students/edit/${studentPk}`);
  };

  const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [nowYear, setNowYear] = useState(new Date().getFullYear());
  const [yearOptions, setYearOptions] = useState([]);
  // const [selectedYear, setSelectedYear] = useState(""); // 추가된 부분

  const [classStudentCount, setClassStudentCount] = useState("-");
  const [gradeStudentCount, setGradeStudentCount] = useState("-");
  const [classRank, setClassRank] = useState("-");
  const [gradeRank, setGradeRank] = useState("-");

  // const [midGrades, setMidGrades] = useState({
  //   국어: "",
  //   수학: "",
  //   "바른 생활": "",
  //   "사회/도덕": "",
  //   과학: "",
  //   영어: "",
  //   실과: "",
  //   체육: "",
  //   음악: "",
  //   미술: "",
  // });
  // const [finalGrades, setfinalGrades] = useState({
  //   국어: "",
  //   수학: "",
  //   "바른 생활": "",
  //   "사회/도덕": "",
  //   과학: "",
  //   영어: "",
  //   실과: "",
  //   체육: "",
  //   음악: "",
  //   미술: "",
  // });

  // const subjects = [
  //   "국어",
  //   "수학",
  //   "바른 생활",
  //   "사회/도덕",
  //   "과학",
  //   "영어",
  //   "실과",
  //   "체육",
  //   "음악",
  //   "미술",
  // ];

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
  const [examListOne, setExamListOne] = useState(initData);
  const [examListTwo, setExamListTwo] = useState(initData);
  const [latestGrade, setLatestGrade] = useState(1); // 최종학년
  const [latestSemester, setLatestSemester] = useState(1); // 최종학기
  const [latestYear, setLatestYear] = useState("2023"); // 최종년도

  const studentGrade1 = async () => {
    try {
      // 중간고사
      const response = await getStudentGrade1(studentPk);
      const result = response.data.data.list || [];
      console.log(response);
      // 요것은 조금 위험하다.
      setLatestGrade(response.data.data.latestGrade || 1);
      setLatestSemester(response.data.data.latestSemester || 1);
      setLatestYear(response.data.data.latestYear || "");
      setClassRank(response.data.data.classRank.classRank);
      setGradeRank(response.data.data.classRank.gradeRank);
      setClassStudentCount(response.data.data.classRank.classStudentCount);
      setGradeStudentCount(response.data.data.classRank.gradeStudentCount);
      // console.log("중간 : ", response.data.data);
      const updatedData = examListOne.map(subject => {
        const update = result.find(data => data.name === subject.name);
        if (update) {
          return {
            ...subject,
            mark: update.mark,
            classAvg: update.classAvg,
            classRank: update.classRank,
            gradeAvg: update.gradeAvg,
            gradeRank: update.gradeRank,
            subjectClassRank: update.subjectClassRank,
            subjectGradeRank: update.subjectGradeRank,
            exam: update.exam,
            semester: response.data.data.latestSemester,
            year: response.data.data.latestYear,
            grade: response.data.data.latestGrade,
          };
        }
        return subject;
      });
      setExamListOne(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  // 최초 조회 시 성적 불러오기 기말고사
  const studentGrade2 = async () => {
    try {
      const response = await getStudentGrade2(studentPk);
      console.log(response);
      const result = response.data.data.list || [];
      // 요것은 조금 위험하다.
      setLatestGrade(response.data.data.latestGrade || 1);
      setLatestSemester(response.data.data.latestSemester || 1);
      setLatestYear(response.data.data.latestYear || "");
      setClassRank(response.data.data.classRank.classRank);
      setGradeRank(response.data.data.classRank.gradeRank);
      setClassStudentCount(response.data.data.classRank.classStudentCount);
      setGradeStudentCount(response.data.data.classRank.gradeStudentCount);

      // console.log("기말 : ", response.data.data);
      const updatedData = examListTwo.map(subject => {
        const update = result.find(data => data.name === subject.name);
        if (update) {
          return {
            ...subject,
            mark: update.mark,
            classAvg: update.classAvg,
            classRank: update.classRank,
            gradeAvg: update.gradeAvg,
            gradeRank: update.gradeRank,
            subjectClassRank: update.subjectClassRank,
            subjectGradeRank: update.subjectGradeRank,
            exam: update.exam,
            semester: response.data.data.latestSemester,
            year: response.data.data.latestYear,
            grade: response.data.data.latestGrade,
          };
        }
        return subject;
      });
      setExamListTwo(updatedData);
    } catch (error) {
      console.log(error);
    }
  };
  // 내용 변경 처리 중간
  const handleChangeOne = item => {
    // 전달된 객체의 name 속성을 비교하고 같으면 업데이트를 해줌.
    const updatedData = examListOne.map(subject => {
      const update = item.name === subject.name;
      if (update) {
        return {
          ...subject,
          mark: parseInt(item.mark),
          classAvg: item.classAvg,
          classRank: item.classRank,
          gradeAvg: item.gradeAvg,
          gradeRank: item.gradeRank,
          subjectClassRank: item.subjectClassRank,
          subjectGradeRank: item.subjectGradeRank,
        };
      }
      return subject;
    });

    setExamListOne(updatedData);
  };

  // 내용 변경 처리 기말
  const handleChangeTwo = item => {
    // 전달된 객체의 name 속성을 비교하고 같으면 업데이트를 해줌.
    // console.log("item : ", item);
    const updatedData = examListTwo.map(subject => {
      const update = item.name === subject.name;
      if (update) {
        return {
          ...subject,
          mark: parseInt(item.mark),
          classAvg: item.classAvg,
          classRank: item.classRank,
          gradeAvg: item.gradeAvg,
          gradeRank: item.gradeRank,
          subjectClassRank: item.subjectClassRank,
          subjectGradeRank: item.subjectGradeRank,
        };
      }
      return subject;
    });

    setExamListTwo(updatedData);
  };

  const handleSaveOne = async _item => {
    // console.log(_item);
    const scoreData = {
      studentPk: studentPk,
      year: latestYear,
      semester: latestSemester,
      name: _item.name,
      exam: _item.exam,
      mark: _item.mark,
    };
    console.log(scoreData);
    try {
      // console.log("데이터 전송중? : ", scoreData);
      await postStudentGradeScore(scoreData);
      await studentGrade1();
      await studentGrade2();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    studentGrade1();
    studentGrade2();
  }, [studentPk]);

  const handleGradeChange = async e => {
    const newGrade = e.target.value;
    setLatestGrade(newGrade);
    await studentGradeSelect1(newGrade, latestSemester, latestYear);
    await studentGradeSelect2(newGrade, latestSemester, latestYear);
  };
  const handleSemesterChange = async e => {
    const newSemester = e.target.value;
    setLatestSemester(newSemester);
    await studentGradeSelect1(latestGrade, newSemester, latestYear);
    await studentGradeSelect2(latestGrade, newSemester, latestYear);
  };

  const handleYearChange = async e => {
    const newLatestYear = e.target.value;
    setLatestYear(newLatestYear);
    await studentGradeSelect1(latestGrade, latestSemester, newLatestYear);
    await studentGradeSelect2(latestGrade, latestSemester, newLatestYear);
  };

  // 학기, 학년 선택 성적 출력 중간고사
  const studentGradeSelect1 = async (grade, semester, year) => {
    try {
      // 중간고사
      const response = await getStudentGradeSelect1(
        studentPk,
        grade,
        semester,
        year,
      );
      const err = response.data;
      if (err.code < 0) {
        alert("선택한 학기의 중간고사 성적이 없습니다.");
        setExamListOne(initData);
        return;
      }

      const result = response.data.data.list || [];
      const updatedData = examListOne.map(subject => {
        const update = result.find(data => data.name === subject.name);
        if (update) {
          return {
            ...subject,
            mark: update.mark,
            classAvg: update.classAvg,
            classRank: update.classRank,
            gradeAvg: update.gradeAvg,
            gradeRank: update.gradeRank,
            subjectClassRank: update.subjectClassRank,
            subjectGradeRank: update.subjectGradeRank,
            exam: update.exam,
            semester: semester,
            year: year,
            grade: grade,
          };
        }
        return subject;
      });
      setExamListOne(updatedData);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const response = await getStudentGradeSelect1(studentPk, grade, semester);
    //   const err = response.data;
    //   if (err.code < 0) {
    //     alert("선택한 학기의 중간고사 성적이 없습니다.");
    //     // setMidGrades({});
    //     return;
    //   }
    //   const result = response.data.data.list || [];
    //   const midgradeMap = {};
    //   console.log(result);
    //   if (result.length > 0) {
    //     setClassStudentCount(result[0].classStudentCount || "-");
    //     setGradeStudentCount(result[0].gradeStudentCount || "-");
    //     setClassRank(result[0].classRank || "-");
    //     setGradeRank(result[0].gradeRank || "-");
    //     result.forEach(subject => {
    //       const {
    //         name,
    //         mark,
    //         classAvg,
    //         classRank,
    //         gradeAvg,
    //         gradeRank,
    //         subjectGradeRank,
    //       } = subject;
    //       midgradeMap[name] = {
    //         mark,
    //         classAvg,
    //         classRank,
    //         gradeAvg,
    //         gradeRank,
    //         subjectGradeRank,
    //       };
    //     });

    //     // setExamListOne({});
    //     // setMidGrades(midgradeMap);
    //     // setMidGrades({}); // 기말고사 데이터를 초기화
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // 학기, 학년 선택 성적 출력 기말고사
  const studentGradeSelect2 = async (grade, semester, year) => {
    try {
      const response = await getStudentGradeSelect2(
        studentPk,
        grade,
        semester,
        year,
      );

      const err = response.data;
      if (err.code < 0) {
        alert("선택한 학기의 기말고사 성적이 없습니다.");
        setExamListTwo(initData);
        return;
      }
      const result = response.data.data.list || [];
      const updatedData = examListTwo.map(subject => {
        const update = result.find(data => data.name === subject.name);
        if (update) {
          return {
            ...subject,
            mark: update.mark,
            classAvg: update.classAvg,
            classRank: update.classRank,
            gradeAvg: update.gradeAvg,
            gradeRank: update.gradeRank,
            subjectClassRank: update.subjectClassRank,
            subjectGradeRank: update.subjectGradeRank,
            exam: update.exam,
            semester: semester,
            year: year,
            grade: grade,
          };
        }
        return subject;
      });
      setExamListTwo(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const generateYearOptions = () => {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 10;
      const options = [];
      for (let year = currentYear; year >= startYear; year--) {
        options.push(year.toString());
      }
      setYearOptions(options);
    };
    generateYearOptions();
  }, []);

  // useEffect(() => {
  //   studentGrade2();
  // }, [studentPk]);

  // const handleMidGradeChange = (e, subject) => {
  //   const value = e.target.value;
  //   setMidGrades(prevGrades => ({
  //     ...prevGrades,
  //     [subject]: {
  //       ...(prevGrades[subject] || {}),
  //       mark: value,
  //     },
  //   }));
  // };

  // const handleFinalGradeChange = (e, subject) => {
  //   const value = e.target.value;
  //   setfinalGrades(prevGrades => ({
  //     ...prevGrades,
  //     [subject]: {
  //       ...(prevGrades[subject] || {}),
  //       mark: value,
  //     },
  //   }));
  // };

  // const handleSave = async () => {
  //   const scoreData = {
  //     studentPk: studentPk,
  //     year: "2023",
  //     semester,
  //     name: subjects[0],
  //     exam: "1",
  //     mark: score,
  //   };
  //   try {
  //     console.log("데이터 전송중? : ", scoreData);
  //     await postStudentGradeScore(scoreData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const setDateSelectBox = () => {
  //   let yearsArray = [];
  //   // 2005년부터 현재 연도까지 옵션을 추가합니다.
  //   for (let i = nowYear; i >= 2005; i--) {
  //     yearsArray.push(
  //       <option key={i} value={i}>
  //         {i}
  //       </option>,
  //     );
  //   }
  //   setYear(yearsArray);
  // };
  // useEffect(() => {
  //   setDateSelectBox();
  // }, []);

  const ParentCheckStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-end;
    margin-bottom: 100px;
    button {
      cursor: Default;
      width: 120px;
      height: 30px;
      /* background: #fbfaf9; */
      border: solid 2px #886348;
      font-size: 18px;
    }
  `;

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{studentClass}</span>
        <p>{studentName} 성적 입력</p>
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
                  value={latestGrade}
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
                  value={latestSemester}
                >
                  <option value="1">1학기</option>
                  <option value="2">2학기</option>
                </select>
              </div>
              <div className="total-student">
                <p>년도 선택</p>
                <select
                  id="year"
                  value={latestYear}
                  onChange={e => {
                    handleYearChange(e);
                  }}
                >
                  {yearOptions.map((year, index) => (
                    <option key={index} value={year}>
                      {year}년
                    </option>
                  ))}
                </select>
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
            {examListOne.map((item, index) => (
              <div className="info-title" id="info-grade-select" key={index}>
                <span>{item.name}</span>
                <div className="grade-info-section">
                  <div className="grade-info">
                    <p>원점수</p>
                    <input
                      placeholder="-"
                      value={item.mark || ""}
                      onChange={e => {
                        handleChangeOne({ ...item, mark: e.target.value });
                      }}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 평균</p>
                    <input
                      value={`${item.classAvg || "-"} / ${item.gradeAvg || "-"}`}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 등수</p>
                    <input
                      value={`${item.subjectClassRank || "-"} / ${item.subjectGradeRank || "-"}`}
                    />
                    등
                  </div>
                  <div className="info-button">
                    <button
                      onClick={() => {
                        handleSaveOne(item);
                      }}
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input value={gradeRank} /> / {gradeStudentCount} 등
          </div>
          <div className="grade-rank">
            반 등수 <input value={classRank} /> / {classStudentCount} 등
          </div>
        </div>
        <ParentCheckStyle>
          <button>학부모 확인</button>
        </ParentCheckStyle>

        <div className="exam-table">
          <div className="property">
            <div className="frame">
              <div className="text-wrapper">기말고사</div>
            </div>
          </div>
        </div>

        <div className="info-contain-top">
          <div className="info-item-top">
            {examListTwo.map((item, index) => (
              <div className="info-title" id="info-grade-select" key={index}>
                <span>{item.name}</span>
                <div className="grade-info-section">
                  <div className="grade-info">
                    <p>원점수</p>
                    <input
                      placeholder="-"
                      value={item.mark || ""}
                      onChange={e => {
                        handleChangeTwo({ ...item, mark: e.target.value });
                      }}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 평균</p>
                    <input
                      value={`${item.classAvg || "-"} / ${item.gradeAvg || "-"}`}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 등수</p>
                    <input
                      value={`${item.subjectClassRank || "-"} / ${item.subjectGradeRank || "-"}`}
                    />
                    등
                  </div>
                  <div className="info-button">
                    <button
                      onClick={() => {
                        handleSaveOne(item);
                      }}
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input value={gradeRank} /> / {gradeStudentCount} 등
          </div>
          <div className="grade-rank">
            반 등수 <input value={classRank} /> / {classStudentCount} 등
          </div>
        </div>
        <Signature />
      </div>
    </div>
  );
};

export default Grade;
