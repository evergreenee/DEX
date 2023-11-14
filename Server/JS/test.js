const rchainToolkit = require('@fabcotech/rchain-toolkit');
const rchainToolkit_rev = require('@fabcotech/rchain-toolkit/dist/utils/revAddressFromPublicKey.js');
const fs = require('fs');

const PRIVATE_KEY = 'ff4f34178a87e9dc4d949c09bd8bcec731494b48f4680544dff35f36324ddb4c';
const PUBLIC_KEY = rchainToolkit.utils.publicKeyFromPrivateKey(PRIVATE_KEY);
const addr = rchainToolkit_rev.revAddressFromPublicKey(PUBLIC_KEY);

console.log(PUBLIC_KEY);
console.log(addr);