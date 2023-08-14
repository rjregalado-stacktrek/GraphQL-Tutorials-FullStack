import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const Person = ({ person, onClose }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">

      <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
      
      <div className="text-gray-600 mb-2">
        {person.address.street}, {person.address.city}
      </div>

      <div className="text-gray-600">{person.phone}</div>
      
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Close
      </button>

    </div>

  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
  return (
    <div className="mt-4">
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    </div>
  
  )
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Persons</h2>
      <div className="flex grid grid-cols-3 gap-4">
        {persons.map((p) => (
          <div key={p.name} className="bg-white shadow-md p-4 rounded-md">
            <p className="text-lg font-semibold">{p.name}</p>
            <p className="text-gray-600">{p.phone}</p>
            <button
              className="bg-blue-500 hover:bg-blue-800 text-white font-semibold mt-2 py-2 px-2 rounded"
              onClick={() => setNameToSearch(p.name)}
            >
              show address
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Persons;


