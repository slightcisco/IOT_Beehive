import pymongo

mongoclient = pymongo.MongoClient("mongodb://simon.64-b.it:27017/")
mongodb = mongoclient["bees"]
mongocol = mongodb["BeeData"]

query = {}

mongocol.delete_many(query)

for x in mongocol.find():
    print(x)
