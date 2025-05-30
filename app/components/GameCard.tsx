interface GameCardProps {
  title: string;
  releaseDate: string;
  genre: string;
  imageUrl: string;
}

export default function GameCard(props: GameCardProps) {
  const formattedDate = props.releaseDate.slice(0, 10);
  return (
    <div className="flex flex-col py-2 rounded-lg m-0">
      <div>
        <img
          src={props.imageUrl}
          alt="Game Logo"
          className="w-full h-[250px] object-cover rounded-md pb-4"
        ></img>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold">{props.title}</div>
          <div className="text-cyan-300">{props.genre}</div>
          <div className="text-gray-400">{formattedDate}</div>
        </div>
        <div className="flex flex-col justify-between gap-6 w-90">
          <button className="   flex items-center justify-center bg-transparent  border-2 border-cyan-300  text-cyan-300 px-4 py-2 text-sm font-bold rounded hover:bg-green-100 w-full h-7">
            View
          </button>

          <button className=" flex items-center justify-center bg-transparent border-2  border-red-200  text-red-200 px-4 py-2 text-sm font-bold rounded hover:bg-green-100 w-full h-7">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
