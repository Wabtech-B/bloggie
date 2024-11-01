import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "medium",
  className,
}) => {
  const renderInitials = () => {
    if (name) {
      const initials = name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();

      return initials;
    }
    return (
      <svg
        className="svg-icon"
        style={{
          width: size === "small" ? "1.2rem" : "2.2rem",
          height: size === "small" ? "1.2rem" : "2.2rem",
          verticalAlign: "middle",
          fill: "currentColor",
          overflow: "hidden",
        }}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M512 597.994667q108.010667 0 225.002667 46.997333t116.992 123.008l0 85.994667-684.010667 0 0-85.994667q0-76.010667 116.992-123.008t225.002667-46.997333zM512 512q-69.994667 0-120-50.005333t-50.005333-120 50.005333-121.002667 120-51.008 120 51.008 50.005333 121.002667-50.005333 120-120 50.005333z" />
      </svg>
    );
  };

  const avatarClasses = `rounded-full shrink-0 relative ${
    size === "small"
      ? "h-7 w-7 text-sm"
      : size === "medium"
      ? "h-9 w-9 text-2xl"
      : "h-14 w-14 text-3xl"
  } text-white`;

  return (
    <div className={avatarClasses}>
      {src ? (
        <Image
          src={src}
          alt={name || "Avatar"}
          fill
          className="rounded-full object-cover"
        />
      ) : (
        <div
          className={`bg-brand h-full w-full rounded-full grid place-items-center ${
            className || ""
          }`}
        >
          {renderInitials()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
