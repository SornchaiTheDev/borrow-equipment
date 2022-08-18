import { useState } from "react";
import Item from "../Components/Item";
import Profile from "../Components/Profile";
import SearchBox from "../Components/SearchBox";
import Borrow from "../Components/Borrow";
import BorrowCode from "../Components/BorrowCode";

function Home() {
  const [isBorrow, setIsBorrow] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  const handleOnSuccess = () => {
    setIsBorrow(false);
    setIsSuccess(true);
  };

  return (
    <>
      {isBorrow && (
        <Borrow
          amount={10}
          onClose={() => setIsBorrow(false)}
          onSuccess={handleOnSuccess}
        />
      )}
      {isSuccess && <BorrowCode onClose={() => setIsSuccess(false)} />}
      <div className="py-4 px-4 md:px-16 min-h-screen flex justify-center items-center w-full">
        <div className="flex flex-col max-w-xl p-4  rounded-2xl bg-white shadow-sm py-4 w-full gap-4">
          <div className="flex items-center justify-between">
            <SearchBox />
            <Profile />
          </div>
          <div className="grid grid-cols-6 gap-4 w-full">
            <Item
              onClick={() => setIsBorrow(true)}
              name="บาสเกตบอล"
              icon="https://contents.mediadecathlon.com/p2154429/k$2fc1fe4d01a5e4dbaea0aa9ece21ad8d/size-7-basketball-bt100-for-men-ages-13-and-up-orange.jpg?&f=250x250"
              amount={20}
            />
            <Item
              onClick={() => 0 > 0 && setIsBorrow(true)}
              name="ฟุตบอล"
              icon="https://contents.mediadecathlon.com/p1823211/ab29e26cdc9a9f2a72fc21f2377b9164/p1823211.jpg?f=480x480&format=auto"
              amount={0}
            />
            <Item
              onClick={() => setIsBorrow(true)}
              name="วอลเลย์บอล"
              icon="https://contents.mediadecathlon.com/p1571705/afe5b578021e8bd054dadaf9b8d42b9f/p1571705.jpg?f=480x480&format=auto"
              amount={20}
            />
            <Item
              onClick={() => setIsBorrow(true)}
              name="ไม้ปิงปอง"
              icon="https://contents.mediadecathlon.com/p1278611/1e024637b46a95b7e5fc031bb0061527/p1278611.jpg?f=480x480&format=auto"
              amount={20}
            />
            <Item
              onClick={() => setIsBorrow(true)}
              name="ไม้แบดมินตัน"
              icon="https://contents.mediadecathlon.com/p2122365/0a2412a16125f3c59f6c7f2be5880798/p2122365.jpg?f=480x480&format=auto"
              amount={20}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
