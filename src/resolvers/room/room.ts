import { Context } from "../../utils";

export default {
   
    Movie: (parent, args, ctx: Context) => ctx.prisma.room({id:parent.id}).Movie(),
    Seat: (parent, args, ctx: Context) => ctx.prisma.room({id:parent.id}).Seat(),

};