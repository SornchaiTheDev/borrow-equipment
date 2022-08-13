import { ChangeEvent, useState } from "react";
import InputForm from "../Components/InputForm";
import SignInBtn from "../Components/SignInBtn";
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
    <div className="py-4 px-16  bg-gray-50 h-screen flex justify-center items-center">
      <div className="flex flex-col w-full max-w-sm p-4  rounded-2xl bg-white shadow-sm  items-center">
        <h2 className="text-2xl font-bold">มายืมกัน</h2>
        <div className="my-4 flex w-full flex-col gap-6 items-center">
          <InputForm size="text-md" title="ชื่อผู้ใช้" placeholder="" />
          <InputForm
            size="text-md"
            type="password"
            title="รหัสผ่าน"
            placeholder=""
          />
        </div>
        <SignInBtn
          title="สมัครสมาชิก"
          onClick={handleOnSignIn}
          isSubmit={isSubmit}
        />
        <h2 className="mt-4">
          เป็นสมาชิกอยู่แล้ว ?{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-blue-700 cursor-pointer"
          >
            เข้าสู่ระบบ
          </a>
        </h2>
      </div>
    </div>
  );
}

export default Login;
