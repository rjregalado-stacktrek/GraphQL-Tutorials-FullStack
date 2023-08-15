
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_PERSON, ALL_PERSONS } from '../queries';

const PersonForm = ({setError}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError:(error) => {
        const messages = error.graphQLErrors[0].message
        setError(messages)
    }
  });

  const submit = async (event) => {
    event.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName('');
    setPhone('');
    setStreet('');
    setCity('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Create New</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block">Name</label>
          <input
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label className="block">Phone</label>
          <input
            className="w-full px-4 py-2 border rounded"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          <label className="block">Street</label>
          <input
            className="w-full px-4 py-2 border rounded"
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          <label className="block">City</label>
          <input
            className="w-full px-4 py-2 border rounded"
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add!
        </button>
      </form>
    </div>
  );
};

export default PersonForm;
