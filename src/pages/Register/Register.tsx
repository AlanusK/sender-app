import React from "react";
import "./Register.css";
import { UserLiteKycContainer } from "../../containers";
// import { useAuth } from "../../hooks/useAuth";
// import { useRouter } from "../../hooks/useRouter";


const Register = () => {
  // const { signin } = useAuth();
  // const { replace, query } = useRouter();
  // const onFinish = (values: any) => {
  //   //console.log("Success:", values);
  //   signin(values);
  //   return values.username && values.password
  //     ? replace(query.redirect ? query.redirect : "/")
  //     : null;
  // };
  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };
  return (
    <div className="register-form">
      <UserLiteKycContainer />
    </div>
  );
};

export default Register;
