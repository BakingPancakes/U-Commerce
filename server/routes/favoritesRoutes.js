import { Router } from "express";
import { createFavorite, deleteFavorite, getFavoritesByUserID } from "../controllers/favoritesController.js";

const router = Router();

router.post('/', createFavorite);
router.get('/:id', getFavoritesByUserID);
router.delete('/:id', deleteFavorite);

export default router;