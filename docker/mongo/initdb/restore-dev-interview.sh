#!/bin/sh
set -e

echo "Restoring dev-interview MongoDB dump..."
mongorestore --db dev-interview /dump/dev-interview
echo "dev-interview MongoDB dump restored."
