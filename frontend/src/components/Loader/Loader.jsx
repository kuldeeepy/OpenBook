import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-700"></div>
    </div>
  );
}

export default Loader;
