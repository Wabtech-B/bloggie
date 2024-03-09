"use client";

import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import { useState } from "react";

import NoResults from "@/components/no-results";

import SimpleGrid from "@/components/posts/simple-grid";
import SimpleGridImage from "@/components/posts/simple-grid-image";
import SimpleGridScrollable from "@/components/posts/simple-grid-scrollable";
import SimpleGridScrollableImage from "@/components/posts/simple-grid-scrollable-image";
import SimpleTwoGrid from "@/components/posts/simple-two-grid";
import ThreeGrid from "@/components/posts/three-grid";
import TwoGrid from "@/components/posts/two-grid";
import TwoImageGrid from "@/components/posts/two-image-grid";
import { Author } from "@/types";
import CollectionSettings from "./collections/collection-settings";

interface CardsListProps {
  posts: (Post & {
    category: { name: string };
    author: Author;
  })[];
  display: string;
  collectionId: string;
  showOnHome: boolean;
}

const CardsList = ({
  posts,
  display,
  collectionId,
  showOnHome,
}: CardsListProps) => {
  const [displayType, setDisplayType] = useState(display || "simple_grid");
  const [showOnHomePage, setShowOnHomePage] = useState(showOnHome);
  const [showAuthor, setShowAuthor] = useState(
    posts.every((post) => post.showAuthor)
  );
  const [showTags, setShowTags] = useState(
    posts.every((post) => post.showTags)
  );
  const [showDescription, setShowDescription] = useState(
    posts.every((post) => post.showDescription)
  );

  return (
    <>
      <CollectionSettings
        setShowAuthor={setShowAuthor}
        setShowTags={setShowTags}
        setShowDescription={setShowDescription}
        showAuthor={showAuthor}
        showTags={showTags}
        setShowOnHomePage={setShowOnHomePage}
        showDescription={showDescription}
        postsIDs={posts.map((post) => post.id)}
        displayType={displayType}
        collectionId={collectionId}
        showOnHomePage={showOnHomePage}
      />

      {posts.length < 1 && (
        <NoResults
          title="Posts: Add Some Posts to view the display types"
          className="p-3 border rounded-xl mt-2"
        />
      )}

      {/* Simple Grid */}
      {posts.length > 0 && (
        <>
          <div
            className={cn(
              "mt-4 border rounded-xl p-2 sm:p-4",
              displayType === "simple_grid" && "border-2 border-brand"
            )}
          >
            <label
              htmlFor="simple_grid"
              className="block flex-align-center cursor-pointer"
            >
              <input
                type="radio"
                name="displayType"
                value="simple_grid"
                onChange={(e) => setDisplayType(e.target.value)}
                checked={displayType === "simple_grid"}
                id="simple_grid"
              />
              <h1 className="ml-2 text-lg">Simple Grid</h1>
            </label>
            <div className="mt-3">
              <SimpleGrid
                posts={posts}
                showAuthor={showAuthor}
                showTags={showTags}
                showDescription={showDescription}
              />
            </div>
          </div>

          {/* Simple Image Grid */}
          <div
            className={cn(
              "mt-4 border rounded-xl p-2 sm:p-4",
              displayType === "simple_image_grid" && "border-2 border-brand"
            )}
          >
            <label
              htmlFor="simple_image_grid"
              className="block flex-align-center cursor-pointer"
            >
              <input
                type="radio"
                name="displayType"
                value="simple_image_grid"
                onChange={(e) => setDisplayType(e.target.value)}
                checked={displayType === "simple_image_grid"}
                id="simple_image_grid"
              />
              <h1 className="ml-2 text-lg">Simple Image Grid</h1>
            </label>
            <div className="mt-3">
              <SimpleGridImage
                posts={posts}
                showAuthor={showAuthor}
                showTags={showTags}
                showDescription={showDescription}
              />
            </div>
          </div>
          {/* Simple Scrollable Grid */}
          <div
            className={cn(
              "mt-4 border rounded-xl p-2 sm:p-4",
              displayType === "simple_scrollable_grid" &&
                "border-2 border-brand"
            )}
          >
            <label
              htmlFor="simple_scrollable_grid"
              className="block flex-align-center cursor-pointer"
            >
              <input
                type="radio"
                name="displayType"
                value="simple_scrollable_grid"
                onChange={(e) => setDisplayType(e.target.value)}
                checked={displayType === "simple_scrollable_grid"}
                id="simple_scrollable_grid"
              />
              <h1 className="ml-2 text-lg">Simple Scrollable Grid</h1>
            </label>
            <div className="mt-3">
              <SimpleGridScrollable
                posts={posts}
                showAuthor={showAuthor}
                showTags={showTags}
                showDescription={showDescription}
              />
            </div>
          </div>
          {/* Simple Scrollable Image Grid */}
          <div
            className={cn(
              "mt-4 border rounded-xl p-2 sm:p-4",
              displayType === "simple_scrollable_image_grid" &&
                "border-2 border-brand"
            )}
          >
            <label
              htmlFor="simple_scrollable_image_grid"
              className="block flex-align-center cursor-pointer"
            >
              <input
                type="radio"
                name="displayType"
                value="simple_scrollable_image_grid"
                onChange={(e) => setDisplayType(e.target.value)}
                checked={displayType === "simple_scrollable_image_grid"}
                id="simple_scrollable_image_grid"
              />
              <h1 className="ml-2 text-lg">Simple Scrollable Image Grid</h1>
            </label>
            <div className="mt-3">
              <SimpleGridScrollableImage
                posts={posts}
                showAuthor={showAuthor}
                showTags={showTags}
                showDescription={showDescription}
              />
            </div>
          </div>

          {/* Simple Two Grid */}
          <div
            className={cn(
              "mt-4 border rounded-xl p-2 sm:p-4",
              displayType === "simple_two_grid" && "border-2 border-brand"
            )}
          >
            <label
              htmlFor="simple_two_grid"
              className="block flex-align-center cursor-pointer"
            >
              <input
                type="radio"
                name="displayType"
                value="simple_two_grid"
                onChange={(e) => setDisplayType(e.target.value)}
                checked={displayType === "simple_two_grid"}
                id="simple_two_grid"
              />
              <h1 className="ml-2 text-lg">Two-Simple-Grid</h1>
            </label>
            <div className="mt-3">
              <SimpleTwoGrid
                posts={posts}
                showAuthor={showAuthor}
                showDescription={showDescription}
              />
            </div>
          </div>

          {/* Two Image Grid */}
          <div
            className={cn(
              "mt-4 border rounded-xl p-2 sm:p-4",
              displayType === "two_image_grid" && "border-2 border-brand"
            )}
          >
            <label
              htmlFor="two_image_grid"
              className="block flex-align-center cursor-pointer"
            >
              <input
                type="radio"
                name="displayType"
                value="two_image_grid"
                onChange={(e) => setDisplayType(e.target.value)}
                checked={displayType === "two_image_grid"}
                id="two_image_grid"
              />
              <h1 className="ml-2 text-lg">Two-Image-Grid</h1>
            </label>
            <div className="mt-3">
              <TwoImageGrid
                posts={posts}
                showAuthor={showAuthor}
                showTags={showTags}
                showDescription={showDescription}
              />
            </div>
          </div>

          {/* Two Grid */}
          <div
            className={cn(
              "mt-4 border rounded-xl p-2 sm:p-4",
              displayType === "two_grid" && "border-2 border-brand"
            )}
          >
            <label
              htmlFor="two_grid"
              className="block flex-align-center cursor-pointer"
            >
              <input
                type="radio"
                name="displayType"
                value="two_grid"
                onChange={(e) => setDisplayType(e.target.value)}
                checked={displayType === "two_grid"}
                id="two_grid"
              />
              <h1 className="ml-2 text-lg">Two-Grid</h1>
            </label>
            <div className="mt-3">
              <TwoGrid
                posts={posts}
                showAuthor={showAuthor}
                showTags={showTags}
              />
            </div>
          </div>
          {/* Three Grid */}
          <div
            className={cn(
              "mt-4 border rounded-xl p-2 sm:p-4",
              displayType === "three_grid" && "border-2 border-brand"
            )}
          >
            <label
              htmlFor="three_grid"
              className="block flex-align-center cursor-pointer"
            >
              <input
                type="radio"
                name="displayType"
                value="three_grid"
                onChange={(e) => setDisplayType(e.target.value)}
                checked={displayType === "three_grid"}
                id="three_grid"
              />
              <h1 className="ml-2 text-lg">Three-Grid</h1>
            </label>
            <div className="mt-3">
              <ThreeGrid
                posts={posts}
                showAuthor={showAuthor}
                showTags={showTags}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardsList;
