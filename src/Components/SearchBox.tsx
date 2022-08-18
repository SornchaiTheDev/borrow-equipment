import { BiSearch } from "react-icons/bi";

function SearchBox() {
  return (
    <div className="border-2 rounded-lg px-2 relative flex items-center w-fit border-gray-100">
      <BiSearch />
      <input
        type="text"
        className="w-full p-2 outline-none"
        placeholder="ค้นหาอุปกรณ์กีฬา"
      />
    </div>
  );
}

export default SearchBox;
