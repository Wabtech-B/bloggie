"use client";

import { sortCollections } from "@/actions/collections";
import NoResults from "@/components/no-results";
import { StrictModeDroppable } from "@/components/strict-mode-droppable";
import Tooltip from "@/components/tooltip";
import { usePreview } from "@/hooks/usePreview";
import { Collection } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { CgLayoutGridSmall } from "react-icons/cg";
import { FiHome, FiSettings } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import AddCollection from "./add-collection";
import CollectionsActions from "./collections-actions";
import SearchCollection from "./search-collections";

interface CollectionListProps {
  items: (Collection & { _count: { posts: number } })[];
}

const CollectionsList = ({ items }: CollectionListProps) => {
  const [collections, setCollections] = useState(items);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const isPreview = usePreview();

  // Update the collection state whenver items change e.g reordering collections
  useEffect(() => {
    setCollections(items);
  }, [items]);

  /**
   * Filters the collections based on the search query.
   * If a search query is provided, it filters the collections by checking if the collection name
   * includes the search query (case-insensitive).
   * If no search query is provided, it returns all the collections.
   * @param {string} search - The search query to filter the collections.
   * @returns {Array} - The filtered collections.
   */
  const filteredCollections = search
    ? collections.filter((collection) =>
        collection.name.toLowerCase().includes(search.toLowerCase())
      )
    : collections;

  /**
   * Handles the logic when an item is dragged and dropped.
   * @param {DropResult} result - The result object containing information about the drag and drop event.
   * @returns None
   */
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    //
    const items = Array.from(collections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedCollections = items.slice(startIndex, endIndex + 1);

    setCollections(items);

    const updatedData = updatedCollections.map((collection) => ({
      id: collection.id,
      position: items.findIndex((item) => item.id === collection.id),
    }));

    onReorder(updatedData);
  };

  /**
   * Reorders collections based on the provided data.
   * @param {Array<{ id: string; position: number }>} data - An array of objects containing the id and position of each collection.
   * @returns None
   */
  const onReorder = async (data: { id: string; position: number }[]) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    startTransition(async () => {
      try {
        await sortCollections(data);
        toast.success("collections reordered!");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute h-full w-full bg-gray-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <ImSpinner2 className="animate-spin h-6 w-6 text-brand" />
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="all-collections" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-3 border rounded-xl"
            >
              <div>
                <div className="flex-center-between gap-3">
                  <h1 className="text-2xl font-bold">All Collections</h1>
                  <AddCollection />
                </div>
                <SearchCollection search={search} setSearch={setSearch} />
                <p className="mt-2">
                  Note: Drag n&apos; drop to reorder collections. This is how
                  they will appear on your page
                </p>
              </div>
              {filteredCollections.map((collection, index) => (
                <Draggable
                  key={collection.id}
                  draggableId={collection.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 bg-secondary rounded-lg my-2 cursor-move flex-center-between"
                    >
                      <div className="flex-align-center">
                        <CgLayoutGridSmall className="text-2xl shrink-0" />
                        <span className="shrink-0 w-[80px] sm:w-fit truncate ml-2">
                          {collection.name}
                        </span>
                        {collection.showOnHomePage && (
                          <Tooltip text="Will show on home page">
                            <div className="py-[2px] rounded-full bg-yellow-200 px-2 text-yellow-700 ml-1 cursor-pointer">
                              <FiHome />
                            </div>
                          </Tooltip>
                        )}
                      </div>
                      <div className="flex-align-center gap-2">
                        <Link
                          href={`/admin/posts/collections/${collection.id}/posts`}
                          className="text-brand hover:underline transition-a shrink-0"
                        >
                          Posts ({collection.postsIDs.length})
                        </Link>
                        <Link
                          href={`/admin/posts/collections/${collection.id}/settings`}
                          className="p-1 rounded-lg hover:bg-slate-300 dark:hover:bg-gray-700"
                        >
                          <FiSettings />
                        </Link>
                        <CollectionsActions id={collection.id} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      {(collections.length < 1 || filteredCollections.length < 1) && (
        <NoResults title="Collections" className="p-3 border rounded-xl mt-2" />
      )}
    </div>
  );
};

export default CollectionsList;
