
import { Context } from "../../utils";

export default {
 
  updateSeat: (parent, args, ctx: Context) => ctx.prisma.updateSeat(args.data),
  createSeat: (parent, args, ctx: Context) => ctx.prisma.createSeat(args.data),
  deleteSeat: (parent, args, ctx: Context) => ctx.prisma.deleteSeat(args.data),
};
