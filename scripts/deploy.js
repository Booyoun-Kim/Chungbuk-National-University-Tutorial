const hre = require("hardhat");
require('dotenv').config();

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    // 0xe65542396D072e7b6C938CcCa2c32E091C71ff8f
    console.log("Deploying contracts with the account:", deployer.address);

    const tGPC = await hre.ethers.deployContract("tGPC", ["10000000000000000000"]);
    await tGPC.waitForDeployment();
    console.log("tGPC deployed to:", tGPC.target);

    const tUSDT = await hre.ethers.deployContract("tUSDT", ["100000000000000000000000000"]);
    await tUSDT.waitForDeployment();
    console.log("tUSDT deployed to:", tUSDT.target);

    const lending = await hre.ethers.deployContract("Lending", [tGPC.target, tUSDT.target]);
    await lending.waitForDeployment();
    console.log("Lending deployed to:", lending.target);

    

    // 기본 세팅
    // tUSDT -> lending transfer
    const tUSDTAmount = "100000000000000000000000000";
    tUSDT.transfer(lending.target, tUSDTAmount);

    // deployer의 tGPC 잔액 확인
    const deployerTGPCBalance = await tGPC.balanceOf(deployer.address);
    console.log("deployer's tGPC balance:", deployerTGPCBalance.toString());

    // deployer 의 tUSDT 현재 잔액 확인
    const deployerTUSDTBalance = await tUSDT.balanceOf(deployer.address);
    console.log("deployer's tUSDT balance:", deployerTUSDTBalance.toString());

    // 금 deposit
    const depositAmount = "10000000000000000000";
    await tGPC.approve(lending.target, depositAmount);
    await lending.deposit(depositAmount);

    // deployer의 tGPC 잔액 확인
    const deployerTGPCBalance2 = await tGPC.balanceOf(deployer.address);
    console.log("deployer's tGPC balance:", deployerTGPCBalance2.toString());

    // borrow
    const loanAmount = "4900000000000000000";
    await lending.borrow(loanAmount);

    // deployer 의 tUSDT 현재 잔액 확인
    const deployerTUSDTBalance2 = await tUSDT.balanceOf(deployer.address);
    console.log("deployer's tUSDT balance:", deployerTUSDTBalance2.toString());

    // repay
    tUSDT.approve(lending.target, loanAmount);
    await lending.repay(loanAmount);

    // deployer 의 tUSDT 현재 잔액 확인
    const deployerTUSDTBalance3 = await tUSDT.balanceOf(deployer.address);
    console.log("deployer's tUSDT balance:", deployerTUSDTBalance3.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
