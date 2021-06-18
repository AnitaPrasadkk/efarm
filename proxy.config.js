const PROXY_CONFIG = {
    "/assets/json": {
      "target": "http://localhost:4200",
      "secure": false,
      bypass: function(req, res, proxyOptions) {
        if (req.path.indexOf('json') !== -1 && req.method === 'POST') {
          console.log('json -', req.path);
          req.method = 'GET';
        }
      }
    }
};
module.exports = PROXY_CONFIG;
