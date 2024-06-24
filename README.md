# 금 담보 스테이블 코인 Lending Dapp 샘플 구현

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

## Index

1. Hardhat 환경 구축
2. 스마트 컨트랙트 기본 문법
3. ERC와 EIP
4. ERC20 토큰 생성(금 토큰, USD 토큰)
5. 금을 담보로 잡고 deposit된 USD 빌려주기
6. Repay USD