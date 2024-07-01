class UserResponse {
    static convert({ id, name, email, username, createdAt, updatedAt, roleUser }) {
        return {
            id,
            name,
            email,
            username,
            createdAt,
            updatedAt,
            role: roleUser.length > 0 ? roleUser[0].role.role : null,
        };
    }
}

export default UserResponse;