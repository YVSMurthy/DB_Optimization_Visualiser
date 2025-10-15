import React, { useState } from "react";

const QUERY_TYPES = {
    sql: {
        select: {
            name: "Simple SELECT",
            description: "Basic data retrieval without joins or complex conditions",
            levels: [
                {
                    name: "Unoptimized Query",
                    query: "SELECT * FROM customers;",
                },
                {
                    name: "Projection",
                    query: "SELECT id, name, email FROM customers;",
                },
            ],
            complexity: "Low",
        },
        join: {
            name: "JOIN Query",
            description: "Basic data retrieval without joins or complex conditions",
            levels: [
                {
                    name: "Unoptimized Join",
                    query: "SELECT c.id, c.name, o.id AS order_id, o.amount FROM customers c, orders o ON c.id = o.user_id;",
                },
                {
                    name: "Optimized join",
                    query: "SELECT c.id, c.name, o.id AS order_id, o.amount FROM customers c JOIN orders o ON c.id = o.user_id;",
                },
                {
                    name: "Indexing on Join Keys",
                    query: "CREATE INDEX idx_emp_deptid ON emp(dept_id);\nCREATE INDEX idx_dept_id ON dept(id);\n\nSELECT e.id, e.name, d.dept_name FROM emp e JOIN dept d ON e.dept_id = d.id;",
                },
            ],
            complexity: "Medium",
        },
        filter: {
            name: "FILTER Query",
            description: "Basic data retrieval without joins or complex conditions",
            levels: [
                {
                    name: "Unoptimized Query",
                    query: "SELECT id, user_id, amount FROM orders WHERE status = 'completed';",
                },
                {
                    name: "Indexing on Filtered Columns",
                    query: "CREATE INDEX idx_orders_status ON orders(status);\n\nSELECT id, user_id, amount FROM orders WHERE status = 'completed';",
                },
            ],
            complexity: "Medium",
        },
        sort: {
            name: "SORT Query",
            description: "Basic data retrieval without joins or complex conditions",
            levels: [
                {
                    name: "Unoptimized Query",
                    query: "SELECT id, user_id, amount FROM orders ORDER BY created_at DESC;",
                },
                {
                    name: "Indexing on Sorted Columns",
                    query: "CREATE INDEX idx_orders_status ON orders(status);\n\nSELECT id, user_id, amount FROM orders ORDER BY created_at DESC;",
                },
            ],
            complexity: "Medium",
        },
        aggregation: {
            name: "AGGREGATION Query",
            description: "Basic data retrieval without joins or complex conditions",
            levels: [
                {
                    name: "Unoptimized Query + Aggregation in Code",
                    query: "SELECT * FROM orders;\n\n# In application code aggregating\ndf.groupby('product_id')['amount'].sum()",
                },
                {
                    name: "Optimized Query with SQL Aggregation",
                    query: "SELECT product_id, SUM(amount) AS total_sales FROM orders GROUP BY product_id;",
                },
            ],
            complexity: "High",
        }
    },
    nosql: {
        // leave blank for now
    },
};

export default function Queries() {
    const [databaseType] = useState("sql");

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Database Query Examples</h1>

            <div className="space-y-8">
                {Object.entries(QUERY_TYPES[databaseType]).map(([key, query]) => (
                    <div key={key} className="border rounded-xl shadow-md p-6 bg-white">
                        {/* Title and Complexity */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">{query.name}</h2>
                            <span
                                className={`px-3 py-1 text-sm rounded-full font-medium ${query.complexity === "Low"
                                        ? "bg-green-100 text-green-700"
                                        : query.complexity === "Medium"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {query.complexity} Complexity
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-4">{query.description}</p>

                        {/* Levels */}
                        <div className="space-y-6">
                            {query.levels.map((lvl, idx) => (
                                <div key={idx}>
                                    <h3 className="font-medium mb-2">{lvl.name}</h3>
                                    <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                        {lvl.query}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
