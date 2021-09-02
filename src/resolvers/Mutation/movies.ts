
import { Context } from "../../utils";

export default {
 
  updateMovie: (parent, args, ctx: Context) => ctx.prisma.updateMovie(args.data),
  createMovie: (parent, args, ctx: Context) => ctx.prisma.createMovie(args.data),
  deleteMovie: (parent, args, ctx: Context) => ctx.prisma.deleteMovie(args.data),
};
