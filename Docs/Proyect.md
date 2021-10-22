# Proyecto Cine Prisma

Api de Prisma que permite:

    - Crear y modificar modelos 
    - Crear y Modificar Usuarios
    - Crear y Modificar Colaboradores
    - Administrar Peticiones de Taquillas y Dulcerias

## Modelos

 Todos los modelos tienen sus respectivos Create y Update para crear y modificar los modelos

### Cine

```type Cine {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  name: String!
  Colaborator: Colaborator @relation(name:"CineColab" ,link INLINE)
  room: [Room] @relation(name:"CineRoom" ,link: INLINE)
  ingresosDulceria: Int @default(value:0)
  ingresosTickets: Int @default(value:0)
  available: Boolean @default(value:true)
}
```

### Colaborator
```
type Colaborator {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  name: String!
  nomina: String! @unique
  password: String!
  Cine : Cine! @relation(name:"ColabCine" ,link: INLINE)
  Area : String!
  dias: Int
  pago: Int
  available: Boolean! @default(value : true)
}
```
### Movie
```
type Movie {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  name : String! @unique
  time: Int!
  rates : String!
  director : String!
  available: Boolean @default(value : true)

}
```
### OrdenDulceria
```
ype OrdenDulceria{
    id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  amount : Int!
  items: [String]
  Cine: Cine! @relation(name:"DulceriaCine" ,link: INLINE)
  user: User @relation(name:"DulceriaUser",link:INLINE)

}
```

### Pagos
```
type Pago {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  nomina: String! 
  pago: Int!

}

``` 
### Room
```
type Room {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  number: Int!@unique
  Movie : Movie @relation(name:"RoomMovie" ,link: INLINE)
  available: Boolean! @default(value : true)
}
```
### Seat
```
type Seat {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  Room : Room! @relation(name:"SeatRoom" ,link: INLINE)
  name: String!
  available : Boolean!@default(value:true)
}
```
### Ticket
```
type Ticket {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  seats : [Seat] @relation(name:"TicketSeats",link: INLINE)
  movie : Movie! @relation(name:"TicketMovie",link: INLINE)
  
  cine: Cine! @relation(name:"TickerCine",link: INLINE)
  user: User @relation(name:"TicketUser",link: INLINE)
  price : Int!
  pagoPuntos: Boolean@default(value:false)


}
```
### User
```
type User {
  id: ID! @id
  createdAt: DateTime! @createdAt
  updatedAt: DateTime! @updatedAt
  email: String! @unique
  password: String
  name: String!
  points : Int
  cardStatus: Boolean!@default(value:false)
  available: Boolean @default(value : true)
  
}
```

# Casos de Uso

## Administrativo

### Poder registar un colaborador al cual se le genera un numero de nomina de 5 digitos

```graphql
mutation{
  createColaborator(
    data:{
      name:"Example"
      nomina:"12345"
      password:"12345"
      Cine:{connect:{id:"61733b5aa7b11b000814cd04"}}
      Area:"ExampleArea"
    }
  ){id name nomina}
}
```

### Se puede cambiar el status de un colaborador

```graphql
mutation{
  updateColaborator(
    data:{available:false}
    where:{nomina:"12345"}
  ){id nomina available}
}
```

### Editar un colaborador por numero de nomina

~~~graphql
mutation{
  updateColaborator(
    data:{name:"ExampleUpdated"}
    where:{nomina:"12345"}
  ){id nomina name}
}
~~~

### Se le asigna una nomina a pagar al colaborador basado en el número de días trabajados

~~~graphql
mutation{
  nominaPay(
    dias:25
    where:{nomina:"12345"}
  ){salario colaborator{nomina}}
}
~~~

### Un colaborador tiene un area asignada de trabajo

~~~graphql
{
  colaborators{
    nomina
    Area
  }
}
~~~

### Un colaborador tiene un cine asignado
### Un cine tiene colaboradores asignados
### Un cine puede consultar las finanzas
### Se pueden cancelar tarjetas de lealtad (eg. Tarjeta Fan)
### Un colaborador puede realizar login
### Se pueden registrar puntos en la compra en dulceria o boletos


## Usuario

### Un usuario se puede registar
### Un usuario puede comprar boletos para una pelicula
### Un usuario puede escoger los asientos para su pelicula
### En la compra de boletos se asignan puntos
### En la compra de boletos se pueden utilizar puntos
### Se puenden consultar los puntos de un usuario
### Un usuario tiene una tarjeta donde se registran sus puntos
### Un usuario puede actualizar su contraseña
### Un usuario puede realizar login
### Un usuario puede comprar en dulceria se registra su orden y le registra puntos si proporciona su tarjeta de lealtad



