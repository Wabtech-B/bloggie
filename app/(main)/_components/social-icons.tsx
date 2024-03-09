import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const SocialIcons = () => {
  return (
    <>
      <div className="flex-align-center gap-x-2 !text-white">
        <a
          href="https://www.facebook.com"
          target="_blank"
          referrerPolicy="no-referrer"
          className="p-2 bg-blue-600 rounded-lg hover:scale-110 transition-a"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          referrerPolicy="no-referrer"
          className="p-2 bg-cyan-600 rounded-lg hover:scale-110 transition-a"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          referrerPolicy="no-referrer"
          className="p-2 bg-[#2197BD] rounded-lg hover:scale-110 transition-a"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          referrerPolicy="no-referrer"
          className="p-2 bg-pink-600 rounded-lg hover:scale-110 transition-a"
        >
          <FaInstagram />
        </a>
      </div>
    </>
  );
};

export default SocialIcons;
