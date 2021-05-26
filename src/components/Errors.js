import React from 'react';

const Errors = ({message, clear}) => {
    return(<div>
        <p>{message}</p>
        <button onClick={clear}>Clear</button>
    </div>)
}

export default Errors;