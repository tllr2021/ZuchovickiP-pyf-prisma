import { Context } from "../../utils";

export default {

    movie: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).movie(),
    
    seats: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).seats(),
    cine: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).cine(),
    user: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).user(),
};