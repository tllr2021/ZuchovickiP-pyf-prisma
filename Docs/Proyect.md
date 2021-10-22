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

~~~graphql
{
  colaborators{
    nomina
    Cine{
      id
      name
    }
  }
}
~~~

### Un cine tiene colaboradores asignados

~~~graphql
mutation{
  updateCine(
    data:{
      Colaborator:{connect:{nomina:"12345"}}
    }
    where:{id:"61733b5aa7b11b000814cd04"}
  ){name Colaborator{nomina}}
}
~~~

### Un cine puede consultar las finanzas

~~~graphql
{cines{
  
  ingresosTickets
  ingresosDulceria
}}
~~~

### Se pueden cancelar tarjetas de lealtad (eg. Tarjeta Fan)

~~~graphql
mutation{
  changeTarjetaStatus(
    status:false
    where:{id:"61724756a7b11b000814ccee"}
  ){status id}
}
~~~

### Un colaborador puede realizar login
~~~graphql
mutation{
  loginAdmin(
    nomina:"12345"
    password:"12345"
    
  ){token}
}
~~~


## Usuario

### Un usuario se puede registar
~~~graphql
mutation{
  signup(
    email:"Examples@mail.com"
    password:"12345"
    name:"Example"
  ){token user{email}}
}
~~~

### Un usuario puede comprar boletos para una pelicula y escoger los asientos para su pelicula

~~~graphql
mutation{
  createTicket(
    data:{
      seats:{connect:[{id:"617343fca7b11b000814cd0f"},{id:"61734580a7b11b000814cd10"}]}
      movie:{connect:{name:"Harry Potter I"}}
      cine:{connect:{id:"61733b5aa7b11b000814cd04"}}
      price:42
    }
  ){id movie{name} seats{name} cine{name} price}
}
~~~

### En la compra de boletos se asignan puntos

~~~graphql
mutation{
  updateUser(
    data:{cardStatus:true}
    where:{id:"61733a33a7b11b000814cd03"}
  ){id cardStatus}
}

mutation{
  createTicket(
    data:{
      seats:{connect:[{id:"617343fca7b11b000814cd0f"},{id:"61734580a7b11b000814cd10"}]}
      movie:{connect:{name:"Harry Potter I"}}
      cine:{connect:{id:"61733b5aa7b11b000814cd04"}}
      price:42
      user:{connect:{id:"61733a33a7b11b000814cd03"}}
    }
  ){id movie{name} seats{name} cine{name} price user{points}}
}
~~~

### En la compra de boletos se pueden utilizar puntos

~~~graphql
mutation{
  createTicket(
    data:{
      seats:{connect:[{id:"617343fca7b11b000814cd0f"},{id:"61734580a7b11b000814cd10"}]}
      movie:{connect:{name:"Harry Potter I"}}
      cine:{connect:{id:"61733b5aa7b11b000814cd04"}}
      price:42
      user:{connect:{id:"61733a33a7b11b000814cd03"}}
      pagoPuntos:true
    }
  ){id movie{name} seats{name} cine{name} price user{points}}
}
~~~

### Se puenden consultar los puntos de un usuario

~~~graphql
{user(
  where:{email:"Examples@mail.com"}
){name points}
}
~~~

### Un usuario tiene una tarjeta donde se registran sus puntos

~~~graphql
{users{
  id
  name
  cardStatus
  points
}

}
~~~

### Un usuario puede actualizar su contraseña

~~~graphql
mutation{
  setPwd(
    data:{
      pwd:"12345"
      newPwd:"123456"
      email:"Examples@mail.com"
    }
  ){updatedAt password}
}
~~~

### Un usuario puede realizar login
~~~graphql
mutation{
  login(
    email:"Examples@mail.com"
    password:"123456"
  ){token}
}
~~~
### Un usuario puede comprar en dulceria se registra su orden y le registra puntos si proporciona su tarjeta de lealtad

~~~graphql
mutation{
  createOrdenDulceria(
    data:{
      amount:80
      items:{set:["Example1","Example2"]}
      Cine:{connect:{id:"61733b5aa7b11b000814cd04"}}
      user:{connect:{id:"61733a33a7b11b000814cd03"}}
    }
  ){amount}
}
~~~


