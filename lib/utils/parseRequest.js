module.exports = rawRequest => {
    const [method, path] = rawRequest.split('\n')[0].split(' ');
    if (rawRequest.split('\r')[2]) {
        const body = rawRequest.split('\r')[2].split('\n')[1];
        return { method, path, body };
    }
    return { method, path };
};
