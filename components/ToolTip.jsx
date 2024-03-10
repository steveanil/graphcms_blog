/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable max-len */
/* eslint-disable quotes */
import { useEffect, useState } from "react";

export const ToolTip = ({ message, children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  // Only render the tooltip if the message is not empty or undefined
  if (!message) {
    return <span>{children}</span>;
  }

  return (
    <span className="group relative">
      {children}
      <span className="absolute flex top-10 scale-0 z-10 transition-all rounded-md bg-gray-600 p-1 text-xs text-white transform translate-x-1/2 group-hover:scale-100">
        {message}
      </span>
    </span>
  );
};
