import './usercard.css';

type UserCardProps = {
    username: string,
    fullname: string,
    age: number,
    picture: string,
    email: string
}

function UserCard(props : UserCardProps) {
    return ( 
    <div className='user-card'>
        
        <div className='user-main'>
            <img src={props.picture} alt="" className='user-img'/>
            <h1 className='user-name'>{props.username}</h1>
        </div>

        <div className='user-secundary'>
            <p><span>Nome:</span> {props.fullname}</p>
            <p><span>email: </span> {props.email}</p>
            <p><span>Idade: </span> {props.age}</p>
        </div>
        
    </div> 
    );
}

export default UserCard;