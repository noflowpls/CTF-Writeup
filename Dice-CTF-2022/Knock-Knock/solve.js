const crypto = require('crypto');
secret = `secret-${crypto.randomUUID}`;

console.log(`${crypto.createHmac('sha256', secret).update('0').digest('hex')}`);