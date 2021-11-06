## 0.1.3
+ Fix: `mod.ts` module import
+ Removed useless badges on readme
+ Removed `jest-ts-webcompat-resolver`

## 0.1.2
+ Refactor: rollback hidding `.js` extension on all imports
+ Fix: `mod.ts` now loads from `dist/esm/selic.js`

## 0.1.1
+ Fix deno `mod.ts` module export
+ Refactor: removed `dist` from `.gitignore`
+ Refactor: set only `ubuntu-latest` and `window-latest` for `ci.yml`

## 0.1.0
+ Feature: Added support for Deno.js via https://deno.land/x/selic
+ Feature: Added dependabot plugin
+ Refactor: changed test errors code thanks by [maico910](https://github.com/caio-ribeiro-pereira/selic/pull/12)
+ Refactor: update devDependencies version
+ Refactor: drop support for node v11
+ Refactor: changed travis-ci to github actions

## 0.0.14
+ Feature: added IPCA rate from BCB api

## 0.0.13
+ Fix build and publish flow

## 0.0.12
+ Refactor: Changed `selic.ts` class verion to module version
+ Refactor: Moved number toFixed from Selic to bcb and cetip fetchers
+ Refactor: Moved types `RatesObject` and `RatesList` to `types.ts`

## 0.0.11
+ Fix build and publish flow

## 0.0.10
+ Fix `getRatesObject()` method name

## 0.0.9
+ Feature: added `getRatesObject()`
+ Refactor: removed poupança rates

## 0.0.8
+ Refactor: Added `Promise.all` on `getAllRates()` for parallel requests
+ Refactor: removed `calculateCdiRate()`
+ Refactor: added `cetip` module to fetch cdi rate from cetip's api
+ Fix: eslint typescript `tsconfig.json` which was not working on vscode

## 0.0.7
+ Refactor: renamed `scrapRates()` to `getAllRates()` thanks by [maico910](https://github.com/caio-ribeiro-pereira/selic/pull/5)
+ Refactor: Drop support Node `v10`
+ Refactor: Added support to Node `v11`, `v15` and `v17`
+ Refactor: removed `eslint-airbnb-base`

## 0.0.6
+ Feature: changed `import Selic` to `import { Selic } from 'selic'`
+ Feature: added `selic.getCdiRate()`
+ Feature: added `selic.getPoupancaRate()`

## 0.0.5
+ Fix added `Types` support on build

## 0.0.4
+ Feature: Added `TypeScript` support
+ Feature: Added `ESM import`
+ Update: Changed `Mocha/Sinon/Chai` to `Jest`
+ Update: Changed `Sinon stubs` to `HTTP Nock`

## 0.0.3
+ Fix badges links on readme
+ Fix user agent when requests data from `bcb api`

## 0.0.2
+ Update readme and badges
+ Update node versions for `TravisCI`

## 0.0.1
+ First commit
