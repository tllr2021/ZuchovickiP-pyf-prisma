import { Context } from "../../utils";

export default {
   
    Cine: (parent, args, ctx: Context) => ctx.prisma.ordenDulceria({id:parent.id}).Cine(),
    

};