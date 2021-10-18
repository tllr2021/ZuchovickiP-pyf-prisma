import { Context } from "../../utils";

export default {
  cines: (parent, args, ctx: Context) => ctx.prisma.cines(args),
  cine: (parent, args, ctx: Context) => ctx.prisma.cine(args.where),
};
