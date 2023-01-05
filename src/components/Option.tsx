import React from 'react';
import './Option.css'

interface Props {
    title: string,
    description: string
}

const Option: React.FC<Props> = ({title, description}) => {
    return (
        <>
            <div>
                <div className='title'>
                    <h3>
                        {title}
                    </h3>
                </div>
                <div className='description'>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Option;