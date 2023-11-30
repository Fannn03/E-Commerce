# Table of Contents

1. [Introductions](#introductions)
2. [Setup project](#setup-project)
3. [Running programs](#running-programs)

## Introductions

This project is created for the completion of a coding test project given by Averin Information Technology. The main feature :

- User can create account.
- User can create store.
- User can post or create their own products.

This is not a completed project like most common e-commerce applications, due to time constraints. However, I hope that with this, it already encompasses some features from several e-commerce applications.

## Setup project

Before using this program, i recommended you to follow these steps :

- Clone this project using HTTPS `https://github.com/Fannn03/E-Commerce.git`.

- Change directory `cd E-Commerce`.

- Install dependencies `npm install`.

- Create `.env` on your root directory project, copy `.env example` file content to `.env` file.

- Running migration using prisma migration `npx prisma migrate dev`.

- We recommend that you keep both the prisma and @prisma/client packages in sync to avoid any unexpected errors or behaviors. `npx prisma generate`.

- That's it, now running program. See [running program](#running-programs) for details information.

## Running programs

- `npm run dev` Running program in development mode.

- `npm run build` Build typescript into javascript.

- `npm run start` Running program in production, must be `build` to javascript first using `npm run build`.