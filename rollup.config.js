import pkg from './package.json'
import path from 'path'
//Plugins
import alias from '@rollup/plugin-alias'
import vuePlugin from 'rollup-plugin-vue'
import { terser } from "rollup-plugin-terser"
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import copy from 'rollup-plugin-copy'

const isProduction = process.env.BUILD === 'production';

export default {
    input: 'src/app/index.js',
    output: {
        file: 'dist/wape.js',
        format: 'iife',
        name: pkg.name
    },
    plugins: [
        alias({
            entries: [
            { find: 'App', replacement: path.resolve(__dirname, 'src/app/') },
            { find: 'Editor', replacement: path.resolve(__dirname, 'src/editor/') },
            { find: 'Components', replacement: path.resolve(__dirname, 'src/editor/components') }
            ]
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.VUE_ENV': JSON.stringify('browser')
        }),
        copy({
            targets: [
                { src: 'src/app/fontawesome', dest: 'dist' },
                { src: 'src/app/styles', dest: 'dist' },
                { src: 'src/app/templates/index.html', dest: 'dist' },
                { src: 'src/app/templates/iframe.html', dest: 'dist' }
            ]
        }),
        vuePlugin(),
        nodeResolve(),
        commonjs(),
        isProduction && terser()
    ]
};
