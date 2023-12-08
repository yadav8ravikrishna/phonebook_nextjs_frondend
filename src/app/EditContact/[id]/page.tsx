"use client"
import { useParams,useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditContactPage = () => {
  const router = useRouter();
  const params  = useParams();
  const contactId = params.id;

  const [contact, setContact] = useState({ name: '', phoneNumber: '' });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/phonebook/findContact/${contactId}`);
        setContact(response.data.contact);
      } catch (error) {
        console.error(error);
      }
    };

    if (contactId !== undefined) {
      fetchContact();
    }
  }, [contactId]);

  const handleEdit = async () => {

    try {
      await axios.patch(`http://localhost:8000/phonebook/editContact/${contactId}`, contact);
      alert('Contact updated successfully!');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('There was an error updating the contact.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Edit Contact</h1>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-600">
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={contact.phoneNumber}
          onChange={(e) => setContact({ ...contact, phoneNumber: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
        />
      </div>

      <button onClick={handleEdit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        Update Contact
      </button>
    </div>
  );
};

export default EditContactPage;
