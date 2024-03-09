import { updateCollectionAndPosts } from "@/actions/collections";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { usePreview } from "@/hooks/usePreview";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface CollectionSettingsProps {
  setShowAuthor: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTags: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDescription: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOnHomePage: React.Dispatch<React.SetStateAction<boolean>>;
  showAuthor: boolean;
  showTags: boolean;
  showDescription: boolean;
  displayType: string;
  postsIDs: string[];
  collectionId: string;
  showOnHomePage: boolean;
}

const CollectionSettings = ({
  setShowAuthor,
  setShowTags,
  setShowDescription,
  setShowOnHomePage,
  showAuthor,
  showTags,
  showDescription,
  displayType,
  postsIDs,
  collectionId,
  showOnHomePage,
}: CollectionSettingsProps) => {
  const [isPending, startTransition] = useTransition();
  const isPreview = usePreview();

  /**
   * Saves the changes made to a collection and its associated posts.
   * @returns None
   */
  const onSaveChanges = () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    startTransition(async () => {
      try {
        await updateCollectionAndPosts(collectionId, postsIDs, {
          showAuthor,
          showTags,
          showDescription,
          displayType,
          showOnHomePage,
        });
        toast.success("Settings saved!");
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <section className="p-3 border rounded-xl md:sticky top-5 z-40 mt-4 bg-background">
      <div className="flex-center-between flex-col sm:flex-row gap-4">
        <div className="flex-align-center flex-wrap gap-4 flex-1">
          {/*  Home */}
          <label htmlFor="home" className="flex-align-center cursor-pointer">
            <div className="shrink-0">
              <Switch
                checked={showOnHomePage}
                id="home"
                onCheckedChange={() => setShowOnHomePage(!showOnHomePage)}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <div className="ml-2">Show On Home Page</div>
          </label>
          {/*  Author */}
          <label htmlFor="author" className="flex-align-center cursor-pointer">
            <div className="shrink-0">
              <Switch
                checked={showAuthor}
                id="author"
                onCheckedChange={() => setShowAuthor(!showAuthor)}
              />
            </div>
            <div className="ml-2">Show Author</div>
          </label>
          {/*  Tags */}
          <label htmlFor="tags" className="flex-align-center cursor-pointer">
            <div className="shrink-0">
              <Switch
                checked={showTags}
                id="tags"
                onCheckedChange={() => setShowTags(!showTags)}
              />
            </div>
            <div className="ml-2">Show Tags</div>
          </label>

          {/*  Description */}
          <label
            htmlFor="description"
            className="flex-align-center cursor-pointer"
          >
            <div className="shrink-0">
              <Switch
                checked={showDescription}
                id="description"
                onCheckedChange={() => setShowDescription(!showDescription)}
              />
            </div>
            <div className="ml-2">Show Description</div>
          </label>
        </div>
        <div className="shrink-0 w-full sm:w-fit">
          <Button type="submit" disabled={isPending} onClick={onSaveChanges}>
            {isPending ? (
              <div className="flex-align-center gap-x-2 w-full sm:w-fit">
                <ImSpinner2 className="animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
      <p className="mt-2 text-brand">
        Note: Some of these settings will affect some other collections if they
        share same number of posts.
      </p>
    </section>
  );
};

export default CollectionSettings;
