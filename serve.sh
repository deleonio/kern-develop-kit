#! /usr/bin/env bash

export THEME_MODULE="`pwd`/dist"
export THEME_EXPORT=KERN_V2
export THEME_CSS="`pwd`/inject-assets.css"
cd node_modules/@public-ui/sample-react/
npm  start
