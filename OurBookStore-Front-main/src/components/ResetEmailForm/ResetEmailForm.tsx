import { useState } from "react";
import { usePostApiEmailSendResetPassword } from "../../API";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // 如果你的路由是 /reset-password/:token
  const [newPassword, setNewPassword] = useState("");
  const {
    mutate: resetPassword,
    error,
    isSuccess,
  } = usePostApiEmailSendResetPassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({ data: { token: token, newPassword: newPassword } });
  };

  if (isSuccess) {
    navigate("/member-login");
    return <div>密碼重置成功！</div>;
  }

  return (
    <div>
      <h2>重置密碼</h2>
      {error && <div>出事啦阿北{String(error.response?.data)}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>新密碼:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">重置密碼</button>
      </form>
    </div>
  );
}

export default ResetPassword;
