import './users.css'
import UserCard from '../../../Layout/UserCard/usercard';
import Loading from '../../../Layout/Loading/loading';

type User = {
  picture: string,
  username: string,
  age: number,
  name: string,
  email: string
}

  type Result = {
    data: User[],
    loading: boolean;
  };

function UsersRender(props: Result) {

    return ( 
        <div className="user-container">
          {
            props.loading ? <Loading /> :
            (
              props.data.map((user: User, index : number) => {
                      
                return(
                  <UserCard username={user.username} fullname={user.name} picture={user.picture} age={user.age} key={index} email={user.email}/>
                )      
              })
            
            )
                
          }  
        </div>
     );
}

export default UsersRender;