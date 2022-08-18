import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SignInBtnProps {
  onClick: () => void;
  title: string;
  isDisabled: boolean;
}
function SignInBtn({ onClick, title, isDisabled }: SignInBtnProps) {
  return (
    <button
      disabled={isDisabled}
      className="bg-gray-900 rounded-full px-4 py-3 text-white transition-all duration-300 inline-flex justify-center items-center w-full"
      onClick={onClick}
    >
      {isDisabled ? (
        <div className="animate-spin py-1">
          <AiOutlineLoading3Quarters />
        </div>
      ) : (
        title
      )}
    </button>
  );
}

export default SignInBtn;
