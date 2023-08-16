const baseUrl =
    process.env.NODE_ENV !== "production" ?
    "http://localhost:3000" :
    "https://social-webapp-zk5f.onrender.com";

module.exports = baseUrl;