#!/bin/sh
# wait-for-mysql.sh

set -e

host="$1"
shift
cmd="$@"

until mysqladmin ping -h "$host" --silent; do
  echo "MySQL is unavailable - sleeping"
  sleep 1
done

echo "MySQL is up - executing command"
exec $cmd