## About The Project

Frontend for NFT collection mint and listing

### Built With

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [ThirdWeb](https://thirdweb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Pinata](https://www.pinata.cloud/)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Install Node v20](https://heynode.com/tutorial/install-nodejs-locally-nvm)

### Installation

- Clone this repository and naviate to the folder
- Install `node_modules` by running

```bash
npm install
// or
yarn install
```

### Configuration

- Create `.env` file, You can rename the file called `.env.example` to `.env`
- Create ThirdWeb project and update `NEXT_PUBLIC_THIRDWEB_PROJECT_ID` in `.env` file with your own value
  [How to get thirdweb api key](https://portal.thirdweb.com/api-keys)
- Create ThirdWeb project and update `PINATA_JWT` in `.env` file with your own JWT value
  [How to generate Pinata JWT token](https://knowledge.pinata.cloud/en/articles/6191471-how-to-create-an-pinata-api-key)

### Finally run the app

- Once you have successfully completed the steps mentioned above, you can start the application by executing the following command:

```bash
npm run dev
// or
yarn dev
```

### Build and deploy

- You can build the project by running following command:

```bash
npm run build
// or
yarn build
```

- Then upload `dist` folder to your server
- Or you can use [Vercel](https://vercel.com/) easily for the deployment
