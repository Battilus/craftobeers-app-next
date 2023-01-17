import PageWrapper from "@/components/PageWrapper";
import {GetServerSideProps, NextPage} from 'next';
import {BeerDescription} from "@/types/beerApi";
import {PageMeta} from "@/types";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {useDebouncedInput} from "@/features/hooks/useDebouncedInput";
import {fetchBeersByName} from '@/features/api';
import {useMemo, useState} from "react";
import BeerCard from "@/components/shared/BeerCard";
import Spinner from "@/components/shared/Spinner";
import Header from "@/components/layouts/Header";
import Pagination from "@/components/shared/Pagination";
import {useRouter} from "next/router";
import Link from "next/link";

interface IProps {
    meta?: PageMeta
}

const Home: NextPage<IProps> = ({meta}) => {
    const [beerName, setBeerName, searchBeerName] = useDebouncedInput("");
    const [page, setPage] = useState<number>(1);

    const {query} = useRouter();

    const {
        isLoading,
        // isError,
        isSuccess,
        data: foundBeerList
    } = useQuery<BeerDescription[]>(
        ["searchBeer", searchBeerName, page],
        () => fetchBeersByName(searchBeerName, page),
        {
            enabled: searchBeerName.length > 0 && beerName === searchBeerName
        }
    );

    useMemo(() => {
        setBeerName(query.beer_name as string || "");
        setPage(Number(query.page as string || 1));
    }, [query])

    return (
        <PageWrapper meta={meta}>
            <Header beerSearchName={beerName} setBeerSearchName={setBeerName}/>
            <div className="w-full h-full flex items-center justify-center p-4">
                {isLoading ?
                    <div className="h-full w-full flex flex-col items-center justify-center h-[80vh]">
                        <Spinner/>
                    </div> :
                    foundBeerList?.length ?
                        <div className="flex flex-col gap-6">
                            {foundBeerList.map(beer =>
                                <BeerCard
                                    key={beer.id}
                                    beerDescription={beer}
                                />)
                            }
                            <div className="w-full flex items-center justify-center">
                                <Pagination
                                    page={page}
                                    setPage={setPage}
                                    disableNext={foundBeerList?.length < 10}
                                    objectsLength={foundBeerList?.length}
                                />
                            </div>
                        </div> :
                        <div className="h-full text-matterhorn flex flex-col items-center justify-center h-[80vh]">
                            {beerName && isSuccess ?
                                <div className="text-xl">Not found</div> :
                                <>
                                    <div className="font-semibold text-base sm:text-xl mb-2">Welcome to the Craftobeers App!)</div>
                                    <div className="text-sm sm:text-lg mb-6 w-52 sm:w-full text-center">Use the search to find the description of the beer you are
                                        looking for.
                                    </div>
                                    <div className="text-sm">Based on <Link href={"https://punkapi.com/documentation/v2"} className="text-violet-600">Punk Api</Link></div>
                                </>}
                        </div>
                }
            </div>
        </PageWrapper>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {

    const beerName = query?.beer_name as string || "";
    const page = query?.page || 1;

    const queryClient = new QueryClient();

    await queryClient.fetchQuery(['findBeer', beerName, page], () => fetchBeersByName(beerName, page as number));

    return {
        props: {
            meta: {title: "PunkApi Beer App", description: "PunkApi beer filter page"},
            hydratedBeer: dehydrate(queryClient),
        }
    }
}
export default Home;
