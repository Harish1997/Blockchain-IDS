const SHA256=require('crypto-js/sha256')


//This reperesents the structure of a block or a node in the Blockchain
class Block{
    constructor(index,timestamp,data,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }
    calculateHash(){
       return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }

}

//This represents all the methods we use to construct and validate a Blockchain
class BlockChain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;
        this.pendingTransactions=[];
        this.miningReward=100;
    }
    createGenesisBlock(){
        return new Block(0,"28/01/2019","Speed_Limit:55,Braking_distance:10,Steering_Angle:0","0");
    }
    addBlock(newBlock){
        newBlock.previousHash=this.getlatestblock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }
    getlatestblock(){
        return this.chain[this.chain.length-1];
    }
    
    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            if(currentBlock.hash!==currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash!==previousBlock.hash){
                 return false;
            }
        }
        return true;
    }
}

module.exports={
    Block:Block,
    BlockChain:BlockChain
}

function getDateNow(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = mm + '/' + dd + '/' + yyyy;
return today;
}

