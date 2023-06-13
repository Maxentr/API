# ExpTrack

ExpTrack is a web application for school that allows you to track your expenses. You can have groups of friends to share expenses with, and you can add expenses to these groups. You can also add friends to your groups.

## Technical choices

[Nest.js](https://nestjs.com/) is used for the backend, it allows to have a clean and structured code. It also allows to have a good separation between the different layers of the application. For the database, I used [SQLite](https://www.sqlite.org/index.html) because it is easy to use and it is not necessary to have a database server. [Prisma](https://www.prisma.io/) is used to communicate with the database, it allows to have a clean code and to have a good separation between the database and the rest of the application. To validate the incoming data, I used [zod](https://zod.dev/).

## Installation

### Prerequisites

| Name                              | Version  |
| --------------------------------- | -------- |
| [Node.js](https://nodejs.org/en/) | v18.12.0 |
| [pnpm](https://pnpm.io/)          | v8.4.0   |

### Environment variables

Copy and rename `.env.example` to `.env` and fill the variables.

### Install dependencies

```bash
pnpm install
```

### Generate Prisma client

```bash
pnpm prisma generate
```

### Run migrations

```bash
pnpm prisma migrate dev
```

### Run the app

```bash
pnpm dev
```
