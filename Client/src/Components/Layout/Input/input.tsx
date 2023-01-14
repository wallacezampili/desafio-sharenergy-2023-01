import { ChangeEventHandler } from "react";
import "./input.css";

type InputData = {
    type: string,
    placeholder: string,
    defaultValue: string,
    name: string,
    handleChange: ChangeEventHandler
}

function Input(props:InputData) {

    let title = props.name[0].toUpperCase() + props.name.slice(1);

    return ( 
        <div className="input-container">
            <label htmlFor={props.name}>{title}:</label>
            <input type={props.type} placeholder={props.placeholder} defaultValue={props.defaultValue} name={props.name} onChange={props.handleChange}/>
        </div>
     );
}

export default Input;