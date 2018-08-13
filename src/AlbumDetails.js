import React from 'react';

const AlbumDetails = (props) => {
    return <div>
        <img src={props.image} alt={props.title} />
        <h3>{props.title}</h3>
        <span>{props.price}</span>
        <br />
        <a target="_blank" href={props.link}>Check out on iTunes</a>
    </div>
}

export default AlbumDetails;
