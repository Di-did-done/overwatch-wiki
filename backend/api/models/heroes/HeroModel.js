module.exports = {
    identity: 'Heroes',
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
        role: {
            type: 'string'
        },
        difficulty: {
            type: 'integer'
        },
        abilities: {
            type: 'array'
        }
    }
};
