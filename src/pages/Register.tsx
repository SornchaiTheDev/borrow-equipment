import { FormEvent, useState } from "react";
import InputForm from "../Components/InputForm";
import AsyncBtn from "../Components/AsyncBtn";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleOnSignUp = () => {
    setIsError(false);
    setIsSubmit(true);
    createUserWithEmailAndPassword(
      auth,
      `${username}@borrow-equipment.com`,
      password
    )
      .then(() => navigate("/info", { replace: true }))
      .catch((err) => setIsError(true));

    setIsSubmit(false);
  };
  return (
    <div className="py-4 px-16  bg-gray-50 h-screen flex justify-center items-center">
      <div className="flex flex-col w-full max-w-sm p-4  rounded-2xl bg-white shadow-sm  items-center">
        <h2 className="text-2xl font-bold">มายืมกัน</h2>
        {isError && (
          <p className="text-red-500 font-semibold">โปรดลองใหม่อีกครั้ง</p>
        )}

        <div className="my-4 flex w-full flex-col gap-6 items-center">
          <InputForm
            size="text-md"
            title="ชื่อผู้ใช้"
            value={username}
            placeholder=""
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />
          <InputForm
            size="text-md"
            type="password"
            title="รหัสผ่าน"
            placeholder=""
            value={password}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
        </div>
        <AsyncBtn
          title="สมัครสมาชิก"
          onClick={handleOnSignUp}
          isDisabled={isSubmit}
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
