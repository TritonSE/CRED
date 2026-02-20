# This config file is sourced by the pre-commit script.
# shellcheck disable=SC2034,SC2148

# Change 1 to 0 to disable linting.
enabled=1

# Directories containing JavaScript projects to be linted, separated by spaces.
node_dirs='backend frontend'

# Command used to run a lint check.
check_command='npm run lint-check'

# Command used to autofix lint errors.
fix_command='npm run lint-fix'

# Escape sequences for formatted output.
# The tput commands may fail in environments where TERM is not set (e.g. CI).
# Use || true so that 'sh -e' does not abort on failure.
format_error="$(tput setaf 3 2> /dev/null)" || true
format_warn="$(tput setaf 1 2> /dev/null)" || true
format_clear="$(tput sgr0 2> /dev/null)" || true

# Return 0 explicitly to indicate that the config was sourced successfully.
return 0