import product from "./product"
import category from "./category"
import sale from "./sale"
import order, { orderItem } from "./order"
import coupon from "./coupon"

export const schemaTypes = [category, product, sale, coupon, order, orderItem]
