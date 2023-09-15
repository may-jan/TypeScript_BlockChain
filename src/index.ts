// crypto =>  NodeJS 패키지
import crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  // static
  // 클래스 안에서 사용하는 함수인데 클래스 인스턴스 없이도 호출이 가능하다
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    return this.blocks.length === 0
      ? ''
      : this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  public getBlocks() {
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
// class BlockChain → getBlocks() → return this.blocks
// private 요소인 blocks에 마음대로 접근이 가능 (보안 취약)

console.log(blockChain.getBlocks());
