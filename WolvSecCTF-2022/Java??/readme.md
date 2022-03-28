# Java??

description: Java has template engines too!
chall-url: https://wsc-2022-web-3-bvel4oasra-uc.a.run.app/
attachment: src.zip

# Solution

When i look at the `ChallengeApp.java`, i quickly notice that the author mention
the java templates that using in chall. It is `chunk-templates` and version is `3.6.1`.

When i go to repo of chunk-templates, i noticed that the lastest version is `3.6.2`. so i thought maybe there must be CVE about that version. but i can't find it. (**maybe i am such as nerd at googling**)

So, i quickly look the `ChangeLog.txt` of repo and even after the serval hours, i can't find anything. When i was looking at log, it was late mid-night. so i tell myself to try back this chall at morning. when i wake up, i sit back and try back this chall. (**actually, i really don't know that ctf is finished.**)

Then, i was looking about how i can call tag without using `$` cause `$` is blacklisted by below line.

```
return input.replace("$", ""); // we can't use `$`.
``` 

luckily i finally found it in line `218` in ChageLog. [replaces older, unfriendly syntax: {~tag} ...](https://github.com/tomj74/chunk-templates/blob/master/ChangeLog.txt#L218)

So, i used `{~flag}` and got flag. Fun chall!.

`wsc{j4v4_ch4ls_4r3_r4r3_513156}`