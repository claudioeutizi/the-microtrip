var express = require("express");
var router = express.Router();

router.get("/express_backend", (request, response, next) => {
    response.send({express: "EXPRESS AND REACT ARE CONNECTED"});
});

module.exports = router;