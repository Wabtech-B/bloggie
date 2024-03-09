import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
  isCurrency?: boolean;
  icon: JSX.Element;
}

const StatsCard = ({
  title,
  value,
  isCurrency = false,
  icon,
}: StatsCardProps) => {
  return (
    <div className="border border-border rounded-lg shadow-sm">
      <div className="p-2 flex-align-center gap-x-2 border-b border-b-border">
        <div className="w-8 h-8 rounded-lg border border-border bg-gray-100 dark:bg-gray-900 flex-center-center shrink-0">
          <span className="text-xl">{icon}</span>
        </div>
        <h1 className="uppercase">{title}</h1>
      </div>
      <div className="p-3 flex-align-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          {isCurrency ? `$${value.toFixed(2)}` : value}
        </h1>
        {title === "total sales" && (
          <span className="text-brand ml-2">(successful)</span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
