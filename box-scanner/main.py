#!/usr/bin/env python

import flask
import json
from package.scanner import BoxScanner

# Create the application.
APP = flask.Flask(__name__)

@APP.route('/scan_single_box')
def index():
    box = BoxScanner().scan_box()
    response = flask.jsonify(box)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    APP.debug = True
    APP.run()
