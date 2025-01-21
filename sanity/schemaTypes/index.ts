import product from "./product"
import category from "./category"
import sale from "./sale"
import order, { orderItem } from "./order"
import coupon from "./coupon"
import hero from "./hero"
import rate from "./rate"

export const schemaTypes = [hero, category, product, sale, rate, coupon, order, orderItem]
