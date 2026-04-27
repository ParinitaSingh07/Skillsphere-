// import React from "react";

// function Navbar() {
//   return (
//     <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
//       {/* Logo */}
//       <h1 className="text-2xl font-bold text-blue-600">
//         SkillSphere
//       </h1>

//       {/* Links */}
//       <div className="flex gap-9 text-gray-700 font-medium">
//         <a href="#" className="hover:text-blue-600 transition">Home</a>
//         <a href="#" className="hover:text-blue-600 transition">Categories</a>
//         <a href="#" className="hover:text-blue-600 transition">Dashboard</a>
//         <a href="#" className="hover:text-blue-600 transition">My Courses</a>
//       </div>

//       {/* Button */}
//       <div className="flex gap-2">
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
//         Login
//       </button>
//       <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
//         Sign up
//       </button>
//       </div>
     

//     </nav>
//   );
// }

// export default Navbar;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleDashboardClick = () => {
//     navigate(user ? "/dashboard" : "/login");
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
//       <Link to="/" className="text-2xl font-bold text-blue-600">
//         SkillSphere
//       </Link>

//       <div className="flex gap-9 text-gray-700 font-medium">
//         <Link to="/" className="hover:text-blue-600 transition">
//           Home
//         </Link>
//         <Link to="/courses" className="hover:text-blue-600 transition">
//           Categories
//         </Link>
//         <button
//           onClick={handleDashboardClick}
//           className="hover:text-blue-600 transition"
//         >
//           Dashboard
//         </button>
//         <Link to="/courses" className="hover:text-blue-600 transition">
//           My Courses
//         </Link>
//       </div>

//       <div className="flex gap-2">
//         {user ? (
//           <button
//             onClick={handleLogout}
//             className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
//             >
//               Sign up
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;