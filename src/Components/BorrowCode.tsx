import Button from "./Button";

interface BorrowCodeProps {
  onClose: () => void;
  code: string;
  from: "home" | "profile";
}

function BorrowCode({ onClose, code, from }: BorrowCodeProps) {
  return (
    <div className="h-screen flex justify-center items-center w-full bg-black bg-opacity-20 absolute z-40">
      <div className="flex flex-col items-center max-w-md p-4  rounded-2xl bg-white shadow-sm py-4 w-full gap-6">
        {from === "home" && (
          <h2 className="mt-2 text-2xl font-semibold">ยืมสำเร็จ !</h2>
        )}
        <p className="text-center mt-4">
          รหัสการยืมจะใช้เพื่อยืนยันว่าได้คืนต่อเจ้าหน้าที่ <br />
        </p>
        <div className="my-6">
          <div className="border-2 border-gray-50 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-4xl">{code}</h2>
          </div>
        </div>

        <div className="w-2/3">
          <Button title="ปิด" onClick={onClose} isDisabled={false} />
        </div>
      </div>
    </div>
  );
}

export default BorrowCode;
