import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // 引入 useHistory 以方便導航

function CheckVerificationCode() {
  const navigate = useNavigate(); // 用來進行頁面導航
  const [code, setCode] = useState(""); // 驗證碼的狀態
  const location = useLocation();
  const email = location.state?.email;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 添加事件參數的類型
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7236/api/MemberLogin/CodeCheck",
        {
          email: email,
          code: code,
        }
      );

      // 根據響應進行相應處理

      if (response.data) {
        alert("驗證成功！");
        navigate("/MemberLoginForm"); // 驗證成功後導航到成功頁面
      } else {
        alert("驗證碼錯誤或已過期");
      }
    } catch (error) {
      if (error && (error as AxiosError).response) {
        const axiosError = error as AxiosError;
        alert(axiosError.response?.data);
      }
    }
  };
  const sendVerificationCodeAgain = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7236/api/EmailSend/AAA?email=${email}`
      );
      if (response.data) {
        alert("已重新寄送驗證碼！");
        // 驗證成功後導航到成功頁面
      } else {
        alert("幹");
      }
    } catch (error) {
      console.log(error);
      if (error && (error as AxiosError).response) {
        const axiosError = error as AxiosError;
        alert(axiosError.response?.data);
      }

      // 处理没有消息的情况或其他逻辑
    }
  };

  return (
    <div>
      <h1>驗證電子信箱</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="電子信箱"
          value={email}
          // readOnly
          // onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="請輸入驗證碼"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">提交驗證碼</button>
        <button type="button" onClick={sendVerificationCodeAgain}>
          重新發送驗證碼
        </button>
      </form>
    </div>
  );
}

export default CheckVerificationCode;
