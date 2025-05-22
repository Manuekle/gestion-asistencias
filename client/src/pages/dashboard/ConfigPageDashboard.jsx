import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../actions/userActions';

function ConfigPageDashboard() {
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
      {/* <section className="col-span-3 rounded-xl bg-white border shadow-sm px-6 py-4">
        <h1 className="font-bold text-lg">Configuración</h1>
      </section> */}
      <section className="col-span-3 flex flex-col rounded-xl bg-white border shadow-sm px-4 sm:px-6 pt-4">
        <div className="flex flex-col pb-4">
          <h2 className="font-bold text-sm sm:text-md capitalize">
            {userInfo && userInfo.user.user_nombre}
          </h2>
          <p className="text-gray-500 text-xs">
            Administra tu cuenta y configuración
          </p>
        </div>
        {/* <hr /> */}
        <article className="grid grid-cols-1 sm:grid-cols-4 items-center py-4 gap-4 sm:gap-0">
          <div className="w-full text-zinc-800 font-bold text-sm">
            <h1>Foto</h1>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${
              userInfo && userInfo.user.user_nombre
            }/?background=f0e9e9&color=000&bold=true`}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          {/* <div className="col-span-2 flex items-end justify-end">
            <button
              type="button"
              className="bg-white border font-bold text-xs text-zinc-800 px-3 py-2 rounded-lg hover:shadow-sm"
            >
              Editar
            </button>
          </div> */}
        </article>
        <hr />
        <article className="grid grid-cols-1 sm:grid-cols-4 items-center py-4 gap-4 sm:gap-0">
          <div className="w-full text-zinc-800 font-bold text-sm">
            <h1>Nombre</h1>
          </div>
          <div className="w-full text-zinc-800 capitalize font-normal text-sm">
            <h1>{userInfo && userInfo.user.user_nombre}</h1>
          </div>
          {/* <div className="col-span-2 flex items-end justify-end">
            <button
              type="button"
              className="bg-white border font-medium text-xs text-zinc-800 px-3 py-2 rounded-lg hover:shadow-md"
            >
              Editar
            </button>
          </div> */}
        </article>
        <hr />
        <article className="grid grid-cols-1 sm:grid-cols-4 items-center py-4 gap-4 sm:gap-0">
          <div className="w-full text-zinc-800 font-bold text-sm">
            <h1>Correo electronico</h1>
          </div>
          <div className="w-full text-zinc-800 font-normal text-sm">
            <h1>{userInfo && userInfo.user.user_correo}</h1>
          </div>
          {/* <div className="col-span-2 flex items-end justify-end">
            <button
              type="button"
              className="bg-white border font-medium text-xs text-zinc-800 px-3 py-2 rounded-lg hover:shadow-md"
            >
              Editar
            </button>
          </div> */}
        </article>
        <hr />
        <article className="grid grid-cols-1 sm:grid-cols-4 items-center py-6 gap-4 sm:gap-0">
          <div className="w-full text-zinc-800 font-bold text-sm">
            <h1>Cargo</h1>
          </div>
          <div className="w-full text-zinc-800 capitalize font-normal text-sm">
            <h1>{userInfo && userInfo.user.rol}</h1>
          </div>
        </article>
        <hr />
        <article className="grid grid-cols-1 sm:grid-cols-4 items-center py-6 gap-4 sm:gap-0">
          <div className="w-full text-zinc-800 font-bold text-sm">
            <h1>Contraseña</h1>
          </div>
          <div className="w-full text-zinc-800 font-normal text-sm">
            <h1>***********</h1>
          </div>
          <div className="col-span-1 sm:col-span-2 flex items-end justify-end">
            <button
              type="button"
              className="bg-zinc-800 font-bold text-xs text-white px-4 py-2 rounded-lg hover:shadow-md w-full sm:w-auto"
            >
              Cambiar
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default ConfigPageDashboard;
