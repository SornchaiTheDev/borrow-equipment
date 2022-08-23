import { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { GrFormClose } from "react-icons/gr";
import { TextField } from "@mui/material";
import { Equipment } from "../interface/Equipment";

interface BorrowProps {
  onClose: () => void;
  onSuccess: () => void;
  item: Equipment;
}

function Borrow({ item, onClose, onSuccess }: BorrowProps) {
  const [isBorrow, setIsBorrow] = useState<boolean>(false);
  const [borrowAmount, setBorrowAmount] = useState<number>(1);
  const [isAccept, setIsAccept] = useState<boolean>(false);

  const [borrowDate, setBorrowDate] = useState<Date | null>(
    new Date("2022-08-13T21:11:54")
  );

  const handleAmount = ({ type }: { type: "INCREMENT" | "DECREMENT" }) => {
    if (borrowAmount < 2 && type === "DECREMENT") return;
    if (borrowAmount >= item.amount && type === "INCREMENT") return;
    if (type === "INCREMENT") setBorrowAmount(borrowAmount + 1);
    if (type === "DECREMENT") setBorrowAmount(borrowAmount - 1);
  };

  const handleBorrow = () => {
    if (!isAccept) return;
    setIsBorrow(true);
    setTimeout(() => {
      setIsBorrow(false);
      onSuccess();
    }, 1000);
  };

  const handleChange = (newValue: Date | null) => {
    setBorrowDate(newValue);
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
        <h2 className="text-xl font-semibold">ยืม{item.name}</h2>
        <div className="w-48 rounded-2xl overflow-hidden">
          <img src={item.icon} className="w-full" />
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
        <div className="mt-4">
          <DateTimePicker
            label="วันที่/เวลาที่ยืม"
            value={borrowDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>

        <div className="inline-flex items-center gap-2  ">
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
          <button
            disabled={!isAccept}
            className="bg-gray-900 disabled:bg-gray-300 rounded-full px-4 py-3 text-white transition-all duration-300 inline-flex justify-center items-center w-full"
            onClick={handleBorrow}
          >
            {isBorrow ? (
              <div className="animate-spin py-1">
                <AiOutlineLoading3Quarters />
              </div>
            ) : (
              "ยืนยันการยืม"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Borrow;
