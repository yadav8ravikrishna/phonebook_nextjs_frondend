"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Contact {
  _id: string;
  name: string;
  phoneNumber: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/phonebook/getAllContacts');
        const { contacts } = response.data;
        setContacts(contacts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContacts();
  }, [contacts]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>

      <ul className="list-disc pl-6">
        {contacts.map((contact) => (
          <li key={contact._id} className="mb-4">
            <strong>Name:</strong> {contact.name}
            <br />
            <strong>Phone Number:</strong> {contact.phoneNumber}
            <br />
            <Link className="text-blue-500 mr-4" href={`/EditContact/${contact._id}`}>Edit</Link>
            
            <Link className="text-red-500" href={`/DeleteContact/${contact._id}`}>Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;

