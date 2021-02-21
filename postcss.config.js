const postcssConfig = {
    plugins: [
        require('autoprefixer'),
        require('tailwindcss')
    ],
};

if (process.env.NODE_ENV === 'production') {
    postcssConfig.plugins.push(
        require('cssnano')({
            preset: 'default',
        })
    );
}
module.exports = postcssConfig;
// module.exports = {
//     plugins: [
//         require('autoprefixer'),
//         require('cssnano')({
//             preset: 'default',
//         }),
//     ],
// };
