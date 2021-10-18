
import { Context } from "../../utils";

export default {
 
  updateRoom: (parent, args, ctx: Context) => ctx.prisma.updateRoom(args),
  createRoom: (parent, args, ctx: Context) => ctx.prisma.createRoom(args.data),
  deleteRoom: (parent, args, ctx: Context) => ctx.prisma.deleteRoom(args.where),
  

};
