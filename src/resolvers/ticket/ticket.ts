import { Context } from "../../utils";

export default {

    movie: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).movie(),
    room: (parent, args, ctx: Context) => ctx.prisma.ticket({id:parent.id}).room(),
};