const baseUrl =
    process.env.NODE_ENV !== "production" ?
    "http://localhost:3000" :
    "https://mini-social-media-web.herokuapp.com";

module.exports = baseUrl;