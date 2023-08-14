import { gql, useQuery } from '@apollo/client';
import Persons from './components/Persons';

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const App = () => {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Persons persons={result.data.allPersons} />
    </div>
  );
};

export default App;
