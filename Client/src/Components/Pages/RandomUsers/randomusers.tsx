import { useState, useEffect } from "react";
import axios from "axios";
import "./randomUsers.css";
import UsersRender from "./UsersRender/users";
import Pagination from "../../Layout/Pagination/Paginatios";
import UserSearcher from "./UserSearcher/UserSearcher";

function RandomUsers() {
  type User = {
    picture: string,
    username: string,
    age: number,
    name: string,
    email: string
  };

  type Result = {
    data: User[];
  };
  var [users, setUsers] = useState<User[]>([]);
  var [currentPage, setCurrentPage] = useState<number>(1);
  var [loading, setLoading] = useState<boolean>(true);
  var [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  

  //PAGINATION
  var [resultsNumber, setResultsNumber] = useState(100); 
  var usersPerPage = 10;
  console.log(resultsNumber);

  function setUsersPerPage()
  {
    let lastIndex = usersPerPage * currentPage;
    let firstIndex = lastIndex - usersPerPage;  
    return (filteredUsers.slice(firstIndex, lastIndex));
    
  }
  
  var usersInPage = setUsersPerPage()
  //console.log(usersInPage);

  var paginate = (page:number) => {
    
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  function searchUsers(input : {search:string,filter:string})
  {
    let filterResults = users.filter((value: User) => {
      switch(input.filter)
      {
        case 'name':
          return value.name.toLowerCase().includes(input.search.toLowerCase());
        case 'username':
          return value.username.toLowerCase().includes(input.search.toLowerCase());
        case 'email':
          return value.email.toLowerCase().includes(input.search.toLowerCase());
      }

      return false;
    });

    console.log(filterResults, input);
    setResultsNumber(filterResults.length);
    setFilteredUsers(filterResults);
  }

  useEffect(() => {

    var getUsers = async () => {
      setLoading(true);
      await axios
        .get(`/users/?results=${resultsNumber}`)
        .then((res: Result) => {
          setUsers(res.data);
          setFilteredUsers(res.data);
          setLoading(false);
        });
    };

    getUsers();
  }, []);


 
    

  return (
    <div className="pages-container">
      <UserSearcher searchUsers={searchUsers}/>
      <UsersRender data={usersInPage} loading={loading}/>

      <Pagination
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        paginate = {paginate}
        resultsNumber={resultsNumber}
      />
    </div>
  );
}

export default RandomUsers;
