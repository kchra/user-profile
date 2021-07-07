module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule("file")
            .test(/.(png|jpe?g|gif|webp|avif)$/i)
            .use("file-loader")
            .loader("file-loader");
    },
};
