import "./Dog.css";
import {FiRefreshCcw} from "react-icons/fi"
import { useState } from "react";
import axios from "axios";

function Dog() {

    type dogImg = {
        data : {image : string}
    }
    var [dogData, setDogData] = useState('');

    function showDog() {

        axios.get("/dogs").then((res:dogImg) => {
            setDogData(res.data.image);
            if (dogData) {
                console.log(dogData);
            }
        })
    
    }

    return ( 
        <div className="dog-container">       
            {
                dogData && (
                    <img src={"https://random.dog/" + dogData} alt="" className="dog"/>
                )
            }
            <button className="button" onClick={showDog}><FiRefreshCcw/></button>
        </div>
     );
}

export default Dog;