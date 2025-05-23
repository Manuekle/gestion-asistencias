import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar03Icon } from 'hugeicons-react';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

function StudentHomePage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const goToCalendar = () => {
    navigate('/student/schedule', { replace: true });
  };

  return (
    <div className="w-full h-screen bg-[#FAFBFD] auth flex gap-8 flex-col justify-center items-center">
      <div className="bg-[#FAFBFD] p-4">
        <h1 className="text-6xl">
          Bienvenido <strong>{userInfo.user.user_nombre}!</strong>
        </h1>
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          size="sm"
          className="bg-blue-600 text-white rounded-lg px-6 py-2 text-xs font-bold shadow-sm hover:shadow-md flex items-center gap-2"
          onPress={goToCalendar}
        >
          <Calendar03Icon size={18} color="#ffffff" variant="stroke" />
          Ver Calendario
        </Button>
      </div>
    </div>
  );
}

export default StudentHomePage;
