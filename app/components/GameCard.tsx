interface GameCardProps {
  title: string;
  releaseDate: string;
}

import witcherLogo from "~/assets/svg/Witcher.png";
export default function GameCard(props: GameCardProps) {
  const formattedDate = props.releaseDate.slice(0, 10);
  return (
    <div className="flex flex-col w-1/3 py-10 rounded-lg">
      <div className="py-10 rounded-full">
        <img src={witcherLogo} alt="Game Logo"></img>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold">{props.title}</div>
          <div className="text-cyan-300">RPG</div>
          <div className="text-gray-400">{formattedDate}</div>
        </div>
        <div className="flex flex-col justify-between gap-6 w-90">
          <button className="   flex items-center justify-center bg-transparent  border-2 border-cyan-300  text-cyan-300 px-4 py-2 text-sm font-bold rounded hover:bg-green-100 w-full h-7">
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
