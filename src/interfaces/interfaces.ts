//auth
export interface registerForm {
    username: string,
    email: string,
    password: string
}

export interface loginForm {
    email: string,
    password: string
}

//pricelist
export interface priceListI {
    item: string,
    unit: number | string,
    price: number | string,
    idUser?: string,
    _id?: string
}

//budget
export interface budgetI {
    title: string,
    idUser: string,
    description: string,
    ingredients?: ingredientI[] | null,
    total?: string,
    _id?: string
}

export interface budgetListI {
    title: string,
    description: string,
    idUser?: string
}

export interface ingredientI {
    ingredient: string,
    amount: number,
    cost: number,
    idUser?: string,
    _id?: string,
    budgetTitle?: string
    budgetDescription?: string
}

//recipes
export interface recipeI {
    title: string,
    idUser: string,
    description: string,
    ingredients?: recipeIngrI[] | null,
    _id?: string
}

export interface recipeIngrI {
    ingredient: string,
    amount: number,
    idUser?: string,
    cost?: number,
    _id?: string,
    recipeTitle?: string
    recipeDescription?: string
}


