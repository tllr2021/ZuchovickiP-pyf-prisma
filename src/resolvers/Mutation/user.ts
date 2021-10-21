import * as bcrypt from "bcryptjs";
import { Context } from "../../utils";

export default {
  async setPwd(parent, args, ctx: Context) {
    const CurrentPwd = args.data.pwd;
    
    const user = await ctx.prisma.user({email:args.data.email}).password();
    
    const valid = await bcrypt.compare(CurrentPwd, user);

    if(!valid){
      throw new Error(`Datos Incorrectos`);
    }

    


    const  newPwd = args.data.newPwd;
    const password = await bcrypt.hash(newPwd, 10);
    
    return await ctx.prisma.updateUser({ data: { password : password }, where: { email: args.data.email}});
  },
  updateUser: (parent, args, ctx: Context) => ctx.prisma.updateUser(args),
  createUser: (parent, args, ctx: Context) => ctx.prisma.createUser(args.data),
  deleteUser: (parent, args, ctx: Context) => ctx.prisma.deleteUser(args.where),
};
