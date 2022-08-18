interface ItemProps {
  name: string;
  icon: string;
  amount: number;
}

function Item({ name, icon, amount }: ItemProps) {
  return (
    <a className={`${amount === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}>
      <div className="flex flex-col bg-white p-4 shadow-md shadow-gray-100 w-fit rounded-lg col-span-3 md:col-span-1">
        <div className="w-32 rounded-2xl overflow-hidden">
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
    </a>
  );
}

export default Item;
