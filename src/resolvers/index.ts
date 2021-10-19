import { Subscription } from './Subscription'

const path = require("path");
const { mergeResolvers, fileLoader } = require("merge-graphql-schemas");

const resolversQuery = fileLoader(path.join(__dirname, "./Query/**/*.ts"));
const Query = mergeResolvers(resolversQuery);

const resolversMutation = fileLoader(path.join(__dirname, "./Mutation/**/*.ts"));
const Mutation = mergeResolvers(resolversMutation);

const resolversRoom = fileLoader(path.join(__dirname, "./room/**/*.ts"));
const Room = mergeResolvers(resolversRoom);

const resolversTicket = fileLoader(path.join(__dirname, "./ticket/**/*.ts"));
const Ticket = mergeResolvers(resolversTicket);

const resolversCine = fileLoader(path.join(__dirname, "./cine/**/*.ts"));
const Cine = mergeResolvers(resolversCine);

const resolversColaborator = fileLoader(path.join(__dirname, "./colaborator/**/*.ts"));
const Colaborator = mergeResolvers(resolversColaborator);


const resolversOrdenDulceria = fileLoader(path.join(__dirname, "./ordenDulceria/**/*.ts"));
const OrdenDulceria = mergeResolvers(resolversOrdenDulceria);

const resolversSeat = fileLoader(path.join(__dirname, "./seat/**/*.ts"));
const Seat = mergeResolvers(resolversSeat);

export default {
  Query,
  Mutation,
  Subscription,
  Room,
  Ticket,
  Cine,
  Colaborator,
  OrdenDulceria,
  Seat
  
};
