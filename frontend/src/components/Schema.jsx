import { Database, Table } from "lucide-react";

export default function Schema({ db }) {
    return (
        <div className="w-full bg-transparent rounded-lg flex items-center justify-center">
            {
                (db == 'sql') ? (
                    // SQL Database Schema 
                    <div className="w-full flex flex-col gap-10">
                        <div className="w-full flex flex-col items-start gap-5 bg-purple-50 border-1 border-purple-200 px-10 py-5 rounded-lg">
                            <h2 className="text-lg font-bold flex items-center gap-2"><Database color="#8f118f" /> SQL Database Schema</h2>
                            <h4 className="text-md">Relational database with normalized tables, foreign keys, and indexes for optimal query performance.</h4>
                        </div>

                        {/* Table 1 */}
                        <div className="w-full bg-white rounded-lg shadown-lg px-10 py-5 flex flex-col items-center gap-5">
                            {/* Schema details  */}
                            <div className="w-full flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-lg font-bold"><Table color="#8f118f" /> customers</h3>
                                <h4 className="text-sm px-3 py-2 rounded-md border-1 border-gray-200 bg-gray-50">1000 documents</h4>
                            </div>

                            {/* Schema  */}
                            <div className="w-7/8 px-10 py-5">
                                <table className="table-auto border-collapse border-spacing-y-4 w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Column</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Type</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Property</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Indexed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">id</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">UUID</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">PRIMAY KEY</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">name</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">VARCHAR(50)</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">NOT NULL</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">email</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">VARCHAR(20)</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">UNIQUE NOT NULL</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-gray-100 border-1 border-gray-300 rounded-lg">Not Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">created_at</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">TIMESTAMP</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">NOT NULL, DEFAULT(NOW)</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-gray-100 border-1 border-gray-300 rounded-lg">Not Indexed</p></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        {/* Table 2 */}
                        <div className="w-full bg-white rounded-lg shadown-lg px-10 py-5 flex flex-col items-center gap-5">
                            {/* Schema details  */}
                            <div className="w-full flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-lg font-bold"><Table color="#8f118f" /> orders</h3>
                                <h4 className="text-sm px-3 py-2 rounded-md border-1 border-gray-200 bg-gray-50">4000 documents</h4>
                            </div>

                            {/* Schema  */}
                            <div className="w-7/8 px-10 py-5">
                                <table className="table-auto border-collapse border-spacing-y-4 w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Columns</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Type</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Property</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Indexed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">id</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">UUID</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">PRIMAY KEY</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">user_id</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">UUID</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">FOREIGN KEY</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">product_id</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">UUID</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">FOREIGN KEY</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">amount</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">DECIMAL(10, 2)</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">NOT NULL</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-gray-100 border-1 border-gray-300 rounded-lg">Not Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">status</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">VARCHAR(20)</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">UNIQUE NOT NULL</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">created_at</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">TIMESTAMP</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">NOT NULL, DEAFULT(NOW)</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        {/* Table 3 */}
                        <div className="w-full bg-white rounded-lg shadown-lg px-10 py-5 flex flex-col items-center gap-5">
                            {/* Schema details  */}
                            <div className="w-full flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-lg font-bold"><Table color="#8f118f" /> products</h3>
                                <h4 className="text-sm px-3 py-2 rounded-md border-1 border-gray-200 bg-gray-50">200 documents</h4>
                            </div>

                            {/* Schema  */}
                            <div className="w-7/8 px-10 py-5">
                                <table className="table-auto border-collapse border-spacing-y-4 w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Columns</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Type</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Property</th>
                                            <th className="text-lg px-6 pt-4 pb-2 text-center font-semibold border-b-2 border-gray-300">Indexed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">id</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">UUID</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">PRIMAY KEY</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">name</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">VARCHAR(50)</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">NOT NULL</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">price</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">DECIMAL(10, 2)</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">NOT NULL</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-gray-100 border-1 border-gray-300 rounded-lg">Not Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">stock</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">INTEGER</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">NOT NULL, DEAFULT(0)</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-gray-100 border-1 border-gray-300 rounded-lg">Not Indexed</p></td>
                                        </tr>
                                        <tr>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">created_at</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">TIMESTAMP</td>
                                            <td className="text-md text-gray-500 px-6 pt-4 pb-2 text-center border-b-2 border-gray-300">NOT NULL, DEAFULT(NOW)</td>
                                            <td className="text-md text-black px-6 pt-4 pb-2 text-center border-b-2 border-gray-300"><p className="p-1 bg-purple-100 border-1 border-purple-300 rounded-lg">Indexed</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                ) : (
                    // NoSQL Database Schema 
                    <div className="w-full flex flex-col gap-10">
                        <div className="w-full flex flex-col items-start gap-5 bg-purple-50 border-1 border-purple-200 px-10 py-5 rounded-lg">
                            <h2 className="text-lg font-bold flex items-center gap-2"><Database color="#8f118f" /> NoSQL Database Schema</h2>
                            <h4 className="text-md">Document-based database with flexible schemas, embedded documents, and compound indexes for fast queries.</h4>
                        </div>

                        <div className="w-full bg-white rounded-lg shadown-lg px-10 py-5 flex flex-col items-center gap-5">

                        </div>
                    </div>
                )
            }
        </div>
    )
}