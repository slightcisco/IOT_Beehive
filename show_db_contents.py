import pymongo

mongoclient = pymongo.MongoClient("mongodb://simon.64-b.it:27017/")
mongodb = mongoclient["bees"]
mongocol = mongodb["BeeData"]

for x in mongocol.find():
    print(x)
