#!/bin/bash

openssl aes-256-cbc -K $encrypted_d3a3c756a187_key -iv $encrypted_d3a3c756a187_iv -in travis.enc -out deploy-travis -d

eval $(ssh-agent -s)

chmod 600 deploy-travis

ssh-add deploy-travis