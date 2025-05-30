import { Form, Link } from "@remix-run/react";

interface GameCardProps {
  id: string;
  title: string;
  releaseDate: string;
  genre: string;
  imageUrl: string;
}

export default function GameCard(props: GameCardProps) {
  const formattedDate = props.releaseDate.slice(0, 10);
  return (
    <div className="flex flex-col py-2 rounded-lg m-0">
      <Link
        to={`/edit-game/${props.id}`}
        className="relative h-72 overflow-hidden"
      >
        <img
          src={props.imageUrl}
          alt="Game Logo"
          className="w-full h-[250px] object-cover rounded-md pb-4"
        ></img>
      </Link>
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

          <Form action={`/delete-game/${props.id}`} method="post">
            <button
              type="submit"
              className="border-2 border-red-300 text-red-300 p-2 rounded-md transition hover:bg-red-50/10 w-full"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
