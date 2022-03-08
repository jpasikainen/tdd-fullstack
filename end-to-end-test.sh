#!/usr/bin/env bash
set -euxo pipefail

front=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/healthcheck)
test "$front" = 200
server=$(curl --silent --show-error http://localhost:8080/healthcheck)
test "$server" = "OK"

: OK