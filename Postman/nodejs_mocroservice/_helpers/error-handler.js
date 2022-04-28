module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.json({
            status: false,
            message: err,
            data: null
        });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.json({
            status: false,
            message: err.message,
            data: null
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.json({
            status: false,
            message: 'Invalid token',
            data: null
        });
    }

    // default to 500 server error
    return res.json({
        status: false,
        message: err.message,
        data: null
    });
}
