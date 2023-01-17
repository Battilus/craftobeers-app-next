import React, {FC} from 'react';
import BeerCanLogo from "../../../public/beer-can-logo.svg";
import DeleteIcon from "../../../public/delete-icon.svg";
import Link from "next/link";

interface IProps {
    beerSearchName?: string
    setBeerSearchName?: (val: string) => void
}

const Header: FC<IProps> = ({beerSearchName, setBeerSearchName}) => {
    return (
        <header className="sticky top-0 left-0 w-screen h-16 bg-matterhorn flex items-center justify-between p-4 z-10 gap-1.5">
            <Link
                className="flex items-center gap-1.5 sm:gap-5"
                href={"/"}
            >
                <BeerCanLogo className="text-white w-6.5 h-9"/>
                <div className="text-white font-semibold uppercase text-sm sm:text-base">Craftobeers</div>
            </Link>
            {setBeerSearchName &&
                <div className="relative">
                    <input
                        className="rounded-sm p-1.5 outline-none w-full max-w-[10rem] sm:max-w-auto sm:min-w-[20rem] text-matterhorn"
                        placeholder="Find your beer"
                        value={beerSearchName}
                        onChange={(event) => setBeerSearchName(event.target.value)}
                    />
                    {beerSearchName &&
                        <button
                            className="absolute right-2.5 top-2.5 text-violet-600 hover:text-red-600"
                            onClick={() => setBeerSearchName("")}
                        >
                            <DeleteIcon className="h-4 w-4"/>
                        </button>}
                </div>}
        </header>
    );
};

export default Header;