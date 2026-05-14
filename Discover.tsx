import React from 'react';
import StateList from '../components/StateList';

export default function Discover() {
  return (
    <div className="min-h-screen px-6 pb-20">
      <div className="max-w-7xl mx-auto pt-12">
        <div className="mb-20 space-y-6">
          <div className="h-1 w-20 bg-orange-500 rounded-full" />
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
            Heritage <br /> Discoveries
          </h1>
        </div>

        <StateList />
      </div>
    </div>
  );
}
