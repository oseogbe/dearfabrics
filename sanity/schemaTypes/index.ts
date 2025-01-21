import product from "./product"
import category from "./category"
import sale from "./sale"
import order, { orderItem } from "./order"
import coupon from "./coupon"
import hero from "./hero"

export const schemaTypes = [category, product, sale, coupon, order, orderItem, hero]
