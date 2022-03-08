#!/usr/bin/env bash
set -euxo pipefail

server=$(curl --silent --show-error http://localhost:8080/healthcheck)
test "$server" = "OK"

: OK