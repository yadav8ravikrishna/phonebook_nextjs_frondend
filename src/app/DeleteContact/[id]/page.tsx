"use client"

import { useParams,useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const DeleteContactPage = () => {
    const router = useRouter();
  const parms = useParams();
  const contactId = parms.id;

  useEffect(() => {
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8000/phonebook/deleteContact/${contactId}`);
        console.log('Contact deleted successfully!');
      } catch (error) {
        console.error(error);
        console.log('There was an error deleting the contact.');
      }
    };

    if (contactId) {
      handleDelete();
      router.push('/');
    }
  }, [contactId,router]);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Deleting Contact...</h1>
      {/* You can add a loader or additional information here */}
    </div>
  );
};

export default DeleteContactPage;