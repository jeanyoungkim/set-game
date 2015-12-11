
# Enabling git hooks in your git GUI

This is a fix to enable git hooks to run properly in git GUIs (SourceTree, Git Tower etc).

## The issue
We're using `ghooks` (https://github.com/gtramontina/ghooks/)
to manage our git hooks. However, SourceTree and other git GUIs fail to execute the hooks because they don't use the standard shell $PATH and therefore cannot find `node` in order to run ghooks.

## What error will I see?

Triggering a git hook managed by `ghooks` in SourceTree will fail and display an error similar to the following:

    env: node: No such file or directory

See issue for more information:
https://github.com/gtramontina/ghooks/issues/18

## Applying the fix

To correct this issue, execute the fix by running:

    ./scripts/ghooks-fix/fix.sh

This script overwrites ghook's generated files in `.git/hooks/` with a corrected
version that properly sets $PATH. It also saves the original ghooks files with a `.ghooksfix.bak` extension as backup.

## Reverting the fix
If you wish to revert the fix, execute the following:

    ./scripts/ghooks-fix/revert.sh

This script restores the `.ghooksfix.bak` files as active git hooks.

## Uninstalling ghooks files
If you wish to remove the ghooks files entirely, execute the following:

    ./scripts/ghooks-fix/remove.sh

**Caution**: This script will delete all files from the `.git/hooks/` directory (but will leave `<hookname>.sample` files intact). Before you run this script, be sure this is what you want to do.

You can always re-run `npm i ghooks` to reinstate the original ghooks files if in doubt.

## Background on `ghooks`

Traditional git hooks live in the `.git/hooks/` directory which is not tracked by git.

Under normal circumstances, changing a hook file only affects your local machine and there's no easy way to distribute these changes across a team environment without resorting to manual processes or a helper utility.

`ghooks` solves this problem by hijacking all `.git/hooks/<hookname>` files and routing them to `package.json`. There, we can set a specific git hook as follows:

```json
/* package.json */

"config": {
    "ghooks": {
        "pre-push": "npm run lint"
    }
},
```

#### Note:

The `ghooks-fix.sh` script will not touch the `.git/hooks/<hookname>.sample` files (which are automatically generated by git when initializing a new repo).

Also, remember,  `.git/hooks/` directory is not tracked by git, and therefore any changes
you make to these files will stay unless you either
reinstall ghooks or re-run this script.