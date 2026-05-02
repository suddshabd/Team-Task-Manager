import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/api';
import { Button, Card, FormInput } from '../components/Common';

export const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await projectService.getProjects();
            setProjects(response.data.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await projectService.createProject(newProject);
            setNewProject({ name: '', description: '' });
            setShowCreateForm(false);
            fetchProjects();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create project');
        }
    };

    return (
        <div className="min-h-screen px-6 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
                                Workspace Overview
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold text-white">
                                Welcome, {user?.firstName} {user?.lastName}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                                Keep every project in one place, track delivery status, and give your team a clearer plan for what happens next.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                                {user?.role || 'member'}
                            </span>
                            <Button
                                variant="secondary"
                                onClick={() => setShowCreateForm((current) => !current)}
                            >
                                {showCreateForm ? 'Close Form' : '+ New Project'}
                            </Button>
                            <Button variant="secondary" onClick={() => { logout(); navigate('/login'); }}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </header>

                {showCreateForm && (
                    <Card title="Create New Project">
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
                                <FormInput
                                    label="Project Name"
                                    type="text"
                                    name="name"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                    placeholder="Launch planning"
                                />
                                <FormInput
                                    label="Description"
                                    name="description"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    placeholder="Scope, timeline, and team focus"
                                    as="textarea"
                                    rows={3}
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button type="submit" variant="primary">
                                    Create Project
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setShowCreateForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}

                {error && (
                    <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                        {error}
                    </div>
                )}

                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-white">My Projects</h2>
                        <p className="text-sm text-slate-400">{projects.length} total</p>
                    </div>

                    {loading ? (
                        <Card className="text-slate-300">Loading projects...</Card>
                    ) : projects.length === 0 ? (
                        <Card className="text-center">
                            <p className="text-lg font-medium text-white">No projects yet</p>
                            <p className="mt-2 text-sm text-slate-400">
                                Create your first project to start organizing tasks and teammates.
                            </p>
                        </Card>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <Card key={project.id} className="flex h-full flex-col">
                                    <div className="flex h-full flex-col justify-between gap-6">
                                        <div>
                                            <div className="flex items-start justify-between gap-4">
                                                <h3 className="text-xl font-semibold text-white">
                                                    {project.name}
                                                </h3>
                                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                                                    {new Date(project.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="mt-4 text-sm leading-6 text-slate-400">
                                                {project.description || 'No description yet.'}
                                            </p>
                                        </div>
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate(`/projects/${project.id}`)}
                                            className="w-full"
                                        >
                                            Open Project
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};
