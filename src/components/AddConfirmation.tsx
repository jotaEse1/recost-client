import React from 'react';
import { IoMdClose } from 'react-icons/io'
import {MdCheck} from 'react-icons/md'
import { motion } from 'framer-motion';
import { variantPriceListModals, variantButtonPress } from '../animations/variants'


interface Props {
    setShowModalConfirmation: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModalAddItem: React.Dispatch<React.SetStateAction<boolean>>
}

const AddConfirmation: React.FC<Props> = ({setShowModalConfirmation, setShowModalAddItem}) => {
    return (
        <div 
            className='budget-confirmation-modal'
        >
            <motion.div
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'
            >
                <h4>¡Este ingrediente no está en la lista de precios!</h4>
                <p>¿Quieres agregarlo?</p>
                <div className='budget-confirmation-modal-buttons'>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setShowModalConfirmation(false)
                            setShowModalAddItem(true)
                        }}
                        title='Agregar'
                        role='add'
                    >
                        <MdCheck />
                    </motion.button>
                    <motion.button
                        variants={variantButtonPress}
                        whileTap='click'
                        onClick={() => {
                            setShowModalConfirmation(false)
                        }}
                        title='Cancelar'
                        role='cancel'
                    >
                        <IoMdClose />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default AddConfirmation;