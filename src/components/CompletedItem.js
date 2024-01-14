import React from 'react';

const CompletedItem = ({theme, items}) =>{
    return(
        <div className='bg-red'>
            <h1>{theme}</h1>
            <h2>{items}</h2>
        </div>
    );
};

export default CompletedItem;