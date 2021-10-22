
import { Context } from "../../utils";

export default {
 
  updatePago: (parent, args, ctx: Context) => ctx.prisma.updatePago(args),
  createPago: (parent, args, ctx: Context) => ctx.prisma.createPago(args.data),
  
};
