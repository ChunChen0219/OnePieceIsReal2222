import { useState } from "react";
import { usePostApiEmailSendForgotPassword } from "../../API";

function ForgetPassword() {
  const { mutate: addForgotPassword, error } =
    usePostApiEmailSendForgotPassword();
  const [email, setEmail] = useState(""); // 增加狀態來保存郵件地址

  const handleAddPet = () => {
    addForgotPassword({ data: { email: email } }); // 使用狀態中的郵件地址
  };

  if (error) return <div>錯誤警報錯誤警報 {error.message}</div>;

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="請輸入信箱"
      />
      <button onClick={handleAddPet}>發送至信箱</button>
    </div>
  );
}

export default ForgetPassword;
