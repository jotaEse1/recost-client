import React, { useState } from 'react';
import './Tooltip.css'

interface Props {
    text: string
}

const Tooltip: React.FC<Props> = ({children, text}) => {
    const [show, setShow] = useState(false);

    return (
        <div className='tooltip-container'>
            <div className={show? 'tooltip-box visible' : 'tooltip-box'} >
                {text}
                <span className='tooltip-arrow'/>
            </div>
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
        </div>
    );
};

export default Tooltip;