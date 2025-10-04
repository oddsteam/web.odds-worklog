#!/bin/bash
DIST_PATH="dist/odds-worklog/index.html"
COMMIT_ID=$(git rev-parse --short HEAD)
sed -i -e "s/<!-- COMMIT_ID_PLACEHOLDER -->/<meta name=\"commit-id\" content=\"$COMMIT_ID\">/" "$DIST_PATH"