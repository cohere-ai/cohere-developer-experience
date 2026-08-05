#!/usr/bin/env bash
set -uo pipefail

MAX_ATTEMPTS="${TRANSIENT_MAX_ATTEMPTS:-3}"
RETRY_DELAY_SECONDS="${TRANSIENT_RETRY_DELAY_SECONDS:-15}"

if [[ "$#" -eq 0 ]]; then
  echo "usage: $0 <muffet command...>" >&2
  exit 2
fi

if [[ ! "${MAX_ATTEMPTS}" =~ ^[1-9][0-9]*$ ]]; then
  echo "TRANSIENT_MAX_ATTEMPTS must be a positive integer" >&2
  exit 2
fi

if [[ ! "${RETRY_DELAY_SECONDS}" =~ ^[0-9]+$ ]]; then
  echo "TRANSIENT_RETRY_DELAY_SECONDS must be a non-negative integer" >&2
  exit 2
fi

WORKDIR="$(mktemp -d)"
trap 'rm -rf "${WORKDIR}"' EXIT

has_transient_failure() {
  local output_file="$1"
  local line
  local result_field
  local lower_result_field

  while IFS= read -r line; do
    result_field="${line}"

    if [[ "${line}" =~ ^[[:space:]]+(.+) ]]; then
      # Muffet result rows are indented and formatted as:
      #   <error-or-status><tab><url>
      # Only classify the error/status field so URL text cannot trigger retries.
      result_field="${BASH_REMATCH[1]}"
      result_field="${result_field%%$'\t'*}"
    elif [[ "${line}" =~ ^https?:// ]]; then
      # Non-indented URL lines identify the source page for following results.
      # They are not errors and should not affect retry classification.
      continue
    fi

    if [[ "${result_field}" =~ ^5[0-9][0-9]$ ]]; then
      return 0
    fi

    # Timeout and connection-level errors are usually emitted as text errors.
    lower_result_field="$(printf '%s' "${result_field}" | tr '[:upper:]' '[:lower:]')"
    if [[ "${lower_result_field}" == *timeout* ]] ||
      [[ "${lower_result_field}" == *"timed out"* ]] ||
      [[ "${lower_result_field}" == *"connection reset"* ]] ||
      [[ "${lower_result_field}" == *"connection refused"* ]] ||
      [[ "${lower_result_field}" == *"unexpected eof"* ]] ||
      [[ "${lower_result_field}" == *"no such host"* ]]; then
      return 0
    fi
  done <"${output_file}"

  return 1
}

attempt=1
while (( attempt <= MAX_ATTEMPTS )); do
  output_file="${WORKDIR}/muffet-attempt-${attempt}.log"

  echo "Running muffet attempt ${attempt}/${MAX_ATTEMPTS}..."
  "$@" 2>&1 | tee "${output_file}"
  status="${PIPESTATUS[0]}"

  if (( status == 0 )); then
    exit 0
  fi

  if ! has_transient_failure "${output_file}"; then
    echo "Muffet failed without retryable transient errors; not retrying." >&2
    exit "${status}"
  fi

  if (( attempt == MAX_ATTEMPTS )); then
    echo "Muffet still found retryable transient errors after ${MAX_ATTEMPTS} attempts." >&2
    exit "${status}"
  fi

  echo "Muffet output contained retryable transient errors; retrying in ${RETRY_DELAY_SECONDS}s..." >&2
  sleep "${RETRY_DELAY_SECONDS}"
  attempt=$((attempt + 1))
done
