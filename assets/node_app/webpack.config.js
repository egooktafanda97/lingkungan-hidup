const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    Login: "./src/components/Login/index.js",
    dashboard: "./src/components/Dashboard/index.js",
    juru_pungut: "./src/components/juru_pungut/index.js",
    juru_pungut_detai: "./src/components/jurupungut_detail/index.js",
    zona: "./src/components/Zona/index.js",
    usaha: "./src/components/Usaha/index.js",
    laporan_retribusi: "./src/components/LaporanRetribusi/index.js",
    tipe_usaha: "./src/components/Tipe_usaha/index.js",
    LaporanJuruPungut: "./src/components/LaporanJuruPungut/index.js",
    usaha_detail: "./src/components/Usaha_detail/index.js",
    RetribusiNpwrd: "./src/components/RetribusiNpwrd/index.js",
    Timbangan: "./src/components/Timbangan/Timbangan.jsx",
    Truck: "./src/components/Timbangan/Truck.jsx",
    Sender: "./src/components/Timbangan/Sender.jsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      Popper: ["popper.js", "default"],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
