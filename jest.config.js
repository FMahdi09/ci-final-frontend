module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/default',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest'
    },
    testEnvironment: 'jsdom',
    testMatch: [
        '**/tests/**/*.spec.[jt]s?(x)',
        '**/__tests__/*.[jt]s?(x)'
    ],
    transformIgnorePatterns: [
        '/node_modules/(?!axios)/'
    ]
};
