import { getPostsBySearch } from "@/actions/home/posts";
import HomeBreadcrumbs from "@/components/home-breadcrumbs";
import NoResults from "@/components/no-results";
import CardOne from "@/components/posts/post-cards/card-one";
import PostPagination from "../_components/post-pagination";

type SearchParams = {
  searchParams: {
    q: string;
    page: string;
    limit: string;
  };
};

const SearchPage = async ({ searchParams }: SearchParams) => {
  const params = searchParams;
  const search = (params.q && params.q.toLowerCase()) || "";
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 8;
  const { posts, pages, total } = await getPostsBySearch({
    search,
    page,
    limit,
  });

  return (
    <div className="max-w-7xl mx-auto px-3">
      <div className="my-2 flex justify-end">
        <HomeBreadcrumbs separator="/" />
      </div>
      <div className="flex-center-between flex-col sm:flex-row gap-3">
        <h1 className="text-xl md:text-3xl font-bold mt-3">
          RESULTS ({total}) for {decodeURI(search)}
        </h1>

        {posts.length > 0 && <PostPagination pages={pages} />}
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {posts.map((post) => (
          <CardOne
            key={post.id}
            post={post}
            showAuthor={false}
            showTags={false}
            showDescription={true}
          />
        ))}
      </div>
      {posts.length < 1 && (
        <NoResults title="Posts Found" className="p-2 border rounded-xl" />
      )}
    </div>
  );
};

export default SearchPage;
