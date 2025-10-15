import { useState } from 'react';
import Simulator from './components/Simulator';
import Schema from './components/Schema';
import Queries from './components/Queries';

export default function App() {
  const [db, setDb] = useState('sql');
  const [option, setOption] = useState('simulator');

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center p-10 gap-10 bg-gray-50">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-5xl font-bold text-gradient-purple">Database optimization</h1>
        <h1 className="text-5xl font-bold">Simulator</h1>
      </div>

      <h2 className="text-2xl text-center text-gray-500 font-times flex flex-wrap gap-2 w-3/5">
        Master database performance through interactive visualization. Compare SQL and NoSQL query types, understand optimization techniques, and see the dramatic impact of caching on real-world scenarios.
      </h2>

      <div className='w-11/12 flex flex-col gap-2 mt-5'>
        {/* Button to switch between SQL and NoSQL */}
        {/* <div className='w-full flex flex-col items-start gap-5'>
          <div className="flex items-center justify-center w-60 h-13 rounded-lg shadow-2xl p-1 bg-white">
            <button className={`${(db == 'sql') ? "bg-gradient-purple text-white" : "bg-transparent text-black"} w-1/2 h-full rounded-lg px-5 py-2 transition-colors duration-400 ease-in-out hover:cursor-pointer`}>
              <span className="text-lg font-bold" onClick={() => setDb('sql')}>SQL</span>
            </button>
            <button className={`${(db == 'nosql') ? "bg-gradient-purple text-white" : "bg-transparent text-black"} w-1/2 h-full rounded-lg px-5 py-2 transition-colors duration-400 ease-in-out hover:cursor-pointer`}>
              <span className="text-lg font-bold" onClick={() => setDb('nosql')}>NoSQL</span>
            </button>
          </div>
        </div> */}

        {/* Simulator */}
        <div className='w-full p-2 mt-5 flex flex-col items-center'>
          {/* Options  */}
          <div className='w-3/4 flex items-center gap-3 bg-[#eaeff3] rounded-md py-1.5 px-2'>
            <button className={`flex items-center justify-center px-3 py-1 w-1/3 rounded-lg ${(option == 'simulator') ? "bg-white" : "bg-transparent"} hover:cursor-pointer`}
            onClick={() => setOption('simulator')}>Simulator</button>
            <button className={`flex items-center justify-center px-3 py-1 w-1/3 rounded-lg ${(option == 'schema') ? "bg-white" : "bg-transparent"} hover:cursor-pointer`}
            onClick={() => setOption('schema')}>Schema</button>
            <button className={`flex items-center justify-center px-3 py-1 w-1/3 rounded-lg ${(option == 'queries') ? "bg-white" : "bg-transparent"} hover:cursor-pointer`}
            onClick={() => setOption('queries')}>Queries</button>
          </div>

          {/* Simulate, Query, Schema tabs  */}
          <div className='mt-10 px-5 w-full '>
            {
              (option == 'simulator') ? <Simulator db={db} /> 
              : (option == 'schema') ? <Schema db={db} />
              : <Queries db={db} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}