#!/usr/bin/env python
import flask
from random import choice
import time

# Create the application.
APP = flask.Flask(__name__)

@APP.route('/scan_single_box')
def index():
    box = choice([
        [100, 30, 500],
        [30, 50, 70],
        [23, 76, 99]
    ])
    response = flask.jsonify(box)
    response.headers.add('Access-Control-Allow-Origin', '*')
    time.sleep(choice([0.1, 0.5, 1]))
    return response


if __name__ == '__main__':
    APP.debug = True
    APP.run()
