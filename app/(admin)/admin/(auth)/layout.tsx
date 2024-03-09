import Image from "next/image";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex-center-center">
      <div className="max-w-md w-full mx-auto px-2 sm:px-3">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            className="mx-auto object-contain mb-4"
            width={80}
            height={80}
          />
        </div>
        <div className="p-2 sm:p-4 border shadow-sm rounded-lg mb-4">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;
