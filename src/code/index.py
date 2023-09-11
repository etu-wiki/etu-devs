# -*- coding: utf-8 -*-
import os
import bottle
from bottle import static_file, request
import requests

import oss2

# OSS Configuration
ETU_ENDPOINT = 'https://cdn.etu.wiki'
ENDPOINT = 'http://oss-cn-shanghai.aliyuncs.com'
BUCKET_NAME = os.environ['UploadBucket']

@bottle.route('/manifest/<manifest_id>/image/<image_id>/tenant/<tenant_id>', method='GET')
def build_manifest(manifest_id, image_id, tenant_id):
    # call rest api to get manifest
    response = requests.get(ETU_ENDPOINT + '/manifest/' + manifest_id + '/image/' + image_id + '/tenant/' + tenant_id)
    if response.status_code == 200:
        return 'success'
    else:
        return 'failed'

@bottle.route('/tenant/<tenant_id>/filename/<filename>', method='PUT')
def post(tenant_id, filename):
    context = bottle.request.environ.get('fc.context')

    auth = oss2.StsAuth(context.credentials.access_key_id, context.credentials.access_key_secret, context.credentials.security_token)
    bucket = oss2.Bucket(auth, ENDPOINT, BUCKET_NAME)

    # Assuming the file's data is in the request body
    file_data = request.body.read()

    if not file_data:
        return "No file data received."

    # Upload data to OSS
    bucket.put_object(tenant_id + '/' + filename, file_data)
    return 'success'

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
