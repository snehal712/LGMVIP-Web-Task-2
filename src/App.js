import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function UserComponent(props){
  return(
    <div class="card" style={{width: '18rem'}}>
      <img src={props.avatar} class="card-img-top" alt="user image"/>
      <div class="card-body">
        <h5 class="card-title">{props.first_name} {props.last_name}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">id: {props.id}</li>
        <li class="list-group-item">Email: {props.email}</li>
      </ul>
    </div>
    );
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
   const getUsers = (page) => {
      setLoading(true);
      fetch('https://reqres.in/api/users?page=' + page) // Replace with your actual API endpoint
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

  // useEffect(() => {
  //   // Call the API when the component mounts
  //   fetch('https://reqres.in/api/users?page=1') // Replace with your actual API endpoint
  //     .then((response) => response.json())
  //     .then(data => {setUsers(data.data); setLoading(false);})
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div className="App">
      <header>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
      </header>
      <body>
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Domino&#39;s
            </a>
            <button class="btn btn-outline-success" onClick={() => getUsers('1')}>Get users</button>
          </div>
        </nav>

        {loading ? (<div>Click Get users to load data</div>) : (
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {users.map((user) => (
                <div className="col" key={user.id}>
                  <UserComponent
                    avatar={user.avatar}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    id={user.id}
                    email={user.email}
                  />
                </div>
              ))}
            </div>
          </div> 
        )}
      </body>
    </div>
  );
}


export default App;
