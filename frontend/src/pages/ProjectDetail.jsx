import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService, taskService } from '../services/api';
import { Button, Card, FormInput } from '../components/Common';

const statusBadge = {
    todo: 'border-slate-500/30 bg-slate-500/10 text-slate-200',
    in_progress: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    done: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
};

const priorityBadge = {
    low: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
    medium: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
    high: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
};

export const ProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState(null);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
    });
    const [filterStatus, setFilterStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (projectId) {
            fetchProject();
            fetchTasks();
            fetchStats();
        }
    }, [projectId, filterStatus]);

    const fetchProject = async () => {
        try {
            const response = await projectService.getProjectById(projectId);
            setProject(response.data.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load project');
        }
    };

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await taskService.getTasks(projectId, {
                status: filterStatus || undefined,
            });
            setTasks(response.data.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await taskService.getTaskStats(projectId);
            setStats(response.data.data);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await taskService.createTask(projectId, newTask);
            setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
            setShowCreateTask(false);
            fetchTasks();
            fetchStats();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create task');
        }
    };

    const handleUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            await taskService.updateTask(taskId, { status: newStatus });
            fetchTasks();
            fetchStats();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update task');
        }
    };

    return (
        <div className="min-h-screen px-6 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                    ← Back to Dashboard
                </button>

                {project && (
                    <Card className="bg-gradient-to-br from-cyan-400/10 via-slate-900/80 to-blue-500/10">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">
                                    Project Detail
                                </p>
                                <h1 className="mt-3 text-3xl font-semibold text-white">{project.name}</h1>
                                {project.description && (
                                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowCreateTask((current) => !current)}
                                >
                                    {showCreateTask ? 'Close Task Form' : '+ New Task'}
                                </Button>
                                <div className="min-w-44">
                                    <FormInput
                                        label="Filter by Status"
                                        name="filterStatus"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        as="select"
                                    >
                                        <option value="">All</option>
                                        <option value="todo">To Do</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </FormInput>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {stats && (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                        {[
                            ['Total Tasks', stats.total_tasks],
                            ['To Do', stats.todo_tasks],
                            ['In Progress', stats.in_progress_tasks],
                            ['Done', stats.done_tasks],
                            ['Overdue', stats.overdue_tasks],
                        ].map(([label, value]) => (
                            <Card key={label} className={label === 'Overdue' && value > 0 ? 'border-rose-400/30' : ''}>
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{label}</p>
                                <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
                            </Card>
                        ))}
                    </div>
                )}

                {showCreateTask && (
                    <Card title="Create New Task">
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <FormInput
                                label="Task Title"
                                type="text"
                                name="title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                placeholder="Refine onboarding workflow"
                            />
                            <FormInput
                                label="Description"
                                name="description"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                placeholder="Capture acceptance criteria and key dependencies"
                                as="textarea"
                                rows={4}
                            />
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormInput
                                    label="Priority"
                                    name="priority"
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    as="select"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </FormInput>
                                <FormInput
                                    label="Due Date"
                                    type="date"
                                    name="dueDate"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button type="submit" variant="primary">
                                    Create Task
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => setShowCreateTask(false)}>
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

                <Card title="Tasks">
                    {loading ? (
                        <p className="text-slate-300">Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                        <p className="text-slate-400">No tasks yet. Create one to get started.</p>
                    ) : (
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="rounded-[24px] border border-white/10 bg-slate-950/60 p-5"
                                >
                                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                                                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityBadge[task.priority] || priorityBadge.medium}`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <p className="text-sm leading-6 text-slate-400">
                                                {task.description || 'No description provided.'}
                                            </p>
                                            <div className="flex flex-wrap gap-5 text-sm text-slate-400">
                                                <span>Assigned to: {task.assigned_to_username || 'Unassigned'}</span>
                                                <span>
                                                    Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex min-w-52 flex-col gap-3">
                                            <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium ${statusBadge[task.status] || statusBadge.todo}`}>
                                                {task.status.replace('_', ' ')}
                                            </span>
                                            <FormInput
                                                label="Update Status"
                                                name={`status-${task.id}`}
                                                value={task.status}
                                                onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                                                as="select"
                                            >
                                                <option value="todo">To Do</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="done">Done</option>
                                            </FormInput>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};
