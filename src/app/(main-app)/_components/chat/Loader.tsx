import { FC } from "react";

const Loader: FC = () => (
  <div className="ml-2 flex items-center gap-1 py-2">
    <div className="bg-primary size-1.5 animate-pulse rounded-full" />
    <div className="bg-primary size-1.5 animate-pulse rounded-full delay-150" />
    <div className="bg-primary size-1.5 animate-pulse rounded-full delay-300" />
  </div>
);

export default Loader