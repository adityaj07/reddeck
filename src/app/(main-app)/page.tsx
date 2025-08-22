"use client";

import { type FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="space-y-6">
      {/* <Separator className="!my-3 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-2" /> */}

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-5">
        <div className="lg:col-span-7 mb-5">
          <div className="space-y-6 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
          </div>
        </div>

        <div className="lg:col-span-3"></div>
      </div>
    </div>
  );
};

export default page;
