import React from 'react';
import '../../css/Utilities.css';


function BoxBorder(props) {
    return (
        <div className={props.className + ' box-top-right-border'}>
            {props.children}
        </div>
    );
}

export default BoxBorder;