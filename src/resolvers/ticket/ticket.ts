import { Context } from "../../utils";

export default {
    seats: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).seats(),

    movie: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).movie(),
    room: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).room(),
};