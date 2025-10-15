import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const { HOST: HOST, USER: USER, PASSWORD: PASSWORD, DATABASE: DATABASE } = process.env;

class DB_Ops {
    constructor() {
        this.con = mysql.createConnection({
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DATABASE
        });
    }

    connect() {
        this.con.connect((err) => {
            if (err) throw err;
            console.log("Connected to MySQL Database!");
        });
    }

    query(sql, args = []) {
        return new Promise((resolve, reject) => {
            this.con.query(sql, args, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    // Select query
    selectQuery(optimizationLevel) {
        let sql = "";
        switch (optimizationLevel) {
            case "Unoptimized Query":
                sql = `SELECT * FROM products`;
                break;
            case "Projection":
                sql = `SELECT id, name, stock FROM products`;
                break;
            default:
                throw new Error("Invalid optimization level");
        }
        return this.query(sql);
    }

    // join query
    joinQuery(optimizationLevel) {
        let sql = "";
        switch (optimizationLevel) {
            case "Unoptimized Join":
                sql = `SELECT * FROM
                       customers c JOIN orders o ON c.id = o.customer_id
                       JOIN order_items oi ON o.id = oi.order_id
                       JOIN products p ON oi.product_id = p.id`;
                break;
            case "Join with Projection":
                sql = `SELECT c.name, p.name, oi.quantity, o.order_date FROM
                       customers c JOIN orders o ON c.id = o.customer_id
                       JOIN order_items oi ON o.id = oi.order_id
                       JOIN products p ON oi.product_id = p.id`
                break;
            case "Indexing on Join Keys":
                sql = `SELECT c.name, p.name, oi.quantity, o.order_date FROM
                       customers_indexed c JOIN orders_indexed o ON c.id = o.customer_id
                       JOIN order_items_indexed oi ON o.id = oi.order_id
                       JOIN products_indexed p ON oi.product_id = p.id`
                break;
            default:
                throw new Error("Invalid optimization level");
        }
        return this.query(sql);
    }

    // filter query
    filterQuery(optimizationLevel) {
        let sql = "";
        switch (optimizationLevel) {
            case "Unoptimized Filter":
                sql = `SELECT * FROM customers
                WHERE name='Krishna Joshi'`;
                break;
            case "Indexing on Filtered Column":
                sql = `SELECT * FROM customers_indexed
                WHERE name='Krishna Joshi'`;
                break;
            default:
                throw new Error("Invalid optimization level");
        }
        return this.query(sql);
    }

    // sort query
    sortQuery(optimizationLevel) {
        let sql = "";
        switch (optimizationLevel) {
            case "Unoptimized Sort":
                sql = `SELECT * FROM customers
                ORDER BY name DESC`;
                break;
            case "Index on Sorted Column":
                sql = `SELECT * FROM customers_indexed
                ORDER BY name DESC`;
                break;
            default:
                throw new Error("Invalid optimization level");
        }
        return this.query(sql);
    }

    // aggregation query
    aggregationQuery(optimizationLevel) {
        let sql = "";
        switch (optimizationLevel) {
            case "Unoptimized Aggregation":       // Fetch raw, aggregate in Python
                sql = `SELECT * FROM orders`;
                break;
            case "SQL Aggregation":               // GROUP BY, SUM, COUNT in SQL
                sql = `SELECT customer_id, COUNT(*) as total_orders, SUM(total_amount) as total_spent
                       FROM orders
                       GROUP BY customer_id`;
                break;
            default:
                throw new Error("Invalid optimization level");
        }
        return this.query(sql);
    }
}

// Export a single instance
const db = new DB_Ops();
db.connect();

export { db };
