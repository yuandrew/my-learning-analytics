#!/bin/bash

if [ -f /secrets/bq_cred.json ]
then
  ln -sf /secrets/bq_cred.json /dashboard/dashboard/static/json/bq_cred.json
fi

echo $DJANGO_SETTINGS_MODULE

if [ -z "${GUNICORN_WORKERS}" ]; then
    GUNICORN_WORKERS=4
fi

if [ -z "${GUNICORN_PORT}" ]; then
    GUNICORN_PORT=5000
fi

echo "Waiting for DB"
dockerize -wait tcp://db:3306

echo Running python startups
python manage.py crontab add; python manage.py migrate

# Start Gunicorn processes
echo Starting Gunicorn.

exec gunicorn dashboard.wsgi:application \
    --bind 0.0.0.0:${GUNICORN_PORT} \
    --workers="${GUNICORN_WORKERS}"
