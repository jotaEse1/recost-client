import React, { useEffect, useState } from 'react';
import AnimatePages from '../animations/AnimatePages';
import NavBar from './NavBar';
import Budget from './Budget';
import './Budgets.css'
import { budgetI, loginForm, registerForm } from '../interfaces/interfaces'
import { motion } from 'framer-motion';
import { variantButtonPress, variantOpacity } from '../animations/variants';
import { Urls } from '../constants/constants';
import Loader from './Loader';
import PaginationBudgets from './PaginationBudgets';
import { filterSearch } from '../helpers/binarySearch';

interface Props {
    setShowModalBudget: React.Dispatch<React.SetStateAction<boolean>>,
    allBudgets: budgetI[] | null,
    setShowBudgetDetails: React.Dispatch<React.SetStateAction<boolean>>,
    setBudget: React.Dispatch<React.SetStateAction<budgetI>>,
    setShowModalBudgetInfo: React.Dispatch<React.SetStateAction<boolean>>,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    user: string,
    setAllBudgets: React.Dispatch<React.SetStateAction<budgetI[] | null>>,
    handleAuth: (action: string, data: registerForm | loginForm) => void,
    loadOption: boolean,
    setLoadOption: React.Dispatch<React.SetStateAction<boolean>>
}

const Budgets: React.FC<Props> = ({ setShowModalBudget, allBudgets, setShowBudgetDetails, setBudget, setShowModalBudgetInfo, setMsg, setShowModalMsg, user, setAllBudgets, handleAuth, loadOption, setLoadOption }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dynamicOptions, setDynamicOptions] = useState<budgetI[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalSearcher, setShowModalSearcher] = useState(false)

    const editTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const dynamicSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result: budgetI[],
            term = e.target.value;

        if (!allBudgets) return [];
        if (!term) return setDynamicOptions(allBudgets)

        //result = allBudgets.filter(ingredient => ingredient.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
        result = filterSearch(allBudgets, term.toLocaleLowerCase(), 'title')

        return setDynamicOptions(result)
    }

    //getBudgets
    useEffect(() => {
        if (!user) return;

        fetch(`${Urls.BUDGET}?idUser=${user}`)
            .then(res => res.json())
            .then(data => {
                const { response } = data
                setAllBudgets(response)
                setLoadOption(false)
            })
            .catch(() => {
                setMsg('Ocurrió un error. Intente mas tarde.')
                setShowModalMsg(true)
                return setTimeout(() => setShowModalMsg(false), 3000)
            })
    }, [])

    useEffect(() => setDynamicOptions(allBudgets), [allBudgets])

    return (
        <AnimatePages>
            <div className='budget-container'>
                <NavBar
                    handleAuth={handleAuth}
                />
                <h4>Presupuestos</h4>
                <div className='budget-main-buttons'>
                    {showModalSearcher ? (
                        <motion.input
                            variants={variantOpacity}
                            initial='hide'
                            animate='visible'
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                editTerm(e);
                                dynamicSearch(e)
                            }}
                            placeholder='Nombre presupuesto...'
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
                            title='Nuevo Presupuesto'
                        >Buscar Presupuesto</motion.button>
                    )}
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => { setShowModalBudget(true); setShowModalBudgetInfo(true) }}
                        title='Nuevo Presupuesto'
                    >Nuevo Presupuesto</motion.button>
                </div>
                {loadOption ? (
                    <Loader />
                ) : (
                    <>
                        {!dynamicOptions ? (<></>) : (
                            <PaginationBudgets
                                budgets={dynamicOptions}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                setShowBudgetDetails={setShowBudgetDetails}
                                setBudget={setBudget}
                                setShowModalBudget={setShowModalBudget}
                            />
                        )}
                    </>
                )}
            </div>
        </AnimatePages>
    );
};

export default Budgets;