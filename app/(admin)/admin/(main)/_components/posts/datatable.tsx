"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  deletePosts,
  movePostsToTrash,
  publishPosts,
  restorePostsFromTrash,
  unPublishPosts,
} from "@/actions/posts";
import BulkActions from "@/components/bulk-actions";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePreview } from "@/hooks/usePreview";
import {
  Archive,
  ArchiveRestore,
  ChevronLeft,
  ChevronRight,
  Recycle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import DeleteSelectedModal from "../delete-selected-modal";
import TrashSelectedModal from "./trash-selected-modal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [deleteSelectedModal, setDeleteSelectedModal] = useState(false);
  const [trashSelectedModal, setTrashSelectedModal] = useState(false);
  const isPreview = usePreview();

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "not-trash";

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  /**
   * Retrieves the IDs of the selected rows from a filtered table.
   * @returns {Array} An array of IDs of the selected rows.
   */
  let selectedRowIds = table
    .getFilteredSelectedRowModel()
    // @ts-ignore
    .rows.map((row) => row.original.id);

  /**
   * Confirms the deletion of the selected rows.
   * If no rows are selected, displays an error toast message.
   * Sets the deleteSelectedModal state to true.
   */
  const confirmDeleteSelected = () => {
    if (selectedRowIds.length < 1) {
      toast.error("Please select at least one row");
      return;
    }
    setDeleteSelectedModal(true);
  };

  /**
   * Confirms the selection of trash by checking if any rows are selected. If no rows are selected,
   * an error toast is displayed. If at least one row is selected, the trash selected modal is set to true.
   */
  const confirmTrashSelected = () => {
    if (selectedRowIds.length < 1) {
      toast.error("Please select at least one row");
      return;
    }
    setTrashSelectedModal(true);
  };

  /**
   * Handles the deletion of selected records.
   */
  const handleDeleteSelectedRecords = async () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      await deletePosts(selectedRowIds);
      setDeleteSelectedModal(false);
      setRowSelection({});
      toast.success("Record(s) deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  /**
   * Handles the action of moving selected records to the trash.
   */
  const handleTrashSelectedRecords = async () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      await movePostsToTrash(selectedRowIds);
      setTrashSelectedModal(false);
      setRowSelection({});
      toast.success("Record(s) moved to trash");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  /**
   * Restores posts from the trash.
   */
  const onRestorePosts = async () => {
    if (selectedRowIds.length < 1) {
      toast.error("Please select at least one row");
      return;
    }
    try {
      toast.loading("Processing...", { duration: 1000 });
      await restorePostsFromTrash(selectedRowIds);
      setRowSelection({});
      toast.success("Record(s) restored");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  /**
   * Handles the process of publishing selected posts.
   * If no rows are selected, displays an error toast message.
   */
  const onPublishPosts = async () => {
    if (selectedRowIds.length < 1) {
      toast.error("Please select at least one row");
      return;
    }
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      toast.loading("Processing...", { duration: 1000 });
      await publishPosts(selectedRowIds);
      setRowSelection({});
      toast.success("Record(s) published");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  /**
   * Handles the process of unpublishing selected posts.
   * If no rows are selected, displays an error toast message.
   */
  const onUnPublishPosts = async () => {
    if (selectedRowIds.length < 1) {
      toast.error("Please select at least one row");
      return;
    }
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      toast.loading("Processing...", { duration: 1000 });
      await unPublishPosts(selectedRowIds);
      setRowSelection({});
      toast.success("Record(s) unpublished");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex-center-between flex-col sm:flex-row gap-2 sm:gap-3 py-4">
        <div className="flex-align-center gap-x-2 w-full">
          <BulkActions
            actions={[
              {
                icon: <ArchiveRestore className="w-4 h-4" />,
                text: "Publish",
                onclick: () => onPublishPosts(),
              },
              {
                icon: <Archive className="w-4 h-4" />,
                text: "UnPublish",
                onclick: () => onUnPublishPosts(),
              },
              {
                icon:
                  filter === "trash" ? (
                    <ArchiveRestore className="w-4 h-4" />
                  ) : (
                    <Recycle className="w-4 h-4" />
                  ),
                text: filter === "trash" ? "Restore" : "Move to Trash",
                onclick: () =>
                  filter === "trash"
                    ? onRestorePosts()
                    : confirmTrashSelected(),
              },
              {
                icon: <FiTrash />,
                text: "Delete Selected",
                onclick: () => confirmDeleteSelected(),
              },
            ]}
          />
          <SearchInput />
        </div>

        <div className="flex-align-center gap-x-2 flex-1 w-full sm:w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto w-full sm:w-fit">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href="/admin/posts/add">+ Add Post</Link>
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Image
                    src="/no-results.png"
                    alt="No Results Image"
                    width={60}
                    height={60}
                    className="mx-auto"
                  />
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-center-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex-align-center space-x-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <DeleteSelectedModal
        deleteSelectedModal={deleteSelectedModal}
        setDeleteSelectedModal={setDeleteSelectedModal}
        handleDeleteSelectedRecords={handleDeleteSelectedRecords}
      />
      <TrashSelectedModal
        trashSelectedModal={trashSelectedModal}
        setTrashSelectedModal={setTrashSelectedModal}
        handleTrashSelectedRecords={handleTrashSelectedRecords}
      />
    </div>
  );
}
