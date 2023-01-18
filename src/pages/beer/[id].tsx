import React, {useEffect, useMemo} from 'react';
import {GetServerSideProps, NextPage} from "next";
import PageWrapper from "@/components/PageWrapper";
import {BeerDescription, BeerResponseError} from "@/types/beerApi";
import {PageMeta} from "@/types";
import Image from "next/image";
import {fetchBeerById, fetchBeersByName} from "@/features/api";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {useRouter} from 'next/router';
import Header from "@/components/layouts/Header";
import BeerCanLogo from "../../../public/beer-can-logo.svg";
import DescriptionSkeleton from "@/components/shared/DescriptionSkeleton";

interface IProps {
    meta?: PageMeta
}

const Beer: NextPage<IProps> = ({meta}) => {

    const router = useRouter();
    const beerID = router.query?.id as string;

    const {
        isSuccess,
        data,
        isLoading,
    } = useQuery<BeerDescription | BeerResponseError>(
        ["getBeerDescription", beerID],
        () => fetchBeerById(beerID),
        {
            enabled: beerID.length > 0,
            staleTime: Infinity
        }
    );

    const beerDescription = useMemo(() => data && "tagline" in (data as BeerDescription) ? data as BeerDescription : null,[data]);
    const beerResponseError = useMemo(() => data && "statusCode" in (data as BeerResponseError) ? data as BeerResponseError : null,[data]);

    useEffect(() => {
        if (beerResponseError && beerResponseError.statusCode === 404) {
            router.push("/404");
        }
    }, [beerResponseError])

    return (
        <PageWrapper meta={meta}>
            <Header/>
            <div className="w-full flex flex-col items-center p-4">
                <div className="w-full max-w-[720px] flex flex-col gap-6">
                    {isLoading && <DescriptionSkeleton/>}
                    {(isSuccess && beerDescription) &&
                        <>
                            <div className="flex gap-5">
                                <div className="w-24 sm:w-36">
                                    {beerDescription.image_url ?
                                        <Image
                                            className="object-contain"
                                            src={beerDescription.image_url}
                                            alt="beer description name"
                                            width={50}
                                            height={200}
                                            priority
                                        /> :
                                        <BeerCanLogo className="text-matterhorn w-16"/>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="font-semibold text-2xl">{beerDescription.name}</div>
                                    <div className="text-sm">{beerDescription.tagline}</div>
                                </div>
                            </div>
                            <div className="w-full text-justify">{beerDescription.description}</div>
                            <div className="text-sm">Beer Alcohol Content: <span className="font-semibold">{` ${beerDescription.abv}%`}</span></div>
                            <div className="flex flex-col gap-3">
                                <div className="font-semibold">Food pairing:</div>
                                {beerDescription.food_pairing.map((pairing, index) =>
                                    <div key={pairing} className="text-sm ml-1.5">{`${index + 1}: ${pairing}`}</div>)
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </PageWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const queryClient = new QueryClient();
    await queryClient.fetchQuery(['findBeerById', params?.id], () => fetchBeersByName(params?.id as string))

    return {
        props: {
            meta: {title: "PunkApi Beer App", description: "PunkApi beer description page"},
            dehydratedState: dehydrate(queryClient),
        }
    }
}

export default Beer;