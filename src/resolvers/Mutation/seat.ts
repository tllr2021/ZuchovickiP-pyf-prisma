
import { Context } from "../../utils";

export default {
 
  updateSeat: (parent, args, ctx: Context) => ctx.prisma.updateSeat(args),
  createSeat: (parent, args, ctx: Context) =>ctx.prisma.createSeat(args.data),
  
  

};
