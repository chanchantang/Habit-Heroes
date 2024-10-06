// src/CharacterSprite.js
import React from 'react';
import './CharacterSprite.css'; // Import CSS styles
import 'bootstrap/dist/css/bootstrap.min.css';


const CharacterSprite = () => {
    return (
        <div className='d-flex justify-content-end'>
            <img src={require('./character.gif')} alt="Character" className='img-fluid' style={{width:'30%', transform:'scaleX(-1'}}/>
        </div>
    );
};

export default CharacterSprite;
