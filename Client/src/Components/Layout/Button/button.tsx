import { MouseEventHandler } from 'react';
import './button.css';

type ButtonProps = {
    clickHandler: MouseEventHandler,
    text: string
}

function Button(props : ButtonProps) {
    return ( 
        <button className='btn' onClick={props.clickHandler}>
            {props.text}
        </button>
     );
}

export default Button;