import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FormInput, Button, Card } from '../components/Common';

export const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
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
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="hidden rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 via-slate-900/70 to-blue-500/10 p-10 lg:block">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/70">
                        Team Task Manager
                    </p>
                    <h1 className="max-w-md text-4xl font-semibold leading-tight text-white">
                        Track projects, align your team, and keep delivery moving.
                    </h1>
                    <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
                        Sign in to open your workspace, review active projects, and keep tasks flowing without the usual dashboard clutter.
                    </p>
                </div>

                <Card title="Login" className="self-center">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                                {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <FormInput
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                            />
                            <FormInput
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </div>
                        <Button type="submit" disabled={loading} variant="primary" className="w-full">
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        <p className="text-center text-sm text-slate-400">
                            Don&apos;t have an account?{' '}
                            <Link to="/signup" className="font-semibold text-cyan-300 hover:text-cyan-200">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </Card>
            </div>
        </div>
    );
};
