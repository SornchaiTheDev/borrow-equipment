import { ChangeEvent, FormEvent, useState } from "react";
import InputForm from "../Components/InputForm";
import AsyncBtn from "../Components/AsyncBtn";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  AuthError,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useLocalStorage } from "usehooks-ts";

const handleError = (err: string) => {
  console.log(err);
  if (err === "auth/user-not-found") return "ไม่พบผู้ใช้นี้";
  if (err === "auth/wrong-password") return "รหัสผ่านผิด";
  return "โปรดลองใหม่อีกครั้ง";
};

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<string>("uid", "");

  if (user) return <Navigate to="/" replace />;

  const handleOnSignIn = () => {
    setIsSubmit(true);
    signInWithEmailAndPassword(
      auth,
      `${username}@borrow-equipment.com`,
      password
    )
      .then(({ user }: UserCredential) => {
        setUser(user.uid);
        setIsSubmit(false);
        navigate("/", { replace: true });
      })
      .catch(({ code }: AuthError) => setError(code));
  };
  return (
    <div className="py-4 px-16 bg-gray-50 h-screen flex justify-center items-center">
      <div className="flex flex-col w-full max-w-sm p-4  rounded-2xl bg-white shadow-sm py-4  items-center">
        <h2 className="text-2xl font-bold">มายืมกัน</h2>
        {error && (
          <p className="text-red-500 font-semibold">{handleError(error)}</p>
        )}
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
