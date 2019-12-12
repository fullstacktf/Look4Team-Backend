#!/bin/bash

openssl aes-256-cbc -K $encrypted_47a6e7674e1d_key -iv $encrypted_47a6e7674e1d_iv -in travis.enc -out deploy-travis -d

eval $(ssh-agent -s)

chmod 600 deploy-travis

ssh-add deploy-travis