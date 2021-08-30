#!/bin/bash

########################################
# Create a file based on the environment variables
# given by the dockerc run -e parameter
########################################
cat <<EOF
window.VUE_APP_ENV_T1C_URL="${VUE_APP_T1C_URL}"
window.VUE_APP_ENV_T1C_PORT="${VUE_APP_T1C_PORT}"
window.VUE_APP_ENV_API_KEY="${VUE_APP_API_KEY}"
window.VUE_APP_ENV_DS_URL="${VUE_APP_DS_URL}"
EOF
