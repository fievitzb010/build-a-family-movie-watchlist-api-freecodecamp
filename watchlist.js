import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import { getWatchlist, addMovie, deleteMovie, updateMovie } from "../utils/db.js"
const router = express();

router.use(authenticate);

router.get("/:userId", (req, res, next) => {
    return res.status(200).send(getWatchlist(req.user.id));
});

router.post("/:userId/movies",  authorizeModification, (req, res, next) => {
    addMovie(req.user.id, req.body);
    return res.status(201).json({message: "Movie added"});
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res, next) => {
    updateMovie(req.user.id, req.params.movieId, req.body);
    return res.status(200).json({message: "Movie updated"});
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res, next) => {
    deleteMovie(req.user.id, req.params.movieId);
    return res.status(200).json({message: "Movie deleted"});
});

export default router;
