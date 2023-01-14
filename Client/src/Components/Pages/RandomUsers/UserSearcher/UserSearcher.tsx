import { useState } from 'react';
import './UserSearcher.css';
import {FiSearch as Search} from "react-icons/fi";

interface userProps
{
    searchUsers: ((input : {search: string, filter: string}) => void)
}

function UserSearcher(props:userProps) {
    
    var [searchValue, setSearchValue] = useState({
        search: '',
        filter: 'name'
    });

    function change(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)
    {
        let newValue = {
            ...searchValue,
            [e.target.name]: e.target.value
        };
        setSearchValue(newValue);
        props.searchUsers(newValue)
    }

    return ( 
        <form className='searcher' >
            <div className='search-container'>
                <input type="text" placeholder='Buscar Usuários' name='search' onChange={change}/>
                <button type='submit'><Search /></button>
            </div>
            <div className='select-container'>
                <label htmlFor="filter">Filtrar por:</label>
                <select name="filter" id="filter" onChange={change}>
                    <option value="name">nome</option>
                    <option value="username" defaultChecked>username</option>
                    <option value="email">e-mail</option>
                </select>
            </div>
        </form>
     );
}

export default UserSearcher;