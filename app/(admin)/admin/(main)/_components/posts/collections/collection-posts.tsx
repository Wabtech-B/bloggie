"use client";

import { movePostToCollection } from "@/actions/collections";
import Badge from "@/components/badge";
import GoBack from "@/components/goback";
import NoResults from "@/components/no-results";
import { StrictModeDroppable } from "@/components/strict-mode-droppable";
import useMediaQuery from "@/hooks/useMediaQuery";
import { usePreview } from "@/hooks/usePreview";
import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { CollectionsPosts, TCollection } from "@/types";
import { CheckCheckIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { CgLayoutGridSmall } from "react-icons/cg";
import { FiEye } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import RemovePostFromCollection from "./remove-post-from-collection";
import SearchInput from "./search-input";
import Sort from "./sort";

interface CollectionPostsProps {
  items: CollectionsPosts;
  collection: TCollection;
}

const CollectionPosts = ({ items, collection }: CollectionPostsProps) => {
  const [state, setState] = useState<CollectionsPosts>(items);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const { isCollapsed } = useSidebar();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isPreview = usePreview();

  // Update the state whenver items change e.g dradding posts to a collection
  useEffect(() => {
    setState(items);
  }, [items]);

  /**
   * Filters the posts based on the search keyword.
   * If a search keyword is provided, it filters the posts by checking if the title or category name
   * contains the search keyword (case-insensitive).
   * If no search keyword is provided, it returns all the posts.
   * @param {string} search - The search keyword to filter the posts.
   * @returns {Array} - An array of filtered posts.
   */
  const filteredPosts = search
    ? state.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.category.name.toLowerCase().includes(search.toLowerCase())
      )
    : state.posts;

  /**
   * Handles the drag end event when an item is dropped.
   * @param {DropResult} result - The result object containing information about the drag and drop operation.
   * @returns None
   */
  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCollectionId = source.droppableId;
    const destinationCollectionId = destination.droppableId;

    if (sourceCollectionId === destinationCollectionId) {
      // Dragging posts within the same list
      return;
    } else {
      // Move between "All Posts" & "Collection"
      const movedPost = state.posts.find(
        (post) => post.id === result.draggableId
      );

      // Check if moving from a collection to "All Posts"
      if (destinationCollectionId === "all-posts") {
        toast.error("Opps! Not allowed");
        return;
      }

      // SERVER ACTION TO MOVE POSTS TO COLLECTION
      startTransition(async () => {
        if (isPreview) {
          toast.error("Please, this is a demo. Can't modify our database");
          return;
        }
        try {
          await movePostToCollection(movedPost!.id, destinationCollectionId);
          toast.success("Post moved to collection");
        } catch (error: any) {
          toast.error(error.message);
        }
      });

      // Update the state with new collections
      const updatedCollections = state.collections.map((collection) => {
        if (collection.id === destinationCollectionId) {
          return {
            ...collection,
            posts: [...collection.posts, movedPost],
            postsIDs: [...collection.postsIDs, movedPost?.id],
          };
        } else {
          return collection;
        }
      });

      setState((prevState) => ({
        ...prevState,
        collections: updatedCollections as TCollection[],
      }));
    }
  };

  return (
    <div>
      <GoBack />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative mt-4">
          {isPending && (
            <div className="absolute h-full w-full bg-gray-500/20 top-0 right-0 rounded-m flex items-center justify-center">
              <ImSpinner2 className="animate-spin h-6 w-6 text-brand" />
            </div>
          )}
          {/* Column for All Posts */}
          <StrictModeDroppable droppableId="all-posts" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-3 border rounded-xl"
              >
                <h1 className="text-2xl font-bold">All Posts</h1>
                <p>
                  You can only drag posts from &quot;All Posts&quot; to &quot;A
                  collection&quot; and not vice versa. Also there is no
                  reordering of posts in both lists
                </p>
                <div className="flex-align-center gap-x-2">
                  <SearchInput search={search} setSearch={setSearch} />
                  <Sort />
                </div>
                {filteredPosts.map((post, index) => (
                  <Draggable key={post.id} draggableId={post.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 bg-secondary rounded-lg my-2 cursor-move flex-center-between"
                      >
                        <div className="flex-align-center gap-3">
                          <CgLayoutGridSmall className="text-2xl shrink-0" />
                          <div className="relative w-10 h-8 hidden md:block">
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover rounded-md shrink-0 "
                            />
                          </div>
                          <div
                            className={cn(
                              "flex md:items-center gap-2 flex-col xl:flex-row",
                              !isCollapsed &&
                                isDesktop &&
                                "!flex-col !items-start"
                            )}
                          >
                            <p className="shrink-0 line-clamp-1 xl:line-clamp-none xl:w-[250px] xl:truncate">
                              {post.title}
                            </p>
                            <div className="flex-align-center gap-x-1">
                              <div className="flex-align-center gap-x-1 rounded-full bg-yellow-200 px-2 text-yellow-700">
                                <FiEye />
                                <span className="text-sm">{post.views}</span>
                              </div>
                              <div className="shrink-0">
                                <Badge label={post.category.name} />
                              </div>
                            </div>
                          </div>
                        </div>
                        {collection.posts.some(
                          (collectionPost) => collectionPost.id === post.id
                        ) && (
                          <CheckCheckIcon className="w-4 h-4 text-green-600 shrink-0" />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {filteredPosts.length < 1 && <NoResults title="Posts" />}
              </div>
            )}
          </StrictModeDroppable>

          {/* Column for Posts in Collection */}
          <StrictModeDroppable droppableId={collection.id} direction="vertical">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "p-3 border rounded-xl flex-1",
                  snapshot.isDraggingOver && " border-brand border-dashed"
                )}
              >
                <h1 className="text-2xl mb-1 font-bold">{collection.name}</h1>
                {collection.posts.map((post, index) => (
                  <Draggable
                    key={post.id}
                    draggableId={`${post.id}${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 bg-secondary rounded-lg my-2 cursor-move flex-center-between"
                      >
                        <div className="flex-align-center gap-3">
                          <CgLayoutGridSmall className="text-2xl shrink-0" />
                          <div className="relative w-10 h-8 hidden md:block">
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover rounded-md shrink-0 "
                            />
                          </div>
                          <div
                            className={cn(
                              "flex md:items-center gap-2 flex-col xl:flex-row",
                              !isCollapsed &&
                                isDesktop &&
                                "!flex-col !items-start"
                            )}
                          >
                            <p className="shrink-0 line-clamp-1 xl:line-clamp-none xl:w-[250px] xl:truncate">
                              {post.title}
                            </p>
                            <div className="flex-align-center gap-x-1">
                              <div className="flex-align-center gap-x-1 rounded-full bg-yellow-200 px-2 text-yellow-700">
                                <FiEye />
                                <span className="text-sm">{post.views}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <RemovePostFromCollection
                          postId={post.id}
                          collectionId={collection.id}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {collection.posts.length < 1 && (
                  <NoResults title="Posts" className="flex-center-center" />
                )}
              </div>
            )}
          </StrictModeDroppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default CollectionPosts;
