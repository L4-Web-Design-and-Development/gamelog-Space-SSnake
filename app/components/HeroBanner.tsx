import { Link } from "@remix-run/react";
import bannerImg from "~/assets/svg/BG_picture.jpg"; // путь к твоему изображению

export default function HeroBanner() {
  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center rounded-xl overflow-hidden mb-10"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-start px-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Track Your
          <br />
          <span className="text-cyan-400">Gaming</span>
          <br />
          Journey with Ease
        </h1>
        <Link
          to="/add-game"
          className="mt-6 inline-block border-2 border-cyan-400 text-cyan-400 px-6 py-2 rounded-md hover:bg-cyan-500 hover:text-white transition duration-200"
        >
          Add Game
        </Link>
      </div>
    </div>
  );
}
