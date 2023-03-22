<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/terryhycheng/bank-tech-test">
    <img src="asset/icon.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">Bank Tech Test - Bank App</h3>
<p>All-in-one solution for managing your financial records</p>

  <p align="center">
    <a href="https://github.com/terryhycheng/bowling-challenge/issues">Report Bug</a>
    ·
    <a href="https://github.com/terryhycheng/bowling-challenge/issues">Request Feature</a>
  </p>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Tests](#running-tests)
  - [Production Build](#production-build)
  - [Run the programme](#run-the-programme)
- [Contributing](#contributing)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

Bank App is designed to simplify your financial management, making it easier for you to stay on top of your finances.

It offers a range of features, including:

1. the ability to **create multiple user accounts**, where each account can have its own set of records.
2. You can easily **print out statements** and check the balance of each account.
3. You can **insert records on different dates**, ensuring that all your financial transactions are accurately recorded and organized.

Addtinally, with a test coverage of over 95% and built with `Typescript`, you can be confident that this program has been thoroughly tested, type-saved and is ready for use.

### Built With

This project was built with the following tools:

- [![Typescipt][typescript-shield]][typescript-url]
- [![Jest][jest-shield]][jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This section shows you how to set up this project locally. First, get a local copy up and running follow these simple steps.

### Prerequisites

You have to make sure that `npm` and `node` have been installed in your local machine before running the project. If not, follow the steps below.

- npm

  ```sh
  npm install npm@latest -g
  npm -v
  ```

- nvm & node
  ```sh
    # visit https://github.com/nvm-sh/nvm on how to install nvm
    nvm install node
    node -v
  ```

---

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/terryhycheng/bank-tech-test.git
   cd bank-tech-test
   ```
2. Install NPM packages

   ```sh
   npm install

   # OR

   yarn
   ```

---

### Running Tests

Before compiling the codes into production-ready Javascript, you should run the tests and make sure every line can be run without causing any errors.

1. Run the tests

   ```sh
   npm run test

   # OR

   yarn test
   ```

Then, test coverage reports will be automatically generated in the folder `coverage`. If you want to turn this function off, you can modify the setting in `package.json` to remove `--coverage` in `test` command.

---

### Production Build

This project was built with `Typescript`. You have to covert all TS codes into JS before passing to deployment.

1. Build with Typescript

   ```sh
   npm run build

   # OR

   yarn build
   ```

All production-ready Javascript codes will be put in the folder `dist`.

---

### Run the programme

You can simply run the programme by the following command:

```sh
npm run start

# OR

yarn start
```

The programme will run the demo sample in `src/main.ts`. You can modify the file to start using this programme.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Terry Cheng - [@terryhycheng](https://twitter.com/terryhycheng) - terryhycheng@gmail.com

Project Link: [https://github.com/terryhycheng/bank-tech-test](https://github.com/terryhycheng/bank-tech-test)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[typescript-shield]: https://img.shields.io/badge/Typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[jest-shield]: https://img.shields.io/badge/jest-c21325?style=for-the-badge&logo=jest&logoColor=white
[jest-url]: https://jestjs.io/
