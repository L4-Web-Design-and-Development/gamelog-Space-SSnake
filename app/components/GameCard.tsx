import witcherLogo from "~/assets/svg/Witcher.png";
export default function GameCard() {
  return (
    <div className="flex flex-col w-1/3 py-10 rounded-lg">
      <div className="py-10 rounded-full">
        <img src={witcherLogo} alt="Game Logo"></img>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold">Witcher 3: Wild Hunt</div>
          <div className="text-cyan-400">RPG</div>
          <div className="text-gray-400">2023-10-01</div>
        </div>
        <div className="flex flex-col justify-between gap-6 w-90">
          <button className="   flex items-center justify-center bg-transparent  border-2 border-cyan-400  text-cyan-400 px-4 py-2 text-sm font-bold rounded hover:bg-green-100 w-full h-7">
            Edit
          </button>

          <button className=" flex items-center justify-center bg-transparent border-2  border-red-200  text-red-200 px-4 py-2 text-sm font-bold rounded hover:bg-green-100 w-full h-7">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
