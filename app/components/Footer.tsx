import logo from "~/assets/svg/gamelog-logo.svg";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-6 mt-20 rounded-t-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex flex-col items-start gap-4">
          <img src={logo} alt="GameLog Logo" className="h-22 w-auto" />
          <div className="flex gap-4 text-cyan-400 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-cyan-300" />
            <FaInstagram className="cursor-pointer hover:text-cyan-300" />
            <FaXTwitter className="cursor-pointer hover:text-cyan-300" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-16 text-sm">
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold">Site</h3>
            <span>Games</span>
            <span>About</span>
            <span>Blog</span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold">Support</h3>
            <span>Legal</span>
            <span>Contact Us</span>
            <span>Privacy Policy</span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold">Follow Us</h3>
            <span>Facebook</span>
            <span>Twitter</span>
            <span>Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
