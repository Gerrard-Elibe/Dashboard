import React, { useState } from "react";
import "./Dashboard.css";
import {
  FaHome, FaUser, FaCog, FaMoneyBill, FaChartBar, FaBell, FaCreditCard,
  FaUsers, FaCoffee, FaCar, FaFilm, FaHamburger, FaMobileAlt, FaPlane, FaCamera
} from "react-icons/fa";
import { FiBell, FiSettings } from "react-icons/fi";
import { PiWatch } from "react-icons/pi";
import {
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";
import { motion } from "framer-motion";

const pieData = [
  { name: "Food", value: 300 },
  { name: "Transport", value: 200 },
  { name: "Health", value: 150 },
  { name: "Others", value: 100 },
];

const COLORS = ["#FFD700", "#00C49F", "#0088FE", "#A569BD"];

const barData = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 200 },
  { name: "Apr", uv: 278 },
  { name: "May", uv: 189 },
  { name: "Jun", uv: 239 },
];

const Dashboard = () => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="main-panel">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">DashBoard</h2>
        <nav className="menu">
          <ul>
            <li><FaHome /> Home</li>
            <li><FaUser /> Profile</li>
            <li><FaMoneyBill /> Billing</li>
            <li><FaChartBar /> Analytics</li>
            <li><FaUsers /> Users</li>
            <li><FaBell /> Notifications</li>
            <li><FaCog /> Settings</li>
          </ul>
        </nav>

        <div className="recent-transactions">
          <h3>Recent transactions</h3>
          <ul>
            <li><FaCoffee /> Starbucks Coffee <span className="amount">- $32.00</span></li>
            <li><FaCreditCard /> DRNY <span className="amount">- $80.00</span></li>
            <li><FaFilm /> Netflix <span className="amount">- $13.00</span></li>
            <li><FaHamburger /> KFC <span className="amount">- $45.00</span></li>
            <li><FaCar /> Uber <span className="amount">- $24.00</span></li>
          </ul>
        </div>

        <div className="goals">
          <h3>My Goals</h3>
          <ul>
            <li><FaMobileAlt /> New iPhone</li>
            <li><PiWatch /> Watch</li>
            <li><FaPlane /> Vacation</li>
            <li><FaCar /> Car</li>
            <li><FaCamera /> Camera</li>
          </ul>
          <button className="add-goal">+ Add new goal</button>
        </div>
      </aside>

      {/* Main content panel */}
      <section className="dashboard-content">
        {/* Header with gradient */}
        <div className="header">
          <h1>Welcome Back, Mercy</h1>
          <div className="header-right">
            <input type="text" placeholder="Search..." />

            <div className="relative">
              <FiBell size={22} />
              <span className="notification-badge">3</span>
            </div>

            <FiSettings size={22} />
            <label htmlFor="upload-profile" className="profile-pic-label" style={{ cursor: "pointer" }}>
              <img
                src={profileImage || "/mercy.jpg"}
                alt="Mercy's Profile"
                className="profile-pic"
              />
            </label>
            <input
              type="file"
              id="upload-profile"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Balance Overview */}
        <div className="balance-overview">
          <div className="balance-info">
            <h1>$25,524.78</h1>
            <span>Total Balance</span>
          </div>
          <div className="cards">
            <div className="card">Primary: $12,000</div>
            <div className="card">Savings: $13,524.78</div>
          </div>
          <div className="currency">
            <span>Currency: </span>
            <strong>USD</strong>
          </div>
        </div>

        {/* Income and Spending */}
        <div className="income-expense">
          <motion.div whileHover={{ scale: 1.02 }} className="income">
            <h4>Income</h4>
            <p>$8,643.99</p>
            <ResponsiveContainer width="100%" height={50}>
              <LineChart data={[{ value: 8643.99 }, { value: 9500 }, { value: 10200 }]}>
                <Tooltip
                  contentStyle={{ background: "#333", color: "#fff", borderRadius: "5px" }}
                  itemStyle={{ color: "#0f0" }}
                />
                <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="spending">
            <h4>Total Spending</h4>
            <p>$3,487.59</p>
            <ResponsiveContainer width="100%" height={50}>
              <LineChart data={[{ value: 3487.59 }, { value: 3000 }, { value: 2800 }]}>
                <Tooltip
                  contentStyle={{ background: "#333", color: "#fff", borderRadius: "5px" }}
                  itemStyle={{ color: "#f00" }}
                />
                <Line type="monotone" dataKey="value" stroke="#F44336" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bar Chart */}
        <motion.div whileHover={{ scale: 1.01 }} className="monthly-bar-chart">
          <h4>Monthly Overview</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#2c3e50", color: "#ecf0f1", borderRadius: "6px" }}
              />
              <Bar dataKey="uv" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Transactions Table */}
        <div className="transactions">
          <h3>Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>T1001</td>
                <td>Felicia Jane</td>
                <td className="status-paid">Paid</td>
                <td>2025-05-10</td>
                <td>$240.00</td>
              </tr>
              <tr>
                <td>T1002</td>
                <td>Gerrard Man</td>
                <td className="status-pending">Pending</td>
                <td>2025-05-12</td>
                <td>$480.00</td>
              </tr>
              <tr>
                <td>T1003</td>
                <td>Alice Mercy</td>
                <td className="status-failed">Failed</td>
                <td>2025-05-13</td>
                <td>$120.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
