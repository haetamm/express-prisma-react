## Project Expressjs | Prisma | Postgres

### Laundry Rest API for [here](https://github.com/THaetami/laundry)

### 1. Project Setup | Backend

```sh
copy .env.example file to .env and edit database credentials there
```

```sh
npm install
```

__Migration Table__


```sh
npx prisma migrate dev
```

__Database Seed__

```sh
node --experimental-modules seeders
```


### 2. Run application

```sh
npm run start
```

__Login with super admin:__
```sh
username: supmin
password: password
```


