interface ItemProps {
  name: string;
  icon: string;
  amount: number;
  onClick: () => void;
}

function Item({ name, icon, amount, onClick }: ItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full  col-span-3 md:col-span-2 ${
        amount === 0 ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="flex flex-col bg-white p-4 shadow-md shadow-gray-100 rounded-lg">
        <div className="w-full rounded-2xl overflow-hidden">
          <img
            src={icon}
            alt={`${name}`}
            className={`w-full ${amount === 0 && "grayscale"}`}
          />
        </div>
        <div className="flex flex-col bg-white w-full mt-2">
          <h2 className="text-xl font-bold">{name}</h2>
          <h3 className="text-md">เหลือจำนวน {amount} ชิ้น</h3>
        </div>
      </div>
    </button>
  );
}

export default Item;
