"use client";

import Avatar from "@/components/avatar";
import UpdateProfileImage from "@/components/update-profile-image";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

const ProfileDetails = () => {
  const user = useCurrentUser();
  const [image, setImage] = useState(user?.image || "");
  const [editModal, setEditModal] = useState(false);

  return (
    <>
      <div className="mt-8 flex-align-center gap-x-4 p-2 md:p-4 border border-border rounded-lg">
        <label
          htmlFor="image"
          className="flex-shrink-0 cursor-pointer"
          onClick={() => setEditModal(true)}
        >
          <div className="relative">
            <div className="z-10 absolute w-8 h-8 rounded-full bg-secondary border-2 border-background  bottom-0 right-0 grid place-items-center cursor-pointer hover:bg-slate-900/80">
              <FiEdit2 />
            </div>
            {user?.image ? (
              <Avatar size="large" src={user?.image} />
            ) : (
              <Avatar size="large" />
            )}
          </div>
        </label>
        <div>
          <h1 className="text-xl">{user?.name}</h1>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>

      {editModal && (
        <UpdateProfileImage
          editModal={editModal}
          setEditModal={setEditModal}
          image={image}
          setImage={setImage}
        />
      )}
    </>
  );
};

export default ProfileDetails;
