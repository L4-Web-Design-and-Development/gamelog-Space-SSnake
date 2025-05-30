import { Link } from "@remix-run/react";
import siteLogo from "~/assets/svg/gamelog-logo.svg";
export default function Navbar() {
  return (
    <nav className="container mx-auto flex justify-between items-center p-8">
      <div className="w-25 h-auto">
        <Link to="/">
          <img src={siteLogo} alt="Game Logo"></img>
        </Link>
      </div>

      <div className="flex  gap-10">
        <Link to="/add-game">Games</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </div>
    </nav>
  );
}
