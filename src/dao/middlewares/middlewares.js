export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

export const isUser = (req, res, next) => {
    if (req.user.role === 'user') {
        return next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}