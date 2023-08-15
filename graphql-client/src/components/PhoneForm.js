// import { useState , useEffect } from 'react'
// import { useMutation } from '@apollo/client'

// import { EDIT_NUMBER } from '../queries'

// const PhoneForm = ({ setError }) => {
//   const [name, setName] = useState('')
//   const [phone, setPhone] = useState('')

//   const [ changeNumber, result ] = useMutation(EDIT_NUMBER)

//   useEffect(() => {
//     if (result.data && result.data.editNumber === null) {
//       setError('person not found')
//     }
//   }, [result.data]) // eslint-disable-line 

//   const submit = async (event) => {
//     event.preventDefault()

//     changeNumber({ variables: { name, phone } })

//     setName('')
//     setPhone('')
//   }

//   return (
//     <div>
//       <h2>change number</h2>

//       <form onSubmit={submit}>
//         <div>
//           name <input
//             value={name}
//             onChange={({ target }) => setName(target.value)}
//           />
//         </div>
//         <div>
//           phone <input
//             value={phone}
//             onChange={({ target }) => setPhone(target.value)}
//           />
//         </div>
//         <button type='submit'>change number</button>
//       </form>
//     </div>
//   )
// }

// export default PhoneForm

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_NUMBER } from '../queries';

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found');
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName('');
    setPhone('');
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Change Number</h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            className="w-full px-4 py-2 border rounded"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Change Number
        </button>
      </form>
    </div>
  );
};

export default PhoneForm;
