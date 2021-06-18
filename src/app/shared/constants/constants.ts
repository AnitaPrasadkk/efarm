export const CONSTANTS = {
    ERROR_VALUES: {
        signIn: {
            text: 'Please provide valid data for a proper Sign In'
        },
        logout: {
            text: 'We are Sorry, we couldn\'t sign out your session right now. Please try again later'
        },
        postItems: {
            header: 'We are Sorry',
            text: 'we couldn\'t publish your post right now. Please try again later'
        },
        search: {
            header: 'We are Sorry',
            text: 'We couldn\'t process your search right now. Please try again later'
        },
        getProfilePosts: {
            header: 'We are Sorry',
            text: 'We couldn\'t fetch your profile posts right now. Please try again later'
        },
        updatePosts: {
            header: 'We are Sorry',
            text: 'We couldn\'t update your post right now. Please try again later'
        },
        deletePosts: {
            header: 'We are Sorry',
            text: 'We couldn\'t remove your post right now. Please try again later'
        },
        getItem: {
            header: 'We are Sorry',
            text: 'We couldn\'t find any post in your location. Please try again later'
        },
        notificationService: {
            header: 'We are Sorry',
            text: 'We couldn\'t send your notification right now. Please try again later'
        },
        GENERIC_ERROR: {
            header: 'We are Sorry',
            text: 'Something went wrong. Please try again later'
        }
    },
    NOTIFICATION: {
        text: 'Your notification has sent !!'
    },
    SIGN_OUT: {
        text: 'You are logged out.'
    },
    MARKER_CONFIG: {
        DEFAULT_COORD: {
            latitude: '13.047272',
            longitude: '80.095720'
        },
        ICON_CONFIG: {
            url: '/assets/images/default.png',
            scaledSize: {
                height: 40,
                width: 40
            },
            labelOrigin: {
                x: 20,
                y: 15
            }
        },
        BALLOON_COLOR: {
            'ICanHelp': 'http://maps.google.com/mapfiles/ms/icons/green.png',
            'HelpMe': 'http://maps.google.com/mapfiles/ms/icons/red.png',
            'both': 'http://maps.google.com/mapfiles/ms/icons/yellow.png'
        }
    },
    ITEM_INFO: {
        REQUEST_TYPES: [{
            key: 'Sell',
            dispText: 'Sell'
        },
        {
            key: 'Buy',
            dispText: 'Buy',
        }],
        TYPES: ['Vegetables', 'Fruits', 'Grains'],
        POST_DISPLAY_TEXT: {
            'Sell': 'Sell',
            'Buy': 'Buy',
            'both': 'Sell / Buy'
        }
    },
    CRUD_CONSTANTS: {
        add: {
            serviceName: 'POST_ITEMS',
            heading: 'Publish Post',
            text: 'Post published successfully'
        },
        edit: {
            serviceName: 'UPDATE_ITEMS',
            heading: 'Update Post',
            text: 'Post updated successfully'
        },
        delete: {
            serviceName: 'DELETE_ITEMS',
            heading: 'Do you want to delete this post ?',
            text: 'Post deleted successfully'
        }
    }
}
