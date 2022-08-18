import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  title: string;
}
function Button({ onClick, isDisabled, title }: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      className="bg-gray-900 disabled:bg-gray-300 rounded-full px-4 py-3 text-white transition-all duration-300 inline-flex justify-center items-center w-full"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
