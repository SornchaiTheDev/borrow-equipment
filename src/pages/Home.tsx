import SearchBox from "../Components/SearchBox";

function Home() {
  return (
    <div className="py-4 px-16 bg-gray-50 h-screen flex justify-center items-center">
      <div className="flex flex-col w-full max-w-sm p-4  rounded-2xl bg-white shadow-sm py-4  items-center">
        <SearchBox />
      </div>
    </div>
  );
}

export default Home;
