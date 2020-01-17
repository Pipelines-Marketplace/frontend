const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const path=require('path');
const port = 3000;

const url=process.env.REACT_APP_BACKEND_API;

app.use(express.static(path.join(__dirname, 'build')));

// 1. Get all resources
app.get(
    '/resources',
    proxy({target: url, changeOrigin: true}),
);

// 2. Get all tags
app.get(
    '/tags',
    proxy({target: url, changeOrigin: true}),
);

// 3. Get all resources with verified and not verified
app.get(
    '/resources/:type/:verified?tags=|',
    proxy({target: url, changeOrigin: true}),
);

// 4. Get details of particular resource
app.get(
    '/resource/:id',
    proxy({target: url, changeOrigin: true}),
);

// 5. Get yaml file
app.get(
    '/resource/yaml/:id',
    proxy({target: url, changeOrigin: true}),
);

// 6. Get readme file
app.get(
    '/resource/readme/:id',
    proxy({target: url, changeOrigin: true}),
);

// 7. Get rating details of resource
app.get(
    '/resource/rating/:id',
    proxy({target: url, changeOrigin: true}),
);

// 8. Initially to rate a resource
app.post(
    '/rating',
    proxy({target: url, changeOrigin: true}),
);

// 9. Change the rating if needed
app.put(
    '/rating',
    proxy({target: url, changeOrigin: true}),
);

// 10. Send the no of stars
app.post(
    '/stars',
    proxy({target: url, changeOrigin: true}),
);

// 11. Upload a resource
app.post(
    '/upload',
    proxy({target: url, changeOrigin: true}),
);

// 12. Github oauth api to login to marketplace
app.post(
    '/oauth/redirect',
    proxy({target: url, changeOrigin: true}),
);

// 13. Delete a reource which the user has uploaded
app.delete(
    '/resource/:id',
    proxy({target: url, changeOrigin: true}),
);

// 14 .Get the resources the user has uploaded
app.get(
    '/resources/user/:id',
    proxy({target: url, changeOrigin: true}),
);

// 15. Get raw path of a resource
app.get(
    '/resource/links/:id',
    proxy({target: url, changeOrigin: true}),
);


app.listen(port, () => console.log(`Backend listening on port ${port}!`));
