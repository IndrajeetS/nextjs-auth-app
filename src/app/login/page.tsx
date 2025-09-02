'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast"


export default function LoginPage() {
    const router = useRouter()

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [buttonDesabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log('Login successful', response.data)
            toast.success('Login successful')
            router.push('/profile')
        } catch (error: any) {
            console.log(error)
            toast.error('Error while Login. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                <Toaster />
                <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 text-center mb-6">
                    🐾 Login
                </h2>

                {/* Email */}
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md
                   placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-gray-100
                   bg-white dark:bg-gray-700
                   focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />

                {/* Password */}
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 mb-6 border border-gray-300 dark:border-gray-600 rounded-md
                   placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-gray-100
                   bg-white dark:bg-gray-700
                   focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                />

                {/* Submit Button */}
                <button
                    disabled={buttonDesabled || loading}
                    onClick={handleSubmit}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md
                   font-semibold text-lg transition mb-3"
                >
                    {loading ? "Logging in" : "Login"}
                </button>
                <Link
                    href="/signup"
                    className="block text-center mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition"
                >
                    Don't have an account? <span className="underline">Signup</span>
                </Link>
            </div>
        </div>
    );
}
