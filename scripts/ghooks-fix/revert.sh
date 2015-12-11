#!/usr/bin/env bash

# This script restores .git/hooks to the original ghooks state
# Essentially, it undoes 'fix.sh'

hooks_dir=".git/hooks"
bak_extension="ghookfix.bak"
bold=`tput bold`
reset=`tput sgr0`

files=`ls -1 ${hooks_dir}/*.${bak_extension} 2>/dev/null | wc -l`
if [ $files == 0 ]; then
    echo "No files found. Exiting."
    exit
fi

# restore ghooks version of hooks which have been saved
# as *${bak_extension}
echo "Restoring ghooks files..."
for file in .git/hooks/*; do
    if [[ $file =~ ^.*\.${bak_extension}$ ]] ; then
        mv $file ${file/\.${bak_extension}/}
        echo "Restored $file"
    fi
done
