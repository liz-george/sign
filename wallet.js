const serviceUtil = require('./service');

async function create(){
    let walletId =  serviceUtil.getApplicationPublicKey();
    console.log('walletId', walletId);
    let mnemonic =  serviceUtil.createNewMnemonic();
    console.log('Mnemonic', mnemonic);

    let credentials = await serviceUtil.convertFromMnemonic(mnemonic, walletId);
    console.log('credentials', credentials );

} 

create();