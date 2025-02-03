/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Skeleton } from '@heroui/react';
import { Search01Icon } from 'hugeicons-react';
import { Link } from 'react-router';
import { detailsClass } from '../../actions/classActions';

function ClassPageDashboard() {
  const dispatch = useDispatch();

  const classDetails = useSelector((state) => state.classDetails);
  const { clases } = classDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(detailsClass(userInfo.user.usua_id));
    }
  }, [dispatch, userInfo]);

  return (
    <div className="grid gap-6">
      <section className="col-span-3 flex flex-col gap-6 rounded-xl bg-white border shadow-sm px-6 py-4">
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row gap-4">
            <Input
              className="w-64"
              isClearable
              placeholder="Buscar clase"
              size="md"
              startContent={
                <Search01Icon size={18} color="#7a7a70" variant="stroke" />
              }
            />
            <button
              type="button"
              className="border rounded-md px-4 text-xs font-bold shadow-md"
            >
              Lunes
            </button>
            <button
              type="button"
              className="border rounded-md px-4 text-xs font-bold shadow-sm"
            >
              Martes
            </button>
            <button
              type="button"
              className="border rounded-md px-4 text-xs font-bold shadow-sm"
            >
              Miercoles
            </button>
            <button
              type="button"
              className="border rounded-md px-4 text-xs font-bold shadow-sm"
            >
              Jueves
            </button>
            <button
              type="button"
              className="border rounded-md px-4 text-xs font-bold shadow-sm"
            >
              Viernes
            </button>
          </span>
          <button
            type="button"
            className="bg-[#E7FFF6] py-2 px-4 gap-1 rounded-lg flex flex-row items-center"
          >
            {/* <BookOpen02Icon size={18} color="#FBBF24" variant="stroke" /> */}
            <h1 className="font-bold text-xs text-[#319C78]">Crear clase</h1>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {clases.map((clase) => (
            <Link
              to={`${clase.asig_slug}/${clase.clas_id}`}
              className="col-span-1 flex flex-col gap-3 border rounded-lg px-2.5 py-3 hover:shadow-md"
            >
              <div className="flex flex-col">
                <h1 className="font-bold text-sm text-zinc-800">
                  {clase.clas_hora_inicio} - {clase.clas_hora_fin}
                </h1>
                <h1 className="font-bold text-xs text-zinc-800">
                  {clase.asig_nombre}
                </h1>
                <h1 className="font-bold text-xs text-zinc-400">
                  {clase.asig_programa}
                </h1>
              </div>
              <Skeleton className="rounded-lg ">
                <div className="h-40 rounded-lg bg-default-300" />
              </Skeleton>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClassPageDashboard;
