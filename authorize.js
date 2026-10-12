export function authorizeModification(req, res, next) {
    const isAuthorized = ((req.user.role === "parent") || (req.user.role === "child" && req.params.userId == req.user.id));
    if (!isAuthorized) {
        return res.status(403).json({"error": "Access denied"});
    }
    next();
};
