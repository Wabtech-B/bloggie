/* eslint-disable @next/next/no-img-element */
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import PostActions from "./post-actions";
import PublishPost from "./publish-post";
import Link from "next/link";
import Tooltip from "@/components/tooltip";
import Image from "next/image";

type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  coverImage: string;
  published: boolean;
  trashed: boolean;
  comments: number;
  views: number;
  date: Date;
};

const Columns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="!border-gray-300 dark:!border-gray-700"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="!border-gray-300 dark:!border-gray-700"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div
          className="flex-center-between py-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex-align-center gap-x-2">
          <div className="relative w-[40px] h-[40px]  shrink-0">
            <Image
              src={row.original.coverImage}
              alt={row.original.title}
              fill
              className="rounded-md object-cover"
            />
          </div>
          {row.original.trashed ? (
            <Tooltip text="In trash">
              <Link
                href={`/${row.original.slug}`}
                className="text-red-500 hover:underline"
              >
                {row.original.title}
              </Link>
            </Tooltip>
          ) : (
            <Link
              href={`/${row.original.slug}`}
              className="text-brand hover:underline"
            >
              {row.original.title}
            </Link>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div
          className="flex-center-between py-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <div
          className="flex-center-between py-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <div
          className="flex-center-between py-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comments
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <div
          className="flex-center-between py-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "published",
    header: ({ column }) => {
      return (
        <div
          className="flex-center-between py-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.published ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "publish",
    header: ({ column }) => {
      return (
        <div
          className="flex-center-between py-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publish
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.published ? (
            <PublishPost id={row.original.id} isPublished={false} />
          ) : (
            <PublishPost id={row.original.id} isPublished={true} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          className="flex-center-between py-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Published
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <span>{formatDate(row.original.date)}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <PostActions id={row.original.id} />,
  },
];

export default Columns;
