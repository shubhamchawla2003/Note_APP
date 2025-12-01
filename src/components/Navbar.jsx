import React from 'react'
import { useAuth } from '../context/ContextProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({setQuery}) => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
  return (
    <div className=" mb-2">
    <nav className="w-full bg-white shadow mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 py-2 sm:py-0">
                <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-extrabold text-indigo-600">NoteApp</span>
                    </div>
                    {/* On very small screens, keep a compact login/logout area to the right of the brand */}
                    <div className="sm:hidden">
                        {!user ? (
                            <Link to="/login" className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                                Login
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                                onClick={() => {
                                    if (typeof logout === 'function') logout();
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex-1 px-4 w-full">
                    <div className="max-w-lg mx-auto w-full">
                        <label htmlFor="search" className="sr-only">Search notes</label>
                        <div className="relative">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search notes..."
                                className="block w-full pl-4 pr-24 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                onChange = {(e) => setQuery && setQuery(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 cursor-pointer hidden sm:inline-flex"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3 hidden sm:flex">
                    
                    {!user ? (
                        <>
                             <button
                        type="button"
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 cursor-pointer"
                    >
                       <Link to='/login'>Login</Link> 
                    </button>
                        </>
                    ):
                    <>
                        <span className="text-sm font-medium text-gray-700">Welcome : {user.name}</span>
                        <button
                            type="button"
                            className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 cursor-pointer"
                            onClick={() => {
                                if (typeof logout === 'function') logout();
                                navigate('/login');
                            }}
                        >
                            Logout
                        </button>
                    </>}
                   
                </div>
            </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar
