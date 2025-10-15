import { useState } from "react";
import { Play, Settings } from "lucide-react";
import { simulationControlTheme } from "../global/simulationControlTheme";

export default function Simulator({ db }) {
    const { query, n_users, setQuery, setUsers } = simulationControlTheme();

    const [config1Level, setConfig1Level] = useState(0);
    const [config2Level, setConfig2Level] = useState(1);

    const [simulationResults, setSimulationResults] = useState({
        config1: { isComplete: false, isRunning: false, progress: 0, avgLatency: 0, throughput: 0 },
        config2: { isComplete: false, isRunning: false, progress: 0, avgLatency: 0, throughput: 0 },
    });

    const currentQueryConfig = {
        'select': {
            maxLevel: 1,
            levels: [
                { name: "Unoptimized Query" },             // SELECT * FROM emp
                { name: "Projection" },   // SELECT id, name FROM emp
            ],
        },
        'join': {
            maxLevel: 2,
            levels: [
                { name: "Unoptimized Join" },              // SELECT * with implicit join
                { name: "Join with Projection" },          // Explicit join + selective cols
                { name: "Indexing on Join Keys" },         // CREATE INDEX on dept_id
            ],
        },
        'filter': {
            maxLevel: 1,
            levels: [
                { name: "Unoptimized Filter" },            // SELECT * WHERE dept='Sales'
                { name: "Indexing on Filtered Column" },     // CREATE INDEX ON dept
            ],
        },
        'sort': {
            maxLevel: 1,
            levels: [
                { name: "Unoptimized Sort" },              // ORDER BY without index
                { name: "Index on Sorted Column" },          // CREATE INDEX ON salary
            ],
        },
        'aggregation': {
            maxLevel: 1,
            levels: [
                { name: "Unoptimized Aggregation" },       // Fetch raw, aggregate in Python
                { name: "SQL Aggregation" },               // GROUP BY, SUM, COUNT in SQL
            ],
        },
    };

    const queryOptions = [
        { name: "Simple SELECT", value: "select" },
        { name: "JOIN Query", value: "join" },
        { name: "FILTER Query", value: "filter" },
        { name: "SORT Query", value: "sort" },
        { name: "AGGREGATION Query", value: "aggregation" },
    ]


    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const simulate = async () => {
        console.log(`Simulating ${query} query on ${db} database with ${n_users} users.`);

        // Reset before starting
        setSimulationResults((prev) => ({
            ...prev,
            config1: { ...prev.config1, isRunning: true, isComplete: false, progress: 0, timeTaken: 0 },
            config2: { ...prev.config2, isRunning: true, isComplete: false, progress: 0, timeTaken: 0 },
        }));

        let unit = 100 / n_users;

        // Config 1 simulation
        (async () => {
            let startTime = Date.now(); // ⏱ start timer
            for (let i = 1; i <= n_users; i++) {
                await sleep(50);
                await fetch(`http://localhost:3000/exec/${query}-query`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ optimizationLevel: currentQueryConfig[query].levels[config1Level].name })
                }).then(res => res.json()).then(data => {
                    console.log(data);
                });

                let finalTime = (Date.now() - startTime) / 1000; // seconds
                let avgLatency = ((finalTime / i) * 1000).toFixed(2); // ms per request
                let throughput = (i / finalTime).toFixed(2); // req/sec


                setSimulationResults((prev) => {
                    const newProgress = Math.min(prev.config1.progress + unit, 100);
                    const isDone =  i === n_users;
                    return {
                        ...prev,
                        config1: {
                            ...prev.config1,
                            progress: newProgress,
                            isComplete: isDone,
                            isRunning: !isDone,
                            avgLatency: isDone ? avgLatency : prev.config1.avgLatency,
                            throughput: isDone ? throughput : prev.config1.throughput,
                            timeTaken: isDone
                                ? ((Date.now() - startTime) / 1000).toFixed(2)
                                : prev.config1.timeTaken,
                        },
                    };
                });
            }
        })();

        // Config 2 simulation
        (async () => {
            let startTime = Date.now();
            for (let i = 1; i <= n_users; i++) {
                await sleep(50);
                await fetch(`http://localhost:3000/exec/${query}-query`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ optimizationLevel: currentQueryConfig[query].levels[config2Level].name })
                }).then(res => res.json()).then(data => {
                    console.log(data);
                });

                let finalTime = (Date.now() - startTime) / 1000; // seconds
                let avgLatency = ((finalTime / i) * 1000).toFixed(2); // ms per request
                let throughput = (i / finalTime).toFixed(2); // req/sec

                setSimulationResults((prev) => {
                    const newProgress = Math.min(prev.config2.progress + unit, 100);
                    const isDone =  i === n_users;
                    return {
                        ...prev,
                        config2: {
                            ...prev.config2,
                            progress: newProgress,
                            isComplete: isDone,
                            isRunning: !isDone,
                            avgLatency: isDone ? avgLatency : prev.config1.avgLatency,
                            throughput: isDone ? throughput : prev.config1.throughput,
                            timeTaken: isDone
                                ? ((Date.now() - startTime) / 1000).toFixed(2)
                                : prev.config1.timeTaken,
                        },
                    };
                });
            }
        })();

    };

    return (
        <div className="w-fullrounde-lg bg-transparent flex flex-col items-center gap-5">
            {/* Simulation Controls */}
            <div className="w-full bg-white rounded-lg shadow-lg p-5 flex flex-col items-start gap-3">
                <h2 className="text-xl font-semibold flex items-center gap-2"><Settings /> Simulator Configurations</h2>

                <div className="flex items-center justify-center gap-35 w-full px-5">
                    {/* Query Type */}
                    <div className="flex flex-col gap-2 w-1/5">
                        <h3 className="text-md ml-1">Query Type</h3>
                        <select
                            className="border border-gray-300 rounded-md p-2 w-full"
                            onChange={(e) => setQuery(e.target.value)}
                        >
                            {queryOptions.map((opt, idx) => (
                                <option key={idx} value={opt.value}>
                                    {opt.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Users */}
                    <div className="flex flex-col gap-2 w-1/5">
                        <h3 className="text-md ml-1">Concurrent Users</h3>
                        <input
                            type="number"
                            className="border border-gray-300 rounded-md p-2 w-full"
                            value={n_users}
                            onChange={(e) => {
                                if (e.target.value === "") return setUsers(1);
                                if (parseInt(e.target.value) < 1) return setUsers(1);
                                if (parseInt(e.target.value) > 1000) return setUsers(1000);
                                else setUsers(parseInt(e.target.value))
                            }}
                            min={1}
                            max={1000}
                        />
                    </div>

                    {/* Simulate Button */}
                    <button
                        className="bg-gradient-purple text-white px-8 py-2.5 rounded-lg hover:scale-105 transition-transform duration-300 mt-8.5 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={simulate} disabled={simulationResults.config1.isRunning || simulationResults.config2.isRunning || (config1Level === config2Level)}
                    >
                        <h2 className="flex items-center text-white font-bold text-md gap-2">
                            Simulate <Play color="#ffffff" size={18} />
                        </h2>
                    </button>
                </div>
            </div>

            {/* Config Results */}
            <div className="flex flex-col w-full gap-6">
                {/* Config 1 */}
                <div className="rounded-xl shadow-lg bg-white/80 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="flex items-center gap-2 text-lg font-semibold">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            Configuration 1
                        </span>
                        <span className="px-2 py-1 text-sm rounded-md bg-blue-600 text-white">
                            Level {config1Level}
                        </span>
                    </div>

                    {/* Optimization Level */}
                    <div className="space-y-3">
                        <p className="font-medium">Optimization Level</p>
                        {Array.from({ length: currentQueryConfig[query].maxLevel + 1 }, (_, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={config1Level === i}
                                    onChange={() => setConfig1Level(i)}
                                    className="w-4 h-4"
                                />
                                <label className="text-sm">
                                    Level {i}: {currentQueryConfig[query].levels[i].name}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    {simulationResults.config1.isRunning && (
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                                style={{ width: `${simulationResults.config1.progress}%` }}
                            ></div>
                        </div>
                    )}

                    {/* Results */}
                    {simulationResults.config1.isComplete && (
                        <div className="space-y-3 pt-4 border-t mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {simulationResults.config1.avgLatency}ms
                                    </div>
                                    <div className="text-sm text-slate-600">Avg Latency</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {simulationResults.config1.throughput}
                                    </div>
                                    <div className="text-sm text-slate-600">Req/sec</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Config 2 */}
                <div className="rounded-xl shadow-lg bg-white/80 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="flex items-center gap-2 text-lg font-semibold">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            Configuration 2
                        </span>
                        <span className="px-2 py-1 text-sm rounded-md bg-green-600 text-white">
                            Level {config2Level}
                        </span>
                    </div>

                    {/* Optimization Level */}
                    <div className="space-y-3">
                        <p className="font-medium">Optimization Level</p>
                        {Array.from({ length: currentQueryConfig[query].maxLevel + 1 }, (_, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={config2Level === i}
                                    onChange={() => setConfig2Level(i)}
                                    className="w-4 h-4"
                                />
                                <label className="text-sm">
                                    Level {i}: {currentQueryConfig[query].levels[i].name}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    {simulationResults.config2.isRunning && (
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-green-600 h-4 rounded-full transition-all duration-300"
                                style={{ width: `${simulationResults.config2.progress}%` }}
                            ></div>
                        </div>
                    )}

                    {/* Results */}
                    {simulationResults.config2.isComplete && (
                        <div className="space-y-3 pt-4 border-t mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {simulationResults.config2.avgLatency}ms
                                    </div>
                                    <div className="text-sm text-slate-600">Avg Latency</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {simulationResults.config2.throughput}
                                    </div>
                                    <div className="text-sm text-slate-600">Req/sec</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
