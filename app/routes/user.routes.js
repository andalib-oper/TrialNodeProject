module.exports = (app) => {
    const auth = require("../controllers/auth.controller.js");
    const verifyToken = require('../middleware/authJWT.js');
    // Register user
    app.post('/api/auth/register', auth.signup);

    // login user
    app.post('/api/auth/login', auth.signin);

    app.get("/api/auth/hiddencontent", [verifyToken.verifyToken],auth.token);
}