import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavMobile({ title, href }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='bg-primary text-white p-4 rounded-b-3xl shadow-lg'>
      <div className='flex items-center justify-between relative'>
        <div className='absolute left-0 flex items-center'>
        <button onClick={handleBack}>
            <ArrowLeft />
          </button>
        </div>

        <p className='mx-auto text-center font-semibold'>{title}</p>
      </div>
    </div>
  );
}
