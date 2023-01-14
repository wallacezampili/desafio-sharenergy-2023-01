import { useEffect, useState } from 'react';
import './message.css';

type messageProps = {
    text: string,
    type: string,
    destroy: () => void

}

function Message(props:messageProps) {

    var [visibility, setVisibility] = useState(true);

    useEffect(() => {

        if(!props.text)
        {
            return;
        }

        setVisibility(true);
        

        setTimeout(() => {

            props.destroy()
            setVisibility(false);
            

        },3000);
    }, [props])

    return ( 
        <>
           { 
            visibility && (
                    <div className={`message ${props.type}`}>
                        {props.text}
                    </div>
                )
            }
        </>
    );
}

export default Message;
