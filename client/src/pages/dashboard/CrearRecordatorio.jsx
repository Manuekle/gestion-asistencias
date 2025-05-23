import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReminder } from '../../actions/reminderActions';
import { Notification01Icon } from 'hugeicons-react';
import { Button } from '@heroui/react';

function CrearRecordatorio() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [formData, setFormData] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setFormData(true);
    dispatch(createReminder({ title, description, date }))
      .then(() => {
        setFormData(false);
        navigate('/dashboard/reminders', { replace: true });
      })
      .catch((error) => {
        setFormData(false);
        console.error('Error creating reminder:', error);
      });
  };

  return (
    <div className="grid gap-6">
      <section className="col-span-3 flex flex-col rounded-xl bg-white border shadow-sm px-4 sm:px-6 pt-4">
        <div className="flex flex-col pb-4">
          <h2 className="font-bold text-sm sm:text-md">Crear Recordatorio</h2>
          <p className="text-gray-500 text-xs">
            Crea un nuevo recordatorio para los estudiantes
          </p>
        </div>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              className="bg-blue-600 text-white rounded-lg px-6 py-2 text-xs font-bold shadow-sm hover:shadow-md flex items-center gap-2"
              isLoading={formData}
            >
              <Notification01Icon size={18} color="#ffffff" variant="stroke" />
              Crear Recordatorio
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CrearRecordatorio;
