import { publishPost } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import { usePreview } from "@/hooks/usePreview";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const PublishPost = ({
  id,
  isPublished,
}: {
  id: string;
  isPublished: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const isPreview = usePreview();

  /**
   * Handles publishing of a post
   */
  const onSubmit = () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    startTransition(async () => {
      try {
        await publishPost(id, isPublished);
        toast.success(`Post ${isPublished ? "published" : "unpublished"}`);
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div>
      <Button variant="secondary" disabled={isPending} onClick={onSubmit}>
        {isPending ? (
          <div className="flex-align-center gap-x-2">
            <ImSpinner2 className="animate-spin" />
            <span>{isPublished ? "Publishing..." : "UnPublishing..."}</span>
          </div>
        ) : isPublished ? (
          "Publish"
        ) : (
          "UnPublish"
        )}
      </Button>
    </div>
  );
};

export default PublishPost;
