// Service to generate a new mnemonic and generate public and private keys for Bitcoin, Ethereum and Private blockchain.
const bip39 = require('bip39');
const uuid = require('short-uuid');
const bip32 = require('bip32');
const Bitcoin = require('bitcoinjs-lib');
// const hdKey = require('ethereumjs-wallet');
const hdKey = require('ethereumjs-wallet/hdkey');

exports.createNewMnemonic = () => {
    const mnemonic = bip39.generateMnemonic();
    return mnemonic;
  };

  exports.getApplicationPublicKey = () => uuid().generate();

let BTC  = Bitcoin.networks.testnet;
exports.convertFromMnemonic = async (mnemonic, id) => {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw Error('Invalid Mnemonic Seed');
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    console.log('Seed', seed);
  
    return {
      BTC: convertToBitcoin(seed, BTC, "m/44'/1'/0'/0/0"),
      WATT: convertToEthereum(seed, "m/44'/6060'/0'/0"),
      ETH: convertToEthereum(seed, "m/44'/60'/0'/0/0"),  
    };
  };

  const convertToBitcoin = (seed, network, path) => {
    const wif = bip32
      .fromSeed(seed, network)
      .derivePath(path)
      .toWIF();
    const keyPair = Bitcoin.ECPair.fromWIF(wif, network);
    const {
      address
    } = Bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network,
    });
    return {
      publicKey: address,
      privateKey: wif,
    };
  };

  const convertToEthereum = (seed, path) => {
    const keyPair = hdKey.fromMasterSeed(seed).derivePath(path);
    return {
      publicKey: keyPair.getWallet().getAddressString(),
      privateKey: keyPair.getWallet().getPrivateKeyString(),
    };
  };
