import React from 'react';
import './cardList.css';
import {MovieCard} from './movieCard';

export const CardList = (props) => {
    return (
        <div className = 'card-list'>
           {props.results.map(each => (
             <MovieCard key = {each.id} each = {each} />
           ))}              
        </div>

    )
      
}
export default CardList