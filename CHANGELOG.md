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
