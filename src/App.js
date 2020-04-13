import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

import faker from 'faker';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data.repositories);
    })
  },[])

  

  async function handleAddRepository() {

    const response = await api.post('repositories',{
      title: faker.company.companyName(),
      url: faker.internet.url(),
      techs: [
        faker.hacker.adjective(),
        faker.hacker.adjective(),
        faker.hacker.adjective()
    ]
    });

    const repository = response.data;
    
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const {status} = await api.delete(`repositories/${id}`);

    
      if(status === 204) {
        const repo = repositories.filter( rp => rp.id !== id);
        setRepositories(repo)
      }
      
  }

  return (
    
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button> 
        </li>)}
      </ul>
      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </>
  
  )
}

export default App;
