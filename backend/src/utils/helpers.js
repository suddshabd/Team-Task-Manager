export const successResponse = (
    res,
    data,
    message = 'Success',
    statusCode = 200
) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (
    res,
    error,
    statusCode = 400
) => {
    res.status(statusCode).json({
        success: false,
        error,
    });
};

export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
};

export const isValidObjectId = (value) => /^[a-f\d]{24}$/i.test(value);

export const formatUser = (user) => ({
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: user.createdAt,
});

export const formatProject = (project) => ({
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    created_by: project.createdBy?._id?.toString?.() || project.createdBy?.toString?.() || null,
    created_at: project.createdAt,
    updated_at: project.updatedAt,
});

export const formatTask = (task) => ({
    id: task._id.toString(),
    project_id: task.projectId?._id?.toString?.() || task.projectId?.toString?.() || null,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assigned_to: task.assignedTo?._id?.toString?.() || task.assignedTo?.toString?.() || null,
    assigned_to_username: task.assignedTo?.username || null,
    created_by: task.createdBy?._id?.toString?.() || task.createdBy?.toString?.() || null,
    created_by_username: task.createdBy?.username || null,
    due_date: task.dueDate,
    created_at: task.createdAt,
    updated_at: task.updatedAt,
});

export const formatProjectMember = (member) => ({
    id: member.user._id.toString(),
    username: member.user.username,
    email: member.user.email,
    first_name: member.user.firstName,
    last_name: member.user.lastName,
    role: member.role,
    joined_at: member.joinedAt,
});
