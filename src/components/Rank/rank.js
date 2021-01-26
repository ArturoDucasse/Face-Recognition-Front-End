import React from 'react';

const Rank = ({userName, userEntries}) => {
    return (
        <div>
            <div className='white f3'>
                {`${userName}, your current entries are...`}
            </div>
            <div className='white f1'>
                {`${userEntries}`}
            </div>
        </div>
    );
}
export default Rank;