import { FormEvent, useEffect, useState } from "react";
import InputForm from "../Components/InputForm";
import AsyncBtn from "../Components/AsyncBtn";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useLocalStorage } from "usehooks-ts";

const handleError = (err: string) => {
  if (err === "auth/email-already-in-use") return "มีชื่อผู้ใช้นี้อยู่แล้ว";
  if (err === "auth/weak-password") return "ไม่สามารถใช้รหัสผ่านนี้ได้";
  return "โปรดลองใหม่อีกครั้ง";
};

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useLocalStorage<string>("uid", "");

  const navigate = useNavigate();

  const handleOnSignUp = () => {
    setError(null);
    setIsSubmit(true);
    createUserWithEmailAndPassword(
      auth,
      `${username}@borrow-equipment.com`,
      password
    )
      .then(({ user }: UserCredential) => {
        setUser(user.uid);
        navigate("/info", { replace: true });
      })
      .catch(({ code }: AuthError) => setError(code));

    setIsSubmit(false);
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="py-4 px-16  bg-gray-50 h-screen flex justify-center items-center">
      <div className="flex flex-col w-full max-w-sm p-4  rounded-2xl bg-white shadow-sm  items-center">
        <h2 className="text-2xl font-bold">มายืมกัน</h2>
        {error && (
          <p className="text-red-500 font-semibold">{handleError(error)}</p>
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
