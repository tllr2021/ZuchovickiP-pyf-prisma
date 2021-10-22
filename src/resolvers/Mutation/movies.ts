
import { Context } from "../../utils";

export default {
 
  updateMovie: (parent, args, ctx: Context) => ctx.prisma.updateMovie(args),
  createMovie: (parent, args, ctx: Context) => ctx.prisma.createMovie(args.data),
  
};
