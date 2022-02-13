const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

//getting build path
const buildPath = path.resolve(__dirname, "..", "frontend", "src", "ethereum", "build");
console.log(buildPath);
//console.log(__dirname, '..', 'frontend', 'src' ,'ethereum', 'build');
//removing build folder
fs.removeSync(buildPath);

//read campaign.sol
const electionPath = path.resolve(__dirname, "contracts", "Election.sol");
const source = fs.readFileSync(electionPath, "utf8");

const input = {
   language: "Solidity",
   sources: {
      "Election.sol": {
         content: source,
      },
   },
   settings: {
      outputSelection: {
         "*": {
            "*": ["*"],
         },
      },
   },
};
//compile both solidity
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Election.sol"];
//const output = solc.compile(source, 1).contracts;

//building build folder
fs.ensureDirSync(buildPath);

//taking each contract from output

for (let contract in output) {
   fs.outputJSONSync(path.resolve(buildPath, contract + ".json"), output[contract]);
}
