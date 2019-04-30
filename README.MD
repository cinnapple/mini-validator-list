## Mini Validator List

Please view [Issues](https://github.com/cinnapple/mini-validator-list/issues) for the list of enhancements/bug fixes to be implemented in the future.

For a feature request, please open an issue or reach me on Twitter: [@CinnappleFun](https://twitter.com/CinnappleFun) 😊

### Language support contributors

- Russian (ru) by [@Prosatan666](https://twitter.com/Prosatan666)
- German (de) by [@BenMaouhoub](https://twitter.com/BenMaouhoub)

Thank you for the contribution! 🎉

---

### Run / Develop

#### Prerequisites
Please install the following software before you proceed:
- [Docker](https://www.docker.com/get-started)
- [NodeJS](https://nodejs.org/en/) with the version >= `8.9.0`
- [TypeScript](https://www.typescriptlang.org/)
- [yarn](https://yarnpkg.com/lang/en/)

#### Run

**Important!** 
For Windows users who use `Docker Toolbox`, your local drive must be made available to the host. Follow the detailed instruction here: [Shared Drive](https://gerardnico.com/vm/docker/installation_windows_7?404id=docker%3Ainstallation_windows_7&404type=bestPageName#shared_drive).

1. `git clone https://github.com/cinnapple/mini-validator-list`
2. `cd mini-validator-list`
3.  copy `.env.example` into `.env` (and updated variaabes if necessary)
3.  `bash build-dev.sh` 
4.  `docker-compose up` 

#### Develop: Backend

1. Open a new terminal window
2. Move to `backend` directory
3. Run `yarn install`
4. Run: `yarn run watch`

#### Develop: Frontend
1. Open a new terminal window
2. Move to `frontend` directory
3. Run `yarn install`
4. Run: `yarn run start`
