import React, {FC} from 'react';
import {BeerDescription} from "@/types/beerApi";
import Image from "next/image";
import Link from "next/link";
import {limitStr} from "@/features/utils";
import BeerCanLogo from "../../../public/beer-can-logo.svg";

interface IProps {
    beerDescription: BeerDescription
}

const BeerCard: FC<IProps> = ({beerDescription}) => {
    return (
        <div className="flex items-center bg-white border rounded-sm shadow-md md:max-w-xl hover:bg-gray-100">
            <div className="relative">
                <div className="px-2 h-52 s:h-32 rounded-t-sm rounded-l-sm w-32 s:w-28 md:rounded-none">
                    {beerDescription.image_url ?
                        <Image
                            className="object-contain object-center"
                            src={beerDescription.image_url}
                            alt="beer description preview"
                            layout={"fill"}
                            priority
                        /> :
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <BeerCanLogo className="text-matterhorn w-16"/>
                        </div>}
                </div>
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{beerDescription.name}</h5>
                <p className="mb-3 font-normal text-gray-700">
                    {limitStr(beerDescription.description, 140)}
                </p>
                <Link className="text-violet-600 w-24" href={`/beer/${beerDescription.id}`}>Show more</Link>
            </div>
        </div>
    );
};

export default BeerCard;