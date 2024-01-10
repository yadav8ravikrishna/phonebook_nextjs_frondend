"use client";
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Contacts from '../showcontacts/page';

const AddContact = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:8000/phonebook/addContact', { name, phoneNumber });
      console.log('Data submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('There was an error submitting the data.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Add Contact</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-600">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
<Contacts/>
    </div>
  );
};

export default AddContact;
