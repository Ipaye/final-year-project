import pluginVue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist/**', 'dist_electron/**', 'node_modules/**']
  },
  // 'essential' catches real Vue mistakes (duplicate keys, side effects in
  // computed, invalid template syntax, ...) without imposing a formatter's
  // opinion on attribute wrapping — there's no Prettier step in this repo.
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        MediaRecorder: 'readonly',
        OfflineAudioContext: 'readonly',
        Blob: 'readonly'
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        vi: 'readonly'
      }
    }
  }
];
