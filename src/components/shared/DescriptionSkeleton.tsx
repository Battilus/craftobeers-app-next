import React, {FC} from 'react';

const DescriptionSkeleton:FC = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="flex gap-5">
                <div className="h-32 bg-gray-200 rounded-sm w-48 mb-4"/>
                <div className="w-full flex flex-col">
                    <div className="h-4 bg-gray-200 rounded-sm max-w-[200px] mb-2.5"/>
                    <div className="h-2 bg-gray-200 rounded-sm max-w-[175px] mb-2.5"/>
                </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-sm max-w-[660px] mb-2.5"/>
            <div className="h-2 bg-gray-200 rounded-sm mb-2.5"/>
            <div className="h-2 bg-gray-200 rounded-sm max-w-[630px] mb-3.5"/>
            <div className="h-2 bg-gray-200 rounded-sm max-w-[600px] mb-2.5"/>
            <div className="h-2 bg-gray-200 rounded-sm max-w-[660px] mb-5"/>
            <div className="h-3 bg-gray-200 rounded-sm max-w-[200px] mb-2.5"/>
            <div className="h-2 bg-gray-200 rounded-sm max-w-[250px] mb-2.5"/>
            <div className="h-2 bg-gray-200 rounded-sm max-w-[250px] mb-2.5"/>
            <div className="h-2 bg-gray-200 rounded-sm max-w-[250px]"/>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default DescriptionSkeleton;