import axios from "axios";
import {BeerDescription, BeerResponseError} from "@/types/beerApi";

export const fetchBeersByName = async (beerName: string, page?: number | string) => axios
    .get(`https://api.punkapi.com/v2/beers?&per_page=10${beerName ? `&beer_name=${beerName}` : ""}${page? `&page=${page}` : ""}`)
    .then(({data}) => data as BeerDescription[]);

export const fetchBeerById = async (id: string | number) => axios
    .get(`https://api.punkapi.com/v2/beers/${id}`)
    .then(({data}) => data[0] as BeerDescription)
    .catch(({response}) => response.data as BeerResponseError);