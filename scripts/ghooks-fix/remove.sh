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

remove_ghooks_files () {
    for originalHook in ${hooks_dir}/*; do
        if [[ ! $originalHook =~ ^.*\.sample$ ]] ; then
            rm ${originalHook}
            echo "${red}Removed${reset} $originalHook"
        fi
    done
}

if stat -t -- ${hooks_dir}.* >/dev/null 2>&1; then
    echo "${red}>>${reset}No files found to uninstall. Exiting."
    exit
fi

read -r -p "${bold}${red}Warning:${reset} Running this script will delete all active hooks from the ${hooks_dir} directory. If you run this, you'll need to run ${yellow}npm i ghooks${reset} to restore the hooks. Are you sure? ${bold}[y/N]${reset}" response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
then
    remove_ghooks_files
else
    echo "Ok, exiting."
fi
