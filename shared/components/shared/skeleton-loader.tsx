import { FaSpinner } from "react-icons/fa6";

export const SkeletonLoader = () => (
    <div className="w-full h-[300px] animate-pulse">
        <div className="h-full flex items-center justify-center">
            <FaSpinner className="animate-spin" />
        </div>
    </div>
);