
import { Context } from "../../utils";

export default {
 
  updateColaborator: (parent, args, ctx: Context) => {
      
    
   return ctx.prisma.updateColaborator(args)

},



  createColaborator: (parent, args, ctx: Context) => {
      
    const nom = args.data.nomina;
    if (isNaN(nom)) {
        
    throw new Error("Nomina debe unicamente numerica");
    }
    if (nom.length==5)  {
        return ctx.prisma.createColaborator(args.data)
    }
    throw new Error("Nomina debe ser 5 numeros unicamente");
    
    
    
},

    
  deleteColaborator: (parent, args, ctx: Context) => ctx.prisma.deleteColaborator(args.where),


   nominaPay:async(parent,args,ctx:Context)=>{

    const dias = args.dias;
    const nomina = args.where.nomina;

    //Salario Promedio de Empleado General de Cine en Mexico 2021 => $173 por dia
    const salario = dias*173;

    const update = await ctx.prisma.updateColaborator(
        {
        where:{nomina:args.where.nomina},
        data:{pago:salario}
        }
    )

    const createPago = await ctx.prisma.createPago(
        {
            nomina:nomina,
            pago:salario
    }   
    )

    return {
        salario:salario,
        colaborator:update
    };

    
  },

};
