import { Router } from "express";

import products from "./products.js"


const router = Router()

router.use('/', products)
router.use('/api/products', products)



export default router