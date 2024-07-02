class UserResponse {
    static convert({ id, name, email, username, createdAt, updatedAt, roleUser }) {
        return {
            id,
            name,
            email,
            username,
            role: roleUser.length > 0 ? roleUser[0].role.role : null,
            createdAt,
            updatedAt,
        };
    }
}

export default UserResponse;