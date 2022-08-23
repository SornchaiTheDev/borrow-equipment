import { useState, useEffect } from "react";
import Item from "../Components/Item";
import Profile from "../Components/Profile";
import SearchBox from "../Components/SearchBox";
import Borrow from "../Components/Borrow";
import BorrowCode from "../Components/BorrowCode";
import { getDocument, getAllFromCollection } from "../firebase/method/db";
import { useLocalStorage } from "usehooks-ts";
import { Equipment } from "../interface/Equipment";

function Home() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [borrow, setBorrow] = useState<Equipment | null>(null);
  const [code, setCode] = useState<string>("");
  const [uid, _] = useLocalStorage("uid", "");

  const handleOnSuccess = (code: string) => {
    setCode(code);
    setBorrow(null);
    setIsSuccess(true);
  };
  useEffect(() => {
    getDocument(`users/${uid}`).then((user) =>
      setIsBanned(user!.status === "banned")
    );
    getAllFromCollection("equipments").then((result) =>
      setEquipments(result as Equipment[])
    );
  }, []);

  if (equipments.length === 0)
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <h2 className="text-lg">กำลังโหลด...</h2>
      </div>
    );

  return (
    <>
      {borrow && (
        <Borrow
          item={borrow}
          onClose={() => setBorrow(null)}
          onSuccess={handleOnSuccess}
        />
      )}
      {isSuccess && (
        <BorrowCode code={code} onClose={() => document.location.reload()} />
      )}

      <div className="py-4 px-4 md:px-16 min-h-screen flex justify-center items-center w-full">
        <div className="flex flex-col max-w-xl p-4  rounded-2xl bg-white shadow-sm py-4 w-full gap-4">
          <div className="flex items-center justify-between">
            <SearchBox />
            <Profile />
          </div>
          {isBanned && (
            <p className="text-red-500 font-bold">*บัญชีของคุณถูกระงับ</p>
          )}
          <div className="grid grid-cols-6 gap-4 w-full">
            {equipments.map((item) => (
              <Item
                key={item.id}
                onClick={() =>
                  !isBanned && item.amount !== 0 && setBorrow(item)
                }
                name={item.name}
                icon={item.icon}
                amount={item.amount}
                disabled={isBanned || item.amount === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
