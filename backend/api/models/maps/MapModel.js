module.exports = {
    identity: 'Maps',
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
        id: {
            type: 'string',
            primaryKey: true
        },
        name: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        description: {
            type: 'string'
        }
    }
};

