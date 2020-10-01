# 10314

To reproduce, clone this repo, then:

* `npm install` in root of repository, then `tsc` to typescript compile.
* `cd example-app` and `npm install && tsc && cdk diff`

You should see the error:

```
unable to determine cloud assembly output directory. Assets must be defined indirectly within a "Stage" or an "App" scope
Subprocess exited with error 1
```