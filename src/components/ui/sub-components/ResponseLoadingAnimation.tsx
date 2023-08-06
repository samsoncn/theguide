import React from "react";

const ResponseLoadingAnimation = () => {
  return (
    // <div className="flex items-center space-x-2">
    //   <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 animate-pulse"></div>
    //   <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 animate-pulse delay-75"></div>
    //   <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 animate-pulse delay-150"></div>
    // </div>
    <div className="shadow p-2 mx-auto w-[50vw]">
      <div className="animate-pulse flex space-x-2">
        <div className="rounded-full bg-slate-500 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 w-full bg-slate-500 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 w-full bg-slate-500 rounded col-span-2"></div>
              <div className="h-2 w-full bg-slate-500 rounded col-span-1"></div>
              <div className="h-2 w-full bg-slate-500 rounded col-span-3"></div>
              <div className="h-2 w-full bg-slate-500 rounded col-span-1"></div>
              <div className="h-2 w-full bg-slate-500 rounded col-span-2"></div>
            </div>
            <div className="h-2 bg-slate-500 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseLoadingAnimation;
