from flask import Flask, Response, request, jsonify
from io import BytesIO
import base64
from flask_cors import CORS, cross_origin
import os
import sys
import NPDetection
import json

app = Flask(__name__)
cors = CORS(app)

@app.route("/results", methods=['GET', 'POST'])
def results():
    var = NPDetection.pipeline2()
    return(jsonify({"key": var}))


@app.route("/image", methods=['GET', 'POST'])
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        with open('image.jpeg', 'wb') as out:
            out.write(bytesOfImage)
        return "image_read"


if __name__ == "main":
    app.run(host="192.168.31.108", port="5000", debug=True)