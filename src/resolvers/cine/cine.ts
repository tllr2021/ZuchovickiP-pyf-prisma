import { Context } from "../../utils";

export default {
   
    Colaborator: (parent, args, ctx: Context) => ctx.prisma.cine({id:parent.id}).Colaborator(),
   

};