import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  simple?: boolean;
  rounded?: boolean;
  icons?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  simple = false,
  rounded = false,
  icons = false,
  className,
}) => {
  const MAX_PAGES_TO_SHOW = 3;

  const generatePages = (): (number | null)[] => {
    if (totalPages <= MAX_PAGES_TO_SHOW) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftLimit = Math.max(
      currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2),
      1
    );
    const rightLimit = Math.min(leftLimit + MAX_PAGES_TO_SHOW - 1, totalPages);

    const pages: (number | null)[] = [];

    if (leftLimit > 2) {
      pages.push(1);
      pages.push(2);
      if (leftLimit > 1) {
        pages.push(null);
      }
    }

    for (let i = leftLimit; i <= rightLimit; i++) {
      pages.push(i);
    }

    if (rightLimit < totalPages) {
      if (rightLimit < totalPages - 1) {
        pages.push(null);
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number): void => {
    onPageChange(page);
  };

  const pages = generatePages();

  return (
    <ul className="flex items-center space-x-2 overflow-x-auto hide-scrollbar">
      <li>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-700 h-8 disabled:opacity-50 ${
            currentPage === 1 ? "cursor-not-allowed hover:bg-slate-200" : ""
          }`}
        >
          {icons ? <FiChevronLeft /> : "Prev"}
        </button>
      </li>

      {!simple && (
        <>
          {pages.map((page, index) => (
            <li key={index}>
              {page === null ? (
                <span>...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(page)}
                  disabled={page === currentPage}
                  className={`w-8 h-8 grid place-items-center rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-700 ${
                    className || ""
                  } ${rounded ? "rounded-full" : ""} ${
                    page === currentPage ? "!bg-brand text-white" : ""
                  }`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
        </>
      )}

      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-700 h-8 disabled:opacity-50 ${
            currentPage === totalPages
              ? "cursor-not-allowed hover:bg-slate-200"
              : ""
          }`}
        >
          {icons ? <FiChevronRight /> : "Next"}
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
