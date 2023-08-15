import { useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';

import { ALL_PERSONS } from './queries';


const Notify = ({errorMessage})=>{
  if(!errorMessage) {
    return null 
  }
  return (
    <div style={{color:'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(()=>{
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Notify errorMessage={errorMessage}/>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify}/>

    </div>
  );
};

export default App;
