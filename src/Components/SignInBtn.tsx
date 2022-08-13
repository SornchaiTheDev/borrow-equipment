import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SignInBtnProps {
  onClick: () => void;
  isSubmit: boolean;
  title: string;
}
function SignInBtn({ onClick, isSubmit, title }: SignInBtnProps) {
  return (
    <button
      disabled={isSubmit}
      className="bg-gray-900 rounded-full px-4 py-3 text-white transition-all duration-300 inline-flex justify-center items-center w-full"
      onClick={onClick}
    >
      {isSubmit ? (
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
