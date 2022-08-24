import { BiSearch } from "react-icons/bi";

interface SearchBoxI {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox({ value, onChange }: SearchBoxI) {
  return (
    <div className="border-2 rounded-lg px-2 relative flex items-center w-fit border-gray-100">
      <BiSearch />
      <input
        type="text"
        className="w-full p-2 outline-none"
        placeholder="ค้นหาอุปกรณ์กีฬา"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBox;
