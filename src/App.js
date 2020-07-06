import React from "react";
import { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {

  const [repositoriesList, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      title: 'Angular',
      url: 'http://www.google.com',
      techs: ['Angular', 'Java']
    })

    setRepositories([...repositoriesList, repository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    //if the repository id is different from the repository id passed, keep on the list
    setRepositories(repositoriesList.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositoriesList.map(repository => 
          <li key={repository.id}>
            
            <ul>
              <li><a href={repository.url} target="_blank">{repository.title}</a></li>
              <li>Likes: {repository.likes}</li>
            </ul>
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
