import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            include: ['src/**/*.js'],
            reporter: ['text', 'html'],
        },
        exclude: [
            ...configDefaults.exclude,
            'e2e/**'
        ]
    },
});
