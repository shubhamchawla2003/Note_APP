import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [form, setForm] = React.useState({ name: '', email: '', password: '' });
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

       /* const { name, email, password } = form;
        if (!name.trim() || !email.trim() || !password) {
            setError('Please fill in all fields.');
            return;
        }
        // basic client-side email check
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }*/

        try{
            const response = await axios.post('http://localhost:5000/api/auth/signup', form);
            setSuccess(response.data.message);
            console.log(response.data);
            if(response.data.success){
                navigate('/login');
            }
        }catch(err){
            console.log(err);      
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create an account</h2>

                {error && (
                    <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 p-3 rounded">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                            Full name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Your name"
                            autoComplete="name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Create a password"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute inset-y-0 right-2 px-2 text-sm text-gray-600 hover:text-gray-800"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                    
                </form>

                <p className="mt-4 text-sm text-gray-600 text-center">
                    By creating an account you agree to the terms of service.
                </p>
            </div>
        </div>
    );
  
}

export default Signup
