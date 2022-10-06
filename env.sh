#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment
echo "window._env_ = {" >> ./env-config.js

write_to_js () {
    # Split env variables by character `=`
  if printf '%s\n' "$1" | grep -q -e '='; then
    varname=$(printf '%s\n' "$1" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$1" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js
}

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  write_to_js $line
done < <(printenv | grep VUE_APP)

FILE=.env
if test -f "$FILE"; then
  while read -r line || [[ -n "$line" ]];
  do
    write_to_js $line
  done < <(cat .env | grep VUE_APP)
fi

echo "}" >> ./env-config.js
