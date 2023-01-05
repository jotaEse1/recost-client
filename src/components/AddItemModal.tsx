import React, { useState } from 'react';
import './AddItemModal.css'
import { IoMdClose } from 'react-icons/io'
import { priceListI } from '../interfaces/interfaces';
import { motion } from 'framer-motion'
import { variantOpacity, variantPriceListModals, variantButtonPress } from '../animations/variants'

interface Props {
    setShowModalAddItem: React.Dispatch<React.SetStateAction<boolean>>,
    rowDetails: priceListI,
    setRowDetails: React.Dispatch<React.SetStateAction<priceListI>>,
    handleList: (data: priceListI, type: string) => void,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setShowModalMsg: React.Dispatch<React.SetStateAction<boolean>>
}

const initialState = {
    item: '',
    unit: '',
    price: ''
}

const AddItemModal: React.FC<Props> = ({ setShowModalAddItem, rowDetails, setRowDetails, handleList, setMsg, setShowModalMsg }) => {
    const [form, setForm] = useState(rowDetails);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!form.item || !form.unit || !form.price) {
            setMsg('Casilleros incompletos')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }
        if (!Number(form.unit)) {
            setMsg('Unidad en gr debe ser un número')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }
        if (!Number(form.price)) {
            setMsg('Precio debe ser un número')
            setShowModalMsg(true)
            return setTimeout(() => { setShowModalMsg(false); setMsg('') }, 3000)
        }

        if(rowDetails.item && rowDetails.unit && rowDetails.price){
            //update
            setTimeout(() => {
                handleList(form, 'update')
            }, 500);
            setShowModalAddItem(false)
            setForm(initialState)
            return setRowDetails(initialState)    
        }

        setTimeout(() => {
            handleList(form, 'new')
        }, 500);
        setShowModalAddItem(false)
        setForm(initialState)
        setRowDetails(initialState)
    }

    return (
        <motion.div
            className='modal-container'
            variants={variantOpacity}
            initial='hide'
            animate='visible'
            exit='exit'
        >
            <motion.form
                autoComplete='off'
                onSubmit={handleSubmit}
                variants={variantPriceListModals}
            >
                {(rowDetails.item && rowDetails.unit && rowDetails.price) ? (
                    <h4>Modificar Ingrediente</h4>
                ) : (
                    <h4>Agregar Ingrediente</h4>
                )}
                <div>
                    <label htmlFor="item">Ingrediente</label>
                    <input
                        type='text'
                        name='item'
                        id='item'
                        required
                        value={form.item}
                        onChange={handleForm}
                        disabled={(rowDetails.item && rowDetails.unit && rowDetails.price)? true : false}
                    />
                    <label htmlFor="unit">Unidad en gr</label>
                    <input
                        type='number'
                        min='0'
                        step='.01'
                        name='unit'
                        id='unit'
                        required
                        value={form.unit}
                        onChange={handleForm}
                    />
                    <label htmlFor="price">Precio</label>
                    <input
                        type='number'
                        min='0'
                        step='.01'
                        name='price'
                        id='price'
                        required
                        value={form.price}
                        onChange={handleForm}
                    />
                </div>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='submit'
                >
                    {(rowDetails.item && rowDetails.unit && rowDetails.price) ? (
                        'Modificar'
                    ) : (
                        'Agregar'
                    )}
                </motion.button>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='button'
                    name='close'
                    onClick={() => { setShowModalAddItem(false); setRowDetails(initialState) }}
                ><IoMdClose /></motion.button>
            </motion.form>
        </motion.div>
    );
};

export default AddItemModal;