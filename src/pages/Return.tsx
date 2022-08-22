import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OtpInput from "react-otp-input";
import { Player } from "@lottiefiles/react-lottie-player";

function Return() {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="py-4 px-4 md:px-16 min-h-screen flex justify-center items-center w-full">
      <div className="flex flex-col max-w-md p-4  rounded-2xl bg-white shadow-sm py-4 w-full gap-4 items-center">
        {step === 1 ? (
          <FirstStep toSteptwo={() => setStep(2)} />
        ) : (
          <SecondStep status="success" backtoOne={() => setStep(1)} />
        )}
      </div>
    </div>
  );
}

export default Return;

const SecondStep = ({
  status,
  backtoOne,
}: {
  status: "success" | "failed";
  backtoOne: () => void;
}) => {
  useEffect(() => {
    setTimeout(() => {
      backtoOne();
    }, 3000);
  }, []);
  const animation =
    status === "success"
      ? "https://assets6.lottiefiles.com/packages/lf20_jbrw3hcz.json"
      : "https://assets5.lottiefiles.com/packages/lf20_reg7q42p.json";
  return (
    <div className="p-6">
      <h1 className="text-xl text-center my-4 font-bold">
        {status === "success" ? "คืนสำเร็จ" : "คืนไม่สำเร็จ"}
      </h1>
      {status === "failed" && <p className="text-center">ไม่พบรหัสการยืมนี้</p>}
      <Player src={animation} autoplay />
    </div>
  );
};

const FirstStep = ({ toSteptwo }: { toSteptwo: () => void }) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    if (code.length === 6) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [code]);

  const handleReturn = () => {
    if (isSubmit) return;
    setIsSubmit(true);
    setTimeout(() => {
      setIsSubmit(false);
      setCode("");
      toSteptwo();
    }, 1000);
  };
  return (
    <>
      <h2 className="text-center text-xl font-semibold mt-2">
        กรอกรหัสการยืมเพื่อคืน
      </h2>
      <div className="m-5">
        <OtpInput
          value={code}
          onChange={(code: string) => setCode(code)}
          inputStyle={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            height: "50px",
            padding: "10px",
            marginLeft: "10px",
          }}
          numInputs={6}
        />
      </div>
      <div className="w-1/2">
        <button
          disabled={isDisabled}
          className="bg-gray-900 disabled:bg-gray-300 rounded-full px-4 py-3 text-white transition-all duration-300 inline-flex justify-center items-center w-full"
          onClick={handleReturn}
        >
          {isSubmit ? (
            <div className="animate-spin py-1">
              <AiOutlineLoading3Quarters />
            </div>
          ) : (
            "ตกลง"
          )}
        </button>
      </div>
    </>
  );
};
