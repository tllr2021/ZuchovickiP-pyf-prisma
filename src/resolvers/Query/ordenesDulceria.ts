import { Context } from "../../utils";

export default {
  ordenDulcerias: (parent, args, ctx: Context) => ctx.prisma.ordenDulcerias(args),
  ordenDulceria: (parent, args, ctx: Context) => ctx.prisma.ordenDulceria(args.where),
};
