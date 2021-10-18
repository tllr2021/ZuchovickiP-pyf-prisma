import { Context } from "../../utils";

export default {
   
    Cine: (parent, args, ctx: Context) => ctx.prisma.colaborator({id:parent.id}).Cine(),
   

};