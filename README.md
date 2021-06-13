![Build and Deploy](https://github.com/jev11/otus-weather-forecast/actions/workflows/deploy.yml/badge.svg)

| Statements                                                                    | Branches                                                                  | Functions                                                                   | Lines                                                               |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg) |

# Otus JS basic course - Weather App homework

## How to build and deploy

Make sure two environment variables are present during the build process:

```bash
export OPEN_WEATHER_KEY=
export GOOGLE_MAPS_KEY=
```

Run `npm run build` and copy dist folder to a required location.

## Project structure

```
.
├── README.md
├── babel.config.js
├── dist
│   └── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── history
│   │   └── index.js
│   ├── index.js
│   ├── location
│   │   └── index.js
│   └── weather
│   └── index.js
├── tests
│   ├── history.test.js
│   ├── location.test.js
│   └── weather.test.js
└── webpack.config.js
```
