import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EstudiantePage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.user.rol === 'estudiante') {
      navigate('/');
    }
  }, [userInfo, navigate]);
  return (
    <div className="w-full h-screen bg-[#FAFBFD] auth">EstudiantePage</div>
  );
}

export default EstudiantePage;
