
import { Context } from "../../utils";

export default {
 
  updateTicket: (parent, args, ctx: Context) => ctx.prisma.updateTicket(args.data),
  createTicket: (parent, args, ctx: Context) => ctx.prisma.createTicket(args.data),
  deleteTicket: (parent, args, ctx: Context) => ctx.prisma.deleteTicket(args.data),
};
