
import { Context } from "../../utils";

export default {
 
  updateTicket: (parent, args, ctx: Context) => ctx.prisma.updateTicket(args),
  createTicket: async(parent, args, ctx: Context) => {
    
    //Agregar cantidad gastada a finanzas de Cine
    const amount = args.data.price;

    var Cine = args.data.cine.connect.id;
  
    const moneyCine = await ctx.prisma.cine({id:Cine}).ingresosTickets();

    const total = moneyCine+amount;

    const amountUpdate = await ctx.prisma.updateCine({
        where:{id:Cine},
        data:{ingresosTickets:total}
        })
//

//Agregar puntos ganados a usuario

        if(args.data.user==null){
            return ctx.prisma.createTicket(args.data)
        }
    else{


    const newAmount = Math.floor(amount*.05) ;

    var user = args.data.user.connect.id;

    const membership = await ctx.prisma.user({id:user}).cardStatus();

    if (membership==false) {
        return ctx.prisma.createTicket(args.data)
    }
    else{

    const currentPoints = await ctx.prisma.user({id:user}).points();


    //Evaluación de Pago con Puntos y en caso de no tner Puntos suficientes Lanzar error

    if (args.data.pagoPuntos==true) {
        
         var saldo = currentPoints - amount;
        if (saldo<0) {
            saldo = saldo*(-1)

            args.data.price=saldo
            const pointsUpdate = await ctx.prisma.updateUser({

                where:{id:user},
                data:{points:0}
            })
            return ctx.prisma.createTicket(args.data)
        }
        else{
            args.data.price=0
            const pointsUpdate = await ctx.prisma.updateUser({

                where:{id:user},
                data:{points:saldo}
            })
            
            return ctx.prisma.createTicket(args.data)
        }

    }


    const totalPoints = currentPoints+newAmount;

    const pointsUpdate = await ctx.prisma.updateUser({

        where:{id:user},
        data:{points:totalPoints}
    })
        
    
    return ctx.prisma.createTicket(args.data)

    }
}
    
  
  
  },
  deleteTicket: (parent, args, ctx: Context) => ctx.prisma.deleteTicket(args.where),
};
