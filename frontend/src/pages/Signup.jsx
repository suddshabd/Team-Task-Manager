import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FormInput, Button, Card } from '../components/Common';

export const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signup(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <Card className="hidden bg-gradient-to-br from-blue-500/10 via-slate-900/75 to-cyan-500/10 lg:block">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/70">
                        Get Started
                    </p>
                    <h1 className="max-w-md text-4xl font-semibold leading-tight text-white">
                        Build a calmer team rhythm with clear ownership and better task visibility.
                    </h1>
                    <div className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
                        <p>Create projects, assign contributors, and track progress without juggling separate tools.</p>
                        <p>Once you sign up, you can create your first workspace immediately and invite teammates.</p>
                    </div>
                </Card>

                <Card title="Create Account">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                                {error}
                            </div>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormInput
                                label="Username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="username"
                            />
                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                            />
                            <FormInput
                                label="First Name"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First"
                            />
                            <FormInput
                                label="Last Name"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last"
                            />
                        </div>
                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />
                        <Button type="submit" disabled={loading} variant="primary" className="w-full">
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                        <p className="text-center text-sm text-slate-400">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-200">
                                Login
                            </Link>
                        </p>
                    </form>
                </Card>
            </div>
        </div>
    );
};
