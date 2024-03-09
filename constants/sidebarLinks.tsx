import { BsGrid } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineBriefcase, HiOutlineUsers } from "react-icons/hi2";

export const sidebarLinks = [
  {
    label: "MANAGE",
    links: [
      {
        linkText: "Overview",
        icon: <BsGrid />,
        url: "/admin",
      },
      {
        linkText: "Blog",
        icon: <HiOutlineBriefcase />,
        subLinks: [
          {
            linkText: "All Posts",
            url: "/admin/posts",
          },
          {
            linkText: "Categories",
            url: "/admin/posts/categories",
          },
          {
            linkText: "Collections",
            url: "/admin/posts/collections",
          },
        ],
      },
      {
        linkText: "Users",
        icon: <HiOutlineUsers />,
        url: "/admin/users",
      },
    ],
  },
  {
    label: "PROFILE",
    links: [
      {
        linkText: "Profile",
        icon: <FaRegUserCircle />,
        url: "/admin/account",
      },
    ],
  },
];
