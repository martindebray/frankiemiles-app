import pkg from "./package";

const axios = require("axios");

export default {
  mode: "spa",
  /*
   ** ENV
   */
  env: {
    API: process.env.API
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1"
      },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Gilda+Display|Roboto+Mono:300|Roboto:400,900&display=swap"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "rgba(255,255,255,0)" },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/vue-lazyload", ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "@nuxtjs/style-resources",
    "nuxt-webfontloader"
  ],

  axios: {
    // proxyHeaders: false
  },

  styleResources: {
    scss: ["./assets/styles/*.scss"]
  },

  webfontloader: {
    google: {
      families: ["Roboto:400,900", "Roboto Mono:300, Gilda Display"],
      display: "swap"
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  generate: {
    routes() {
      let data = [];

      return axios
        .get(`https://frankiemiles.debray.space/wp-json/wp/v2/pages`)
        .then(res => {
          res.data.map(page => {
            data.push(page.slug);
          });

          return axios
            .get(`https://frankiemiles.debray.space/wp-json/wp/v2/journal`)
            .then(res => {
              res.data.map(post => {
                data.push(`journal/${post.slug}`);
              });

              return axios
                .get(`https://frankiemiles.debray.space/wp-json/wp/v2/projects`)
                .then(res => {
                  res.data.map(post => {
                    data.push(`projects/${post.slug}`);
                  });
                })
                .then(() => {
                  return data;
                });
            });
        });
    }
  }
};
