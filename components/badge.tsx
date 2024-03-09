import React from "react";
import classNames from "classnames";

interface BadgeProps {
  label: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  avatar?: JSX.Element;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  avatar,
  className,
}) => {
  const badgeClasses = classNames(
    `flex items-center flex-shrink-0 w-fit px-2 py-0.5 rounded-full text-xs font-medium ${
      className || ""
    } ${avatar ? "pl-1" : ""}`,
    {
      "bg-slate-200 dark:bg-zinc-700 dark:text-zinc-100": variant === "default",
      "bg-blue-200 text-blue-700": variant === "primary",
      "bg-green-500/20 text-green-500": variant === "success",
      "bg-yellow-500/20 text-yellow-500": variant === "warning",
      "bg-red-500/20 text-red-500": variant === "danger",
    }
  );

  return (
    <span className={badgeClasses}>
      {avatar && (
        <div className="mr-1 w-8 h-8 rounded-full grid place-items-center overflow-hidden flex-shrink-0">
          {avatar}
        </div>
      )}
      <div className="flex-shrink-0">{label}</div>
    </span>
  );
};

export default Badge;
