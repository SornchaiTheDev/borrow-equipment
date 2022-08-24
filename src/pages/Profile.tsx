import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useLocalStorage } from "usehooks-ts";
import { getDocument, getAllFromCollection } from "../firebase/method/db";
import { useEffect, useState } from "react";
import { User } from "../interface/User";
import Button from "../Components/Button";
import BorrowCode from "../Components/BorrowCode";
import { months } from "../helpers/months";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface History {
  item: string;
  code: string;
  status: string;
  borrowDate: { seconds: number; nanoseconds: number };
  borrowAmount: number;
}

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<string>("uid", "");
  const [profile, setProfile] = useState<User | null>(null);
  const [borrowCode, setBorrowCode] = useState<string>("");
  const [history, setHistory] = useState<History[]>([]);

  const handleLogout = () => {
    signOut(auth);
    setUser("");
    navigate("/login");
  };

  useEffect(() => {
    getDocument(`users/${user}`).then((user) => setProfile(user as User));
    getAllFromCollection(`users/${user}/history`).then((histories) =>
      setHistory(histories as History[])
    );
  }, []);

  return (
    <>
      {borrowCode.length > 0 && (
        <BorrowCode
          code={borrowCode}
          onClose={() => setBorrowCode("")}
          from="profile"
        />
      )}
      <div className="py-4 px-4 md:px-16 h-screen flex flex-col justify-center items-center w-full">
        <div className="bg-white w-full max-w-lg rounded-lg py-4">
          <button
            className="inline-flex items-center gap-2 p-4"
            onClick={() => navigate("/")}
          >
            <BsArrowLeft />
            <h4>กลับหน้าหลัก</h4>
          </button>
          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-white mt-4 flex items-center">
              <img
                src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
                className="w-full"
              />
            </div>
            <h2 className="text-xl underline decoration-dotted my-2">
              {profile ? profile.fullName : "กำลังโหลด"}
            </h2>

            <h3 className="font-bold">เลขประจำตัวนักเรียน</h3>
            <h2> {profile ? profile.studentId : "กำลังโหลด"}</h2>

            <h3 className="font-bold">เบอร์โทรศัพท์</h3>
            <h2> {profile ? profile.telephone : "กำลังโหลด"}</h2>
          </div>
          <div className="px-4 py-2">
            <h2 className="font-bold">ประวัติการยืม</h2>
            <div className=" h-64 overflow-y-auto">
              <table className="table-auto border-collapse w-full text-center mt-4 ">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2">รายการ</th>
                    <th className="p-2">วันที่</th>
                    <th className="p-2">เวลา</th>
                    <th className="p-2">สถานะ</th>
                    <th className="p-2">รหัสการยืม</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(
                    ({ item, borrowAmount, borrowDate, code, status }) => {
                      const date = new Date(borrowDate.seconds * 1000);

                      const time = date.getHours() + ":" + date.getMinutes();
                      let statusText =
                        status === "returned" ? "คืนแล้ว" : "ยังไม่คืน";

                      return (
                        <tr key={code}>
                          <td className="p-2">
                            ลูก{item} {borrowAmount} ลูก
                          </td>
                          <td className="p-2">
                            {format(date, "dd  MMM yyyy", { locale: th })}
                          </td>
                          <td className="p-2">{format(date, "HH:mm")}</td>
                          <td className="p-2">{statusText}</td>
                          <td className="p-2">
                            <Button
                              title="ดู"
                              onClick={() => setBorrowCode(code)}
                              isDisabled={false}
                            />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-300 text-red-500 p-2 rounded-lg "
                onClick={handleLogout}
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
