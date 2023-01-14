import './Cat.css';
import axios from "axios";
import Input from '../../Layout/Input/input';
import Button from '../../Layout/Button/button';
import { ChangeEvent, useState } from 'react';
import errorImg from "../../../img/404.jpg"

function Cat() {

    
    
    var [httpCode, setHttpCode] = useState('');
    var [catImg, setImg] = useState('');

    type catResponse = {
        data : {
            code : string,
            Error : {
                status : Number
            }
        }
    }


    var getCat = function ()
    {       
        axios.get(`/cats/${httpCode}`).then((res:catResponse) => {
            if(res.data.Error)
            {
                setImg(errorImg);
                return;
            }
            setImg(`https://http.cat/${res.data.code}`);
            
        })
    }

    var updateCode = function(e:ChangeEvent<HTMLInputElement>)
    {
        setHttpCode(e.target.value);
    }


    return ( 
        <div className='cat-container'>
            <Input type='text' placeholder='Digite um status http' defaultValue='' name='statusCode' handleChange={updateCode}/>
            <Button text='Enviar' clickHandler={getCat}/>
            {catImg && (
                <img src={catImg} alt='' className='img'/>
            )}

        </div>
    );
}

export default Cat;