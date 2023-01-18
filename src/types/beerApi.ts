export type BeerVolume = {
    value: number,
    unit: string
}

export type BeerMethod = {
    mash_temp: [
        {
            temp: BeerVolume,
            duration: string | number | null
        }
    ],
    fermentation: {
        temp: BeerVolume
    },
    twist: string | number | null
}

export type BeerIngredientMalt = {
    name: string,
    amount: BeerVolume
}

export type BeerIngredientHop = BeerIngredientMalt & {
    add: string,
    attribute: string
}

export type BeerIngredients = {
    malt: BeerIngredientMalt[],
    hops: BeerIngredientHop[],
    yeast: string
}

export type BeerDescription = {
    id: number | string,
    name: string,
    tagline: string,
    first_brewed: string,
    description: string,
    image_url: string | null,
    abv: number | null,
    ibu: number | null,
    target_fg: number | null,
    target_og: number | null,
    ebc: number | null,
    srm: number | null,
    ph: number | null,
    attenuation_level: number | null,
    volume: BeerVolume,
    boil_volume: BeerVolume,
    method: BeerMethod,
    ingredients: BeerIngredients,
    food_pairing: string[],
    brewers_tips: string,
    contributed_by: string,
}

export type BeerResponseError = {
    error: string,
    message: string,
    statusCode: string | number,
}