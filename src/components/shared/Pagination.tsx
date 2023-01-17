import React, {FC} from 'react';

interface IProps {
    page: number
    setPage: (val: number) => void
    disableNext?: boolean
    objectsLength?: number
}
const Pagination:FC<IProps> = ({page, setPage, disableNext, objectsLength}) => {
    const setPrevPage = () => {
        if (page > 1) setPage(page - 1);
    }

    const setNextPage = () => {
        if (page >= 1 && !disableNext) setPage(page + 1);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="inline-flex mt-2 xs:mt-0 mb-2">
                <button
                    disabled={page < 2}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-l ${page > 1 ? "bg-matterhorn hover:bg-gray-900" : "bg-gray-500"}`}
                    onClick={setPrevPage}
                >
                    Prev
                </button>
                <button
                    disabled={disableNext}
                    className={`px-4 py-2 text-sm font-medium text-white border-0 border-l border-gray-700 rounded-r ${!disableNext ? "bg-matterhorn hover:bg-gray-900" : "bg-gray-500"}`}
                    onClick={setNextPage}
                >
                    Next
                </button>
            </div>
            <span className="text-sm text-gray-700 mb-1">Page <span className="font-semibold text-gray-900">{page}</span></span>
            {objectsLength && <span className="text-sm text-gray-700">Showing <span className="font-semibold text-gray-900">{objectsLength}</span> Entries</span>}
        </div>
    );
};

export default Pagination;