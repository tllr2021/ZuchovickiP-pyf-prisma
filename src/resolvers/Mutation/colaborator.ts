
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
};
