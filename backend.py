from flask import Flask, jsonify, request
import pymongo

app = Flask(__name__)

mongoclient = pymongo.MongoClient("mongodb://localhost:27017/")
mongodb = mongoclient["bees"]
mongocol = mongodb["BeeData"]

output_list = []
for x in mongocol.find():
    output_list.append(x)

@app.route('/', methods=['GET'])
def index():
    return ''.join(output_list)
@app.route('/multi/<int:num1>/<int:num2>', methods=['GET'])
def get_multiply10(num1, num2):
    return jsonify({"result": num1*num2})

if __name__ == '__main__':
    app.run(debug=True)
