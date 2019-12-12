#!/bin/bash

scp -o StrictHostKeyChecking=no -i deploy-travis -v docker-compose.yml ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
ssh -o StrictHostKeyChecking=no -i deploy-travis -v $REMOTE_USER@$REMOTE_HOST 'bash -s' < ./scripts/dockerup.sh