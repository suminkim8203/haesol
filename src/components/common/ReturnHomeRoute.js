import React from "react";
import { Navigate } from "react-router";

const ReturnHomeRoute = () => {
  return <Navigate to="/" {...alert("접근 권한이 없습니다.")}></Navigate>;
};

export default ReturnHomeRoute;
