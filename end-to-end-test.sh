#!/usr/bin/env bash
set -euxo pipefail

server=$(curl --silent --show-error http://localhost:8080/healthcheck)
test "$server" = "OK"

front=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
test "$front" = 200

: OK