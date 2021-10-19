import { Context } from "../../utils";

export default {
   
    Room : (parent, args, ctx: Context) => ctx.prisma.seat({id:parent.id}).Room()
   

};