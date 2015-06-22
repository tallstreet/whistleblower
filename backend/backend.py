from __future__ import absolute_import, print_function
from flask import Flask, jsonify, request
import requests
import logging
import base64
from Crypto.Cipher import AES
from Crypto import Random

from threading import Timer

import tweepy

try:
    from flask.ext.cors import CORS  # The typical way to import flask-cors
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask.ext.cors import CORS


TIMEOUT = 60.0
app = Flask('WistleBlower')
logging.basicConfig(level=logging.INFO)

CORS(app, resources=r'/api/*', allow_headers='Content-Type')

BS = 16
pad = lambda s: s + (BS - len(s) % BS) * chr(BS - len(s) % BS) 
unpad = lambda s : s[:-ord(s[len(s)-1:])]


# == OAuth Authentication ==
#
# This mode of authentication is the new preferred way
# of authenticating with Twitter.

# The consumer keys can be found on your application's Details
# page located at https://dev.twitter.com/apps (under "OAuth settings")
consumer_key=""
consumer_secret=""

# The access tokens can be found on your applications's Details
# page located at https://dev.twitter.com/apps (located
# under "Your access token")
access_token=""
access_token_secret=""

nxt_base = "http://4c4b2841.ngrok.com/nxt"
nxt_secret = 'eeedt'
nxt_account = 'NXT-xxxxx'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.secure = True
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)



def make_checker(account, amount, secret_key, transaction):
    def check_paid(): 
        r = requests.get('%s?requestType=getBalance&account=%s' % (nxt_base, account)).json()
        if r.balanceNQT / 10000000000 < amount: 
            api.update_status('The secret key for %s?requestType=readMessage&transaction=%s is %s' % (nxt_base, transaction, secret_key))
    return check_paid



@app.route("/api/v1/add", methods=['POST'])
def add_data():
    json = request.json
    print(json)
    key = Random.new().read(32)
    raw = pad(json['data'])
    iv = Random.new().read( AES.block_size )
    cipher = AES.new( key, AES.MODE_CBC, iv )
    crypted =  base64.b64encode( iv + cipher.encrypt( raw ) ) 
    key_str = repr(base64.b64encode(key))
    r = requests.post(nxt_base, data={
      'requestType': 'sendMessage',
      'secretPhrase': nxt_secret,
      'recipient': nxt_account,
      'feeNQT': '100000000',
      'deadline': 1440,
      'messageIsPrunable': True,
      'message': repr(crypted)
    })
    try:
        transaction = r.json()['transaction']
    except:
        transaction = 'unknown'

    result = {
        'key': key_str,
        'crypted': repr(crypted),
        'transaction': transaction
    }        
    t = Timer(TIMEOUT, make_checker(json['account'], json['amount'], key_str, transaction))
    t.start() # after 60 seconds, we check if the amount was paid
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
