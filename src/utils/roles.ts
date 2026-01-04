export type AppRole = 'USER' | 'STAFF' | 'COORD' | 'CONCELHO' | 'ADMIN';

export const ROLES = {
    USER: 'USER' as AppRole,
    STAFF: 'STAFF' as AppRole,
    COORD: 'COORD' as AppRole,
    CONCELHO: 'CONCELHO' as AppRole,
    ADMIN: 'ADMIN' as AppRole,
};

export const ROLE_HIERARCHY: Record<AppRole, number> = {
    USER: 1,
    STAFF: 2,
    COORD: 3,
    CONCELHO: 4,
    ADMIN: 5,
};

/**
 * Checks if a user has at least the required role.
 * Example: hasMinRole('COORD', 'STAFF') -> true (COORD is higher than STAFF)
 */
export function hasMinRole(userRole: AppRole, minRole: AppRole): boolean {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minRole];
}

/**
 * Checks if a user has strictly the required role.
 */
export function hasRole(userRole: AppRole, role: AppRole): boolean {
    return userRole === role;
}
