const { ApolloError, } = require("apollo-server");

import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import { Context } from '../../utils'

export default {
  async signup(parent, args, ctx: Context) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.prisma.createUser({ ...args, password })
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, ctx: Context) {
    try {
      const user = await ctx.prisma.user({ email });
      if (!user) {
        return new ApolloError('Invalid email or password', 'ERR_AUTH')
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        // throw new Error(`Invalid email or password`);
        return new ApolloError('Invalid email or password', 'ERR_AUTH')
      }
      return {
        token: jwt.sign({ userId: user.id }, process.env.APP_SECRET, ),
        user,
      };
    } catch (error) {
      return error;
    }
  },


  async loginAdmin(parent, args, ctx: Context) {
    try {
      const admin = await ctx.prisma.colaborator({ nomina:args.nomina });
      if (!admin) {
        return new Error('Invalid email or password')
      }
      const valid = await bcrypt.compare(args.password, admin.password);
      if (!valid) {
        // throw new Error(`Invalid email or password`);
        return new Error('Invalid email or password')
      }
      return {
        token: jwt.sign({ adminId: admin.id }, process.env.APP_SECRET, ),
        colaborator:admin,
      };
    } catch (error) {
      return error;
    }
  },

  
}
