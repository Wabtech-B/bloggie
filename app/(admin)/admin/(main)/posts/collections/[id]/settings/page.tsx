import { getCollectionPosts } from "@/actions/collections";
import GoBack from "@/components/goback";
import CardsList from "../../../../_components/posts/cards-list";

const Settings = async ({ params }: { params: { id: string } }) => {
  const collection = await getCollectionPosts(params.id);
  return (
    <div>
      <GoBack />
      <h1 className="text-3xl font-bold mt-4">
        Display Type for <span className="font-bold">{collection?.name}</span>
      </h1>
      <p className="mt-2">
        Choose how you want your collection to be displayed
      </p>
      <CardsList
        posts={collection?.posts!}
        display={collection?.displayType!}
        collectionId={params.id}
        showOnHome={collection?.showOnHomePage!}
      />
    </div>
  );
};

export default Settings;
