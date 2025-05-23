import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../actions/userActions';

function StudentConfigPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      dispatch(getUserDetails(userInfo.user.user_id));
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="grid gap-6">
      <section className="col-span-3 flex flex-col rounded-xl bg-white border shadow-sm px-4 sm:px-6 pt-4">
        <div className="flex flex-col pb-4">
          <h2 className="font-bold text-sm sm:text-md capitalize">
            {userInfo && userInfo.user.user_nombre}
          </h2>
          <p className="text-gray-500 text-xs">
            Administra tu cuenta y configuración
          </p>
        </div>
      </section>
    </div>
  );
}

export default StudentConfigPage;
