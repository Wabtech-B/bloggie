import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: Date): string => {
  const dateObject = new Date(dateString);
  const formattedDate = format(dateObject, "dd MMM, yyyy");
  return formattedDate;
};

export const formatRelativeTime = (dateString: Date): string => {
  const dateObject = new Date(dateString);
  const relativeTime = formatDistanceToNow(dateObject, { addSuffix: true });
  return relativeTime;
};

export const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const formatDateTime = (dateObject: Date): string => {
  const formattedDate = format(dateObject, "dd MMM, yyyy");
  return formattedDate;
};

const capitalizeFirstLetter = (str: string): string => {
  return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

export const formatWord = (str: string): string => {
  return str
    .split("_")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};
