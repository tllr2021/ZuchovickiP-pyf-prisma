
import { Context } from "../../utils";

export default {
 
  updateOrdenDulceria: (parent, args, ctx: Context) => ctx.prisma.updateOrdenDulceria(args),
  createOrdenDulceria: async(parent, args, ctx: Context) => {
    
    
    //Agregar cantidad gastada a finanzas de Cine
    const amount = args.data.amount;

    var Cine = args.data.Cine.connect.id;
  
    const moneyCine = await ctx.prisma.cine({id:Cine}).ingresosDulceria();

    const total = moneyCine+amount;

    const amountUpdate = await ctx.prisma.updateCine({
        where:{id:Cine},
        data:{ingresosDulceria:+total}
        })
//

//Agregar puntos ganados a usuario

        if(args.data.user==null){
            return ctx.prisma.createOrdenDulceria(args.data)
        }
    else{


    const newAmount = Math.floor(amount*.05) ;

    var user = args.data.user.connect.id;

    const membership = await ctx.prisma.user({id:user}).cardStatus();

    if (membership==false) {
        return ctx.prisma.createOrdenDulceria(args.data)
    }
    else{

    const currentPoints = await ctx.prisma.user({id:user}).points();

    const totalPoints = currentPoints+newAmount;

    const pointsUpdate = await ctx.prisma.updateUser({

        where:{id:user},
        data:{points:totalPoints}
    })
        
    
    return ctx.prisma.createOrdenDulceria(args.data)

    }
}
},
  deleteOrdenDulceria: (parent, args, ctx: Context) => ctx.prisma.deleteOrdenDulceria(args.where),
};
