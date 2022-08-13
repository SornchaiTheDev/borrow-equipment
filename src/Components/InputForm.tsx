import { FormEvent } from "react";

interface InputFormProps {
  title: string;
  placeholder?: string;
  size?: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

function InputForm({
  title,
  size,
  placeholder,
  type,
  className,
  value,
  onChange,
}: InputFormProps) {
  return (
    <div className={`relative ${className} w-full`}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type !== undefined ? type : "text"}
        className={`w-full rounded-lg p-2 pb-2 pt-4 ${
          size !== undefined ? size : "text-lg"
        }`}
        style={{ border: "1.5px solid #2e2e2e" }}
      />
      <p className="absolute -top-3 left-2 bg-white px-2 font-normal text-sm">
        {title}
      </p>
    </div>
  );
}

export default InputForm;
