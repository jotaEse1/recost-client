import React, { useEffect, useState } from 'react';
import AnimatePages from '../animations/AnimatePages'
import Loader from './Loader'
import NavBar from './NavBar';
import './PriceList.css'
import { loginForm, priceListI, registerForm } from '../interfaces/interfaces';
import { motion } from 'framer-motion';
import { variantButtonPress, variantOpacity } from '../animations/variants';
import { Urls } from '../constants/constants';
import PaginationPriceList from './PaginationPriceList';
import { filterSearch } from '../helpers/binarySearch';

interface Props {
    setShowModalAddItem: React.Dispatch<React.SetStateAction<boolean>>,
    setRowDetails: React.Dispatch<React.SetStateAction<priceListI>>,
    priceList: priceListI[],
    setPriceList: React.Dispatch<React.SetStateAction<priceListI[]>>,
    setShowModalDelete: React.Dispatch<React.SetStateAction<boolean>>,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>,
    user: string,
    handleAuth: (action: string, data: registerForm | loginForm) => void,
    loadOption: boolean,
    setLoadOption: React.Dispatch<React.SetStateAction<boolean>>
}

const initialPriceList = [{
    item: '',
    unit: '',
    price: ''
}]

const PriceList: React.FC<Props> = ({ setShowModalAddItem, setRowDetails, priceList, setPriceList, setShowModalDelete, setMsg, setShowModalMsg, user, handleAuth, loadOption, setLoadOption }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dynamicOptions, setDynamicOptions] = useState<priceListI[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalSearcher, setShowModalSearcher] = useState(false)

    const editTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const dynamicSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let result: priceListI[],
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

    //getPriceList
    useEffect(() => {
        if (!user) return;

        fetch(`${Urls.PRICE_LIST}?idUser=${user}`)
            .then(res => res.json())
            .then(data => {
                const { list } = data.response[0];

                if (list.length) {
                    if (list[0].item === undefined && list[0]['_id'] && list.length === 1) {
                        setLoadOption(false)
                        setDynamicOptions(initialPriceList)
                        return setPriceList(initialPriceList)
                    }
                    if (list[0].item === undefined && list[0]['_id'] && list.length > 1) {
                        list.splice(0, 1)

                        setPriceList(list)
                        setDynamicOptions(list)
                        return setLoadOption(false)
                    }

                    setPriceList(list)
                    setDynamicOptions(list)
                    return setLoadOption(false)
                }
                if (!list.length) {
                    setLoadOption(false)
                    setDynamicOptions(initialPriceList)
                    return setPriceList(initialPriceList)
                }
            })
            .catch(() => {
                setMsg('Ocurrió un error. Intente mas tarde.')
                setShowModalMsg(true)
                return setTimeout(() => setShowModalMsg(false), 3000)
            })
    }, [])

    useEffect(() => setDynamicOptions(priceList), [priceList])

    return (
        <AnimatePages>
            <div className='price-list-container'>
                <NavBar
                    handleAuth={handleAuth}
                />
                <div className='price-list-buttons'>
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
                            placeholder='Nombre ingrediente...'
                            disabled={currentPage > 1 ? true : false}
                            className={currentPage > 1 ? 'input-disabled' : 'input-active'}
                        />
                    ) : (
                        <motion.button
                            title='Buscar ingrediente'
                            variants={variantButtonPress}
                            whileTap='click'
                            onClick={() => setTimeout(() => {
                                setShowModalSearcher(true)
                            }, 300)}
                        >Buscar ingrediente</motion.button>
                    )}
                    <motion.button
                        onClick={() => setShowModalAddItem(true)}
                        title='Agregar ingrediente'
                        variants={variantButtonPress}
                        whileTap='click'
                    >Agregar ingrediente</motion.button>
                </div>
                <h4>Lista de Precios</h4>
                {loadOption ? (
                    <Loader />
                ) : (
                    <motion.table>
                        <thead>
                            <tr>
                                <th>Ingrediente</th>
                                <th>Unidad en gr</th>
                                <th>Precio</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!dynamicOptions ? (
                                <tr style={{ height: '10vh', border: '2px solid #041A33' }}>
                                    <td colSpan={4} style={{ textAlign: 'center' }}>No hay ingredientes</td>
                                </tr>
                            ) : (
                                <PaginationPriceList
                                    ingredients={dynamicOptions}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    setRowDetails={setRowDetails}
                                    setShowModalAddItem={setShowModalAddItem}
                                    setShowModalDelete={setShowModalDelete}
                                />
                            )}
                        </tbody>
                    </motion.table>
                )}
            </div>
        </AnimatePages>
    );
};

export default PriceList;