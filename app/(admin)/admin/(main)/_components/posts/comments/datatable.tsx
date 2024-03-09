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

import { approveComments, deleteComments } from "@/actions/comments";
import BulkActions from "@/components/bulk-actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Verified } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import DeleteSelectedModal from "../../delete-selected-modal";
import { usePreview } from "@/hooks/usePreview";
import SearchInput from "@/components/search-input";

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
  const router = useRouter();
  const isPreview = usePreview();

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
   * Handles the deletion of selected records.
   */
  const handleDeleteSelectedRecords = async () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      await deleteComments(selectedRowIds);
      setDeleteSelectedModal(false);
      setRowSelection({});
      router.refresh();
      toast.success("Record(s) deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  /**
   * Handles the approval of comments.
   * If no rows are selected, displays an error toast message.
   */
  const onApprove = async () => {
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
      await approveComments(selectedRowIds);
      setRowSelection({});
      router.refresh();
      toast.success("Comment(s) approved");
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
                icon: <FiTrash />,
                text: "Delete Selected",
                onclick: () => confirmDeleteSelected(),
              },
              {
                icon: <Verified className="text-muted-foreground w-4 h-4" />,
                text: "Approve",
                onclick: () => onApprove(),
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
    </div>
  );
}
