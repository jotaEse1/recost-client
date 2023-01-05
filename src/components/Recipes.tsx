import React, { useEffect, useState } from 'react';
import './Recipes.css'
import NavBar from './NavBar';
import AnimatePages from '../animations/AnimatePages';
import { loginForm, priceListI, recipeI, registerForm } from '../interfaces/interfaces';
import { motion } from 'framer-motion';
import { variantButtonPress, variantOpacity } from '../animations/variants';
import { Urls } from '../constants/constants';
import Loader from './Loader';
import PaginationRecipes from './PaginationRecipes';
import {filterSearch} from '../helpers/binarySearch';

interface Props {
    allRecipes: recipeI[] | null,
    setShowModalRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalRecipeInfo: React.Dispatch<React.SetStateAction<boolean>>,
    setRecipe: React.Dispatch<React.SetStateAction<recipeI>>,
    setShowRecipeDetails: React.Dispatch<React.SetStateAction<boolean>>,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    user: string,
    setAllRecipes: React.Dispatch<React.SetStateAction<recipeI[] | null>>,
    handleAuth: (action: string, data: registerForm | loginForm) => void,
    loadOption: boolean,
    setLoadOption: React.Dispatch<React.SetStateAction<boolean>>,
    priceList: priceListI[],
    setMissingIngrRecipe: React.Dispatch<React.SetStateAction<string[]>>,
    setShowModalMissingIngrRecipe: React.Dispatch<React.SetStateAction<boolean>>
}

const Recipes: React.FC<Props> = ({ allRecipes, setShowModalRecipe, setShowModalRecipeInfo, setRecipe, setShowRecipeDetails, setMsg, setShowModalMsg, user, setAllRecipes, handleAuth, loadOption, setLoadOption, priceList, setMissingIngrRecipe, setShowModalMissingIngrRecipe }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dynamicOptions, setDynamicOptions] = useState<recipeI[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalSearcher, setShowModalSearcher] = useState(false)

    const editTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const dynamicSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result: recipeI[],
            term = e.target.value;

        if (!allRecipes) return [];
        if (!term) return setDynamicOptions(allRecipes)

        //result = allRecipes.filter(ingredient => ingredient.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
        result = filterSearch(allRecipes, term.toLocaleLowerCase(), 'title')

        return setDynamicOptions(result)
    }

    //getRecipes
    useEffect(() => {
        if (!user) return;

        fetch(`${Urls.RECIPES}?idUser=${user}`)
            .then(res => res.json())
            .then(data => {
                const { response } = data
                setAllRecipes(response)
                setDynamicOptions(response)
                setLoadOption(false)
            })
            .catch(() => {
                setMsg('Ocurrió un error. Intente mas tarde.')
                setShowModalMsg(true)
                return setTimeout(() => setShowModalMsg(false), 3000)
            })
    }, [])

    useEffect(() => setDynamicOptions(allRecipes), [allRecipes])

    return (
        <AnimatePages>
            <div className='recipe-container'>
                <NavBar
                    handleAuth={handleAuth}
                />
                <h4>Recetas</h4>
                <div className='recipe-main-buttons'>
                    {showModalSearcher ? (
                        <motion.input
                            variants={variantOpacity}
                            initial='hide'
                            animate='visible'
                            type="text"
                            autoComplete='off'
                            value={searchTerm}
                            onChange={(e) => {
                                editTerm(e);
                                dynamicSearch(e)
                            }}
                            placeholder='Nombre receta...'
                            disabled={currentPage > 1 ? true : false}
                            className={currentPage > 1 ? 'input-disabled' : 'input-active'}
                        />
                    ) : (
                        <motion.button
                            variants={variantButtonPress}
                            whileTap='click'
                            onClick={() => setTimeout(() => {
                                setShowModalSearcher(true)
                            }, 300)}
                            title='Nueva Receta'
                        >Buscar Receta</motion.button>
                    )}
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => { setShowModalRecipe(true); setShowModalRecipeInfo(true) }}
                        title='Nueva Receta'
                    >Nueva Receta</motion.button>
                </div>
                {loadOption ? (
                    <Loader />
                ) : (
                    <>
                        {!dynamicOptions ? (<></>) : (
                            <PaginationRecipes
                                recipes={dynamicOptions}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                setRecipe={setRecipe}
                                setShowRecipeDetails={setShowRecipeDetails}
                                setShowModalRecipe={setShowModalRecipe}
                                priceList={priceList}
                                setMissingIngrRecipe={setMissingIngrRecipe}
                                setShowModalMissingIngrRecipe={setShowModalMissingIngrRecipe}
                            />
                        )}
                    </>
                )}
            </div>
        </AnimatePages>
    );
};

export default Recipes;