//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definindo a rede

//rede principail - mainnet
// const network =bitcoin.networks.bitcoin

//rede de teste
const network = bitcoin.networks.testnet

//deriva��o de carteiras HD
const path = "m/49'/1'/0'/0"


//criando as palavras da seed (mnemonic)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira Gerada")
console.log("Endere�o", btcAddress)
console.log("Chave Privada", node.toWIF())
console.log("Seed", mnemonic)

    