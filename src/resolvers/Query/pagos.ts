import { Context } from "../../utils";

export default {


    
  pagoes: (parent, args, ctx: Context) => ctx.prisma.pagoes(args),
  pago: (parent, args, ctx: Context) => ctx.prisma.pago(args.where),
};
