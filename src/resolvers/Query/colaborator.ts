import { Context } from "../../utils";

export default {
  colaborators: (parent, args, ctx: Context) => ctx.prisma.colaborators(args),
  colaborator: (parent, args, ctx: Context) => ctx.prisma.colaborator(args.where),
};
