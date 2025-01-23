import React from 'react';
import { Calendar04Icon } from 'hugeicons-react';

function NextClass() {
  return (
    <div className="bg-[#FAF7F0] rounded-lg flex gap-3 flex-col py-2 px-4">
      <span className="font-normal text-sm flex flex-row gap-4 items-center">
        <Calendar04Icon size={18} color="#71717A" variant="stroke" />
        <h1 className="text-zinc-500 text-xs font-bold">10:00 - 11:00</h1>
      </span>
      <span className="text-xs text-zinc-800">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla,
        facilis.
      </span>
    </div>
  );
}

export default NextClass;
