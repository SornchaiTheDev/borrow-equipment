import { useState, useEffect, useMemo } from "react";
import Item from "../Components/Item";
import Profile from "../Components/Profile";
import SearchBox from "../Components/SearchBox";
import Borrow from "../Components/Borrow";
import BorrowCode from "../Components/BorrowCode";
import { getDocument, update } from "../firebase/method/db";
import { collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useLocalStorage } from "usehooks-ts";
import { Equipment } from "../interface/Equipment";
import { differenceInDays } from "date-fns";
import { db } from "../firebase";

function Home() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [borrow, setBorrow] = useState<Equipment | null>(null);
  const [code, setCode] = useState<string>("");
  const [isBorrow, setIsBorrow] = useState<boolean>(false);
  const [uid, _] = useLocalStorage("uid", "");
  const [searchText, setSearchText] = useState<string>("");

  const handleOnSuccess = (code: string) => {
    setCode(code);
    setBorrow(null);
    setIsSuccess(true);
  };

  useEffect(() => {
    getDocument(`users/${uid}`).then((user) => {
      if (user!.latestBorrowDate) {
        setIsBorrow(true);
        const diff = differenceInDays(
          Date.now(),
          new Date(user!.latestBorrowDate.seconds * 1000)
        );
        if (diff > 3) {
          setIsBanned(true);
          update(`users/${uid}`, { bannedDate: serverTimestamp() });
        }
      } else {
        setIsBanned(false);
      }

      if (user!.bannedDate) {
        const diff = differenceInDays(
          Date.now(),
          new Date(user!.bannedDate.seconds * 1000)
        );
        if (diff >= 7) {
          update(`users/${uid}`, { bannedDate: null });
        }
      }
    });
  }, []);

  const filteredEquipments = equipments.filter(({ name }) =>
    searchText.length > 0 ? !name.search(searchText) : true
  );

  useEffect(() => {
    const colRef = collection(db, "equipments");

    onSnapshot(colRef, (docs) => {
      const allEquipments: Equipment[] = [];
      docs.forEach((doc) =>
        allEquipments.push({ ...doc.data(), id: doc.id } as Equipment)
      );
      setEquipments(allEquipments);
    });
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
        <BorrowCode
          from="home"
          code={code}
          onClose={() => document.location.reload()}
        />
      )}

      <div className="py-4 px-4 md:px-16 min-h-screen flex justify-center items-center w-full">
        <div className="flex flex-col max-w-xl p-4  rounded-2xl bg-white shadow-sm py-4 w-full min-h-[50vh] gap-4">
          <div className="flex items-center justify-between">
            <SearchBox
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
            />
            <Profile />
          </div>
          {isBanned && !isBorrow && (
            <p className="text-red-500 font-bold">*บัญชีของคุณถูกระงับ</p>
          )}
          <div className="grid grid-cols-6 gap-4 w-full">
            {filteredEquipments.length === 0 && (
              <p className="text-center col-span-6 my-10">ไม่พบอุปกรณ์</p>
            )}
            {filteredEquipments.map((item) => (
              <Item
                key={item.id}
                onClick={() =>
                  !isBanned && item.amount !== 0 && !isBorrow && setBorrow(item)
                }
                name={item.name}
                icon={item.icon}
                amount={item.amount}
                disabled={isBanned || item.amount === 0 || isBorrow}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
