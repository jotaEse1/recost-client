import React from 'react';
import { motion } from 'framer-motion';
import './MissingIngredients.css'
import { IoMdClose } from 'react-icons/io'
import { variantButtonPress, variantPriceListModals } from '../animations/variants';

interface Props {
    missingIngrRecipe: string[],
    setShowModalMissingIngrRecipe: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeMissingIngr: React.FC<Props> = ({missingIngrRecipe, setShowModalMissingIngrRecipe}) => {
    return (
        <div className='missing-modal'>
            <motion.div 
                className='missing-content'
                variants={variantPriceListModals}
                initial='hide'
                animate='visible'
                exit='exit'    
            >
                <h5>!Faltan ingredientes!</h5>
                <p>Para saber el costo de esta receta correctamente debe agregar los siguientes ingredientes a la lista de precios:</p>
                <div className='missing-list'>
                    {missingIngrRecipe.map((ingr, i) => 
                        <div className='missing-ingredient' key={i} role='list'>
                            <p>{ingr}</p>
                        </div>    
                    )}
                </div>
                <motion.button
                    variants={variantButtonPress}
                    whileTap='click'
                    type='button'
                    name='close'
                    role='close'
                    onClick={() => setShowModalMissingIngrRecipe(false)}
                ><IoMdClose /></motion.button>
            </motion.div>
        </div>
    )
};

export default RecipeMissingIngr;