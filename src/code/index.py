# -*- coding: utf-8 -*-

import bottle
from bottle import static_file


@bottle.route('/id', method='GET')
def id():
    context = bottle.request.environ.get('fc.context')
    return context.account_id


@bottle.route('/', method='GET')
def index():
    return bottle.template('./index.html')

@bottle.route('/assets/<filename:path>')
def serve_static(filename):
    return static_file(filename, root='./assets')

app = bottle.default_app()

if __name__ == "__main__":
    bottle.run(host='0.0.0.0', port=8080)
