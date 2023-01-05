import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { priceListI } from '../interfaces/interfaces';
import { variantButtonPress, variantPriceListModals } from '../animations/variants';
import { IoMdClose } from 'react-icons/io'
import './RecipeListHelper.css'
import PaginationRecipeList from './PaginationRecipeList';
import { filterSearch } from '../helpers/binarySearch';

interface Props {
    priceList: priceListI[],
    setShowModalPriceList: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeListHelper: React.FC<Props> = ({ priceList, setShowModalPriceList }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dynamicOptions, setDynamicOptions] = useState<priceListI[] | null>(priceList);
    const [currentPage, setCurrentPage] = useState(1);


    const editTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const dynamicSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result,
            term = e.target.value;

        if (!priceList) return [];
        if (!term) return setDynamicOptions(priceList)

        //result = priceList.filter(ingredient => ingredient.item.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
        result = filterSearch(priceList, term.toLocaleLowerCase(), 'item')

        if (!result.length) {
            result = [{ item: '', unit: '', price: '' }]
        }

        return setDynamicOptions(result)
    }

    return (
        <div className="helper-modal">
            <motion.div
                className='helper-container'
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h5 className='choose-title'>Lista de Precios</h5>
                <div className='helper-details'>
                    <div className='searcher-helper-container'>
                        <h6>Buscar Ingrediente</h6>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                editTerm(e);
                                dynamicSearch(e)
                            }}
                            placeholder='Nombre ingrediente...'
                            disabled={currentPage > 1 ? true : false}
                            className={currentPage > 1 ? 'input-disabled' : 'input-active'}
                        />
                    </div>
                    <table
                    >
                        <thead>
                            <tr>
                                <th>Ingrediente</th>
                                <th>Unidad en gr</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!dynamicOptions ? (
                                <tr style={{ height: '10vh', border: '2px solid #041A33' }}>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                                </tr>
                            ) : (
                                <PaginationRecipeList
                                    ingredients={dynamicOptions}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                <motion.button
                    onClick={() => { setShowModalPriceList(false) }}
                    variants={variantButtonPress}
                    whileTap='click'
                    type='button'
                    role='close'
                    title='Cerrar pestaña'
                >
                    <IoMdClose />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default RecipeListHelper;