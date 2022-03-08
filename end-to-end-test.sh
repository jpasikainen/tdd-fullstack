#!/usr/bin/env bash
set -euxo pipefail

res=$(curl --silent --show-error http://localhost:8080/healthcheck)
test "$res" = "OK"

: OK