import {
  getCollection,
  getCollections,
  getCollectionsPosts,
} from "@/actions/collections";
import { TCollection, TPost } from "@/types";
import CollectionPosts from "../../../../_components/posts/collections/collection-posts";

type CollectionPost = {
  collections: TCollection[];
  posts: TPost[];
};

const Posts = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { sort: string; search: string };
}) => {
  const collection = await getCollection(params.id);
  const collections = await getCollections(searchParams.search);
  const posts = await getCollectionsPosts(searchParams.sort);

  const items: CollectionPost = {
    collections,
    posts,
  };

  return (
    <div>
      <CollectionPosts collection={collection!} items={items} />
    </div>
  );
};

export default Posts;
