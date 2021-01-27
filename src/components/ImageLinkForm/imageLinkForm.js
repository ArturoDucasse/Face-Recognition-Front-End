import React from 'react';
import './imageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                This magic tool will detect a face in your pictures, give it a try!
                <br></br> If there are multiple faces, it will only detect one!
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-2'>
                    <input 
                        className='f4 pa2 w-70 center' 
                        type ='tex' 
                        onChange={onInputChange}
                    />
                    <button 
                        className='grow f4 link ph3 pv2 dib white bg-gray'
                        onClick={onButtonSubmit}
                        >Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;