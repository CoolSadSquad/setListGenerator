import datetime

from credentials import MONGO_URI
from pymongo import MongoClient
import time, bcrypt, hashlib
from dotenv import load_dotenv
import os
from bson import objectid


class DB:
    def __init__(self):
        load_dotenv()
        self.client = MongoClient(os.getenv("MONGO_URI"))
        self.database = self.client.setlistGenerator
        self.setlists = self.database["setlists"]
        self.users = self.database["users"]
        self.artists = self.database["artists"]

    # def add_user(self, email: str, login: str, password_hash: str, salt: str):
    #     return self.users.insert_one({
    #         "email": email,
    #         "login": login,
    #         "password_hash": password_hash,
    #         "salt": salt
    #     }).inserted_id

    def update_user_token(self, phone):
        token = phone + str(time.time()) + phone * 2 + str(time.time())
        token = hashlib.sha256(token.encode("utf-8")).digest().hex()
        return self.users.update_one(
            {"phone": phone},
            {"$set": {"token": token, "creation_date": int(time.time())}}, upsert=True).modified_count

    def get_user(self, login):
        return self.users.find_one({"login": login})

    # DONE: Artist CRUD

    def get_all_artists(self):
        return list(self.artists.find({}).sort([['_id', 1]]))

    def get_artist_by_id(self, _id: str):
        data = []
        if objectid.ObjectId.is_valid(_id):
            data = list(self.artists.find({"_id": objectid.ObjectId(_id)}).sort([['_id', 1]]).limit(1))
        return data[0] if len(data) else None

    def delete_artist(self, _id: str):
        return self.artists.delete_one({"_id": objectid.ObjectId(_id)}).deleted_count

    def update_artist(self, _id: str, new_json: dict):
        new_artist = self.artists.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$set": new_json}, upsert=False)
        if new_artist.matched_count == 0:
            return None
        return self.get_artist_by_id(_id)

    def get_artist_by_name(self, name: str):
        return list(self.artists.find({"name": name}))

    def add_artist(self, name: str, songs: list, users: list):
        artist_id = self.artists.insert_one({
            "name": name,
            "songs": songs,
            "users": users
        }).inserted_id
        return self.get_artist_by_id(str(artist_id))

    def add_artist_song(self, _id: str, song: str):
        new_artist = self.artists.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$push": {"songs": song}}, upsert=False)
        if new_artist.matched_count == 0:
            return None
        return self.get_artist_by_id(_id)

    def delete_artist_song(self, _id: str, song: str):
        new_artist = self.artists.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$pull": {"songs": song}}, upsert=False)
        if new_artist.matched_count == 0:
            return None
        return self.get_artist_by_id(_id)

    # DONE: Setlist CRUD

    def get_all_setlists(self):
        return list(self.setlists.find({}).sort([['_id', 1]]))

    def get_setlist_by_id(self, _id: str):
        data = []
        if objectid.ObjectId.is_valid(_id):
            data = list(self.setlists.find({"_id": objectid.ObjectId(_id)}).sort([['_id', 1]]).limit(1))
        return data[0] if len(data) else None

    def delete_setlist(self, _id: str):
        return self.setlists.delete_one({"_id": objectid.ObjectId(_id)}).deleted_count

    def update_setlist(self, _id: str, new_json: dict):
        new_setlist = self.setlists.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$set": new_json}, upsert=False)
        if new_setlist.matched_count == 0:
            return None
        return self.get_setlist_by_id(_id)

    def add_setlist(self, name: str, artist: str, songs: list):
        setlist_id = self.setlists.insert_one({
            "name": name,
            "artist": artist,
            "songs": songs
        }).inserted_id
        return self.get_setlist_by_id(str(setlist_id))

    # TODO: Users CRUD

    def get_all_users(self):
        return list(self.users.find({}).sort([['_id', 1]]))

    def get_user_by_id(self, _id: str):
        data = []
        if objectid.ObjectId.is_valid(_id):
            data = list(self.users.find({"_id": objectid.ObjectId(_id)}).sort([['_id', 1]]).limit(1))
        return data[0] if len(data) else None

    def get_user_by_login(self, login: str):
        return list(self.users.find({"login": login}))

    def delete_user(self, _id: str):
        return self.users.delete_one({"_id": objectid.ObjectId(_id)}).deleted_count

    def update_user(self, _id: str, new_json: dict):
        new_user = self.users.update_one(
            {"_id": objectid.ObjectId(_id)},
            {"$set": new_json}, upsert=False)
        if new_user.matched_count == 0:
            return None
        return self.get_user_by_id(_id)

    def add_user(self, login: str, email: str, password: str):
        salt = bcrypt.gensalt()
        password = bytes(password, 'utf-8')
        password_hash = bcrypt.hashpw(password, salt)
        # print(password_hash, salt)
        user_id = self.users.insert_one({
            "login": login,
            "email": email,
            "password_hash": password_hash,
            "salt": salt,
            "artists": []
        }).inserted_id
        # print(user_id)
        return self.get_user_by_id(str(user_id))

    def get_user_by_email(self, email: str):
        return list(self.users.find({"email": email}))

    def login_user(self, email: str, password: str):
        user = self.get_user_by_email(email)

        if len(user):
            if bcrypt.checkpw(bytes(password, "utf-8"), user[0]["password_hash"]):
                return user[0]
            else:
                return None
        else:
            return None

    # FIXME: delete rest

    def add_new_user_to_artist(self, artist_name: str, user: str):
        artist = self.get_artist_by_name(artist_name)[0]
        users = list(artist["users"])
        users.append(user)
        new_d = {"users": users}
        return self.update_artist(artist["_id"], new_d)
