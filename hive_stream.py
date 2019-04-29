import pymongo
import datetime
import random
import time

mongoclient = pymongo.MongoClient("mongodb://localhost:27017/")
mongodb = mongoclient["bees"]
mongocol = mongodb["BeeData"]

DT = datetime.datetime.now()
IT = random.randint(0,30)
OT = random.randint(0,30)
HU = random.randint(0,100)


while True:
    DT = datetime.datetime.now()
    IT = random.randint(0,30)
    OT = random.randint(0,30)
    HU = random.randint(0,100)

    payload = { "dateTime": DT, "inTemp": IT, "outTemp": OT, "Humidity": HU}

    return_obj = mongocol.insert_one(payload)
    print(payload)
    print(return_obj)

    time.sleep(5)


