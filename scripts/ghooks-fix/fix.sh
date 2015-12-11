#!/usr/bin/env bash

# Directories
hooks_dir=".git/hooks"
ghooks_npm_dir="node_modules/ghooks"

# Files and extensions
bak_extension="ghookfix.bak"
corrected_hook="scripts/ghooks-fix/corrected"

# Output formatting
red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

# Exit if ghooks npm package is not installed
if [ ! -d $ghooks_npm_dir ]; then
    echo "${red}Error:${reset} Please install ghooks before running this script: ${yellow}npm i ghooks${reset}"
    exit
fi

# Exit if we find hook files with ${bak_extension}, implying that user has already run this script
if ls ${hooks_dir}/*.${bak_extension} 1> /dev/null 2>&1; then
    echo "${red}Error:${reset} Found files with ${bak_extension} extension. This means you've likely run this script already. First run ${yellow}revert.sh${reset} to restore the original ghooks, then re-run this script."
    exit
fi

# Exit if we can't locate the ghooks-generated files at all (ie hook files with no extension)
# TODO: fix. This doesn't work...
if stat -t -- ${hooks_dir}.* >/dev/null 2>&1; then
    echo "${red}Error:${reset} Looks like you don't have the ghooks files in your ${hooks_dir} directory. Run ${yellow}npm i ghooks${reset} before running this script"
    exit
fi

# Looks like everything is in order. Let's implement the fix
# and replace ghooks-generated hooks with fixed hooks
echo "${bold}Applying fix to ghooks-generated files...${reset}"
for originalHook in ${hooks_dir}/*; do
    if [[ ! $originalHook =~ ^.*\.(sample|${bak_extension})$ ]] ; then
        # make a backup of original ghooks file
        cp -f $originalHook ${originalHook}.${bak_extension}

        # implement fix
        cp -f $corrected_hook $originalHook

        echo "Successfully fixed $originalHook"
    fi
done
