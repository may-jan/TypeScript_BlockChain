"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// crypto =>  NodeJS 패키지
const crypto_1 = __importDefault(require("crypto"));
class Block {
    constructor(prevHash, height, data) {
        this.prevHash = prevHash;
        this.height = height;
        this.data = data;
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    // static
    // 클래스 안에서 사용하는 함수인데 클래스 인스턴스 없이도 호출이 가능하다
    static calculateHash(prevHash, height, data) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto_1.default.createHash('sha256').update(toHash).digest('hex');
    }
}
class BlockChain {
    constructor() {
        this.blocks = [];
    }
    getPrevHash() {
        return this.blocks.length === 0
            ? ''
            : this.blocks[this.blocks.length - 1].hash;
    }
    addBlock(data) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    getBlocks() {
        // return this.blocks; // 그냥 blocks 배열을 반환하면 보안에 취약
        return [...this.blocks]; // private blocks를 새로운 배열로 반환
    }
}
const blockChain = new BlockChain();
blockChain.addBlock('First Add');
blockChain.addBlock('Second Add');
blockChain.addBlock('Third Add');
blockChain.addBlock('Forth Add');
blockChain.getBlocks().push(new Block('xxxxx', 5, 'HACKED!'));
// BlockChain 클래스 -> getBlocks() -> this.blocks
// private 요소인 blocks에 마음대로 접근이 가능 (보안 취약)
console.log(blockChain.getBlocks());
