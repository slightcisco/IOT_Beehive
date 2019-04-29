import pymongo

mongoclient = pymongo.MongoClient("mongodb://localhost:27017/")
mongodb = mongoclient["bees"]
mongocol = mongodb["BeeData"]

for x in mongocol.find():
    print(x)
