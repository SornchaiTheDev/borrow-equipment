import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Button from "../Components/Button";
import { GrFormClose } from "react-icons/gr";

interface BorrowProps {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

function Borrow({ amount, onClose, onSuccess }: BorrowProps) {
  const [borrowAmount, setBorrowAmount] = useState<number>(1);
  const [isAccept, setIsAccept] = useState<boolean>(false);

  const handleAmount = ({ type }: { type: "INCREMENT" | "DECREMENT" }) => {
    if (borrowAmount < 2 && type === "DECREMENT") return;
    if (borrowAmount >= amount && type === "INCREMENT") return;
    if (type === "INCREMENT") setBorrowAmount(borrowAmount + 1);
    if (type === "DECREMENT") setBorrowAmount(borrowAmount - 1);
  };

  const handleBorrow = () => {
    if (!isAccept) return;
    onSuccess();
  };

  return (
    <div className="h-screen flex justify-center items-center w-full bg-black bg-opacity-20 absolute z-40">
      <div className="flex flex-col items-center max-w-md p-4  rounded-2xl bg-white shadow-sm py-4 w-full gap-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 self-end mx-2"
        >
          <GrFormClose size="1.5rem" />
          <h2>ปิดหน้าต่าง</h2>
        </button>
        <h2 className="text-xl font-semibold">ยืมบาสเกตบอล</h2>
        <div className="w-48 rounded-2xl overflow-hidden">
          <img
            src="https://contents.mediadecathlon.com/p2154429/k$2fc1fe4d01a5e4dbaea0aa9ece21ad8d/size-7-basketball-bt100-for-men-ages-13-and-up-orange.jpg?&f=250x250"
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="rounded-lg p-1 bg-gray-100"
            onClick={() => handleAmount({ type: "DECREMENT" })}
          >
            <AiOutlineMinus size="1.25rem" />
          </button>
          <h4 className="text-lg font-bold">{borrowAmount} ชิ้น</h4>
          <button
            className="rounded-lg p-1 bg-gray-100"
            onClick={() => handleAmount({ type: "INCREMENT" })}
          >
            <AiOutlinePlus size="1.25rem" />
          </button>
        </div>
        <div className="inline-flex items-center gap-2">
          <input
            id="consent"
            checked={isAccept}
            onClick={() => setIsAccept(!isAccept)}
            type="checkbox"
          />
          <label htmlFor="consent">
            หากนำมาคืนไม่ตรงตามเวลา 3 ครั้งจะไม่สามารถยืมได้ 1 สัปดาห์
          </label>
        </div>
        <div className="w-2/3">
          <Button
            title="ยืนยันการยืม"
            onClick={handleBorrow}
            isDisabled={!isAccept}
          />
        </div>
      </div>
    </div>
  );
}

export default Borrow;
