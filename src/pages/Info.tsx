import InputForm from "../Components/InputForm";
import Button from "../Components/Button";

function Info() {
  return (
    <div className="py-4 px-16 bg-gray-50 h-screen flex justify-center items-center">
      <div className="flex flex-col w-full max-w-sm p-4  rounded-2xl bg-white shadow-sm py-4  items-center">
        <h2 className="text-2xl font-bold">ข้อมูลสมาชิก</h2>
        <div className="my-4 flex w-full flex-col gap-6 items-center">
          <InputForm size="text-md" title="ชื่อ-นามสกุล" placeholder="" />
          <InputForm
            size="text-md"
            type="password"
            title="รหัสประจำตัวนักเรียน"
            placeholder=""
          />
          <InputForm
            size="text-md"
            type="password"
            title="เบอร์โทรศัพท์"
            placeholder=""
          />
          <Button title="ต่อไป" onClick={() => {}} isDisabled={false} />
        </div>
      </div>
    </div>
  );
}

export default Info;
