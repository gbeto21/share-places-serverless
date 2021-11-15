export default {
    type: "object",
    properties: {
        name: {
            type: 'string',
            minLength: 3
        },
        description: {
            type: 'string',
            minLength: 8
        }
    },
    required: ['name', 'description']
} as const;