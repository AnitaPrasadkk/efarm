export const SERVICE_CONSTANTS = {
    REQUEST_PARAM: {
        'LOGIN': {
            serviceName: 'auth', operationName: 'signIn', method: 'POST'
        },
        'LOGOUT': {
            serviceName: 'auth', operationName: 'logOut', method: 'POST'
        },
        'GET_ITEMS_LIST': {
            serviceName: 'product', operationName: 'getItem', method: 'POST'
        },
        'POST_ITEMS': {
            serviceName: 'product', operationName: 'postItems', method: 'POST'
        },
        'SEARCH_POSTS': {
            serviceName: 'product', operationName: 'search', method: 'POST'
        },
        'PROFILE_POSTS': {
            serviceName: 'profile', operationName: 'getProfilePosts', method: 'POST'
        },
        'UPDATE_ITEMS': {
            serviceName: 'profile', operationName: 'updatePosts', method: 'POST'
        },
        'DELETE_ITEMS': {
            serviceName: 'profile', operationName: 'deletePosts', method: 'POST'
        },
        'NOTIFICATION': {
            serviceName: 'auth', operationName: 'notificationService', method: 'POST'
        }
    }
}
