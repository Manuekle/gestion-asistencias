import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomePage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-start justify-start h-full px-24">
        <h1 className="text-6xl text-zinc-800 font-bold mt-10">
          Sigue aprendiendo <br />
          en el camino
        </h1>
        <p className="text-sm tracking-wide text-zinc-600 mt-6 w-1/5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi debitis
          excepturi earum dignissimos quidem sunt voluptatem et! Pariatur,
          maxime exercitationem.
        </p>
        <button
          type="button"
          className="bg-amber-400 text-white tracking-wider px-8 py-2 mt-6 rounded-t-xl rounded-s-xl"
        >
          Comenzar
        </button>
      </div>
      <div className="grid grid-cols-4 grid-rows-3 gap-4 px-24 py-10">
        <div className="row-span-2 col-start-1 row-start-2 bg-[#efefef] rounded-lg p-4">
          2
        </div>
        <div className="row-span-2 col-start-2 row-start-2 bg-[#efefef]  rounded-lg p-4">
          3
        </div>
      </div>
      <div className="px-24 grid grid-cols-2 gap-32 items-center">
        <h1 className="text-4xl text-zinc-800 font-bold mt-10">
          Una manera sencilla de seguir a tus estudiantes en un solo lugar
        </h1>
        <p className="text-sm tracking-wide text-zinc-600 mt-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, sed
          similique aperiam deleniti sunt eveniet temporibus assumenda
          accusantium quo et magni vitae, numquam ratione porro quos
          necessitatibus nemo, quis nisi!
        </p>
      </div>
    </div>
  );
}

export default HomePage;
