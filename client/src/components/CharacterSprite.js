// src/CharacterSprite.js
import React from 'react';
import './CharacterSprite.css'; // Import CSS styles
import 'bootstrap/dist/css/bootstrap.min.css';


const CharacterSprite = () => {
    return (
        <div className="character-sprite">
            <img src={require('./character.png')} alt="Character" />
        </div>
    );
};

export default CharacterSprite;
