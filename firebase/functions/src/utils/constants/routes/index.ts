const routeParams = {
    roleId: ':roleId',
} as const;

const API_URLS = {
    roles: '/roles',
    roleActions: `/roles/${routeParams.roleId}` // Read Single, Update Single, Delete Single
} as const

export default API_URLS
