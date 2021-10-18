
import { Context } from "../../utils";

export default {
 
  updateCine: (parent, args, ctx: Context) => ctx.prisma.updateCine(args),
  createCine: (parent, args, ctx: Context) => ctx.prisma.createCine(args.data),
  deleteCine: (parent, args, ctx: Context) => ctx.prisma.deleteCine(args.where),
};
