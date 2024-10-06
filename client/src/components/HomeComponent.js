// src/components/HomeComponent.js
import React, { useState, Fragment } from 'react';
import CharacterSprite from './CharacterSprite';
import Input from "./Input";
import List from "./List";

const HomeComponent = () => (
    <div className="container-fluid" style={{height: '100vh'}}>
      <div className="d-flex justify-content-center align-items-center" style={{height:'100%'}}>
        <div className="container">
                    <CharacterSprite />
                    <Input />
                    <List />
        </div>
      </div>
    </div>
);

export default HomeComponent;
