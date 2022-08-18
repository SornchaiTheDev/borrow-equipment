import { ChangeEvent, FormEvent, useState } from "react";
import InputForm from "../Components/InputForm";
import AsyncBtn from "../Components/AsyncBtn";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleOnSignIn = () => {
    setIsSubmit(true);
    setTimeout(() => {
      navigate("/", { replace: true });
      setIsSubmit(false);
    }, 1000);
  };
  return (
    <div className="py-4 px-16 bg-gray-50 h-screen flex justify-center items-center">
      <div className="flex flex-col w-full max-w-sm p-4  rounded-2xl bg-white shadow-sm py-4  items-center">
        <h2 className="text-2xl font-bold">มายืมกัน</h2>
        <div className="my-4 flex w-full flex-col gap-6 items-center">
          <InputForm
            size="text-md"
            title="ชื่อผู้ใช้"
            value={username}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />
          <InputForm
            size="text-md"
            type="password"
            title="รหัสผ่าน"
            value={password}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
        </div>
        <AsyncBtn
          title="เข้าสู่ระบบ"
          onClick={handleOnSignIn}
          isDisabled={isSubmit}
        />
        <h2 className="mt-4">
          ยังไม่เป็นสมาชิก ?{" "}
          <a
            onClick={() => navigate("/register")}
            className="text-blue-700 cursor-pointer"
          >
            สมัครสมาชิก
          </a>
        </h2>
      </div>
    </div>
  );
}

export default Login;
