import datetime

from credentials import MONGO_URI
from pymongo import MongoClient
import time, bcrypt, hashlib
from dotenv import load_dotenv
import os


class DB:
    def __init__(self):
        load_dotenv()
        self.client = MongoClient(os.getenv("MONGO_URI"))
        self.database = self.client.setlistGenerator
        self.setlists = self.database["setlists"]
        self.users = self.database["users"]
        self.artists = self.database["artists"]

    def add_user(self, name: str, login: str, password_hash: str, salt: str):
        return self.users.insert_one({
            "name": name,
            "login": login,
            "password_hash": password_hash,
            "salt": salt
        }).inserted_id

    def update_user_token(self, phone):
        token = phone + str(time.time()) + phone * 2 + str(time.time())
        token = hashlib.sha256(token.encode("utf-8")).digest().hex()
        return self.users.update_one(
            {"phone": phone},
            {"$set": {"token": token, "creation_date": int(time.time())}}, upsert=True).modified_count

    def get_user(self, login):
        return self.users.find_one({"login": login})

    def get_all_artists(self):
        return list(self.artists.find({}).sort([['_id', 1]]))

    def get_all_setlists(self):
        return list(self.setlists.find({}).sort([['_id', 1]]))

    def get_artist_by_id(self, _id: int):
        return list(self.artists.find({}).sort([['_id', 1]]).skip(_id - 1).limit(1))[0]

    def get_setlist_by_id(self, _id: int):
        return list(self.setlists.find({}).sort([['_id', 1]]).skip(_id - 1).limit(1))[0]

    def insert_artist(self, name: str, songs: list, users: list):
        return self.artists.insert_one({
            "name": name,
            "songs": songs,
            "users": users
        }).inserted_id

    def get_artist_by_name(self, name: str):
        return list(self.artists.find({"name": name}))

    def update_artist(self, _id: int, new_d: dict):
        _id -= 1

        artists = list(self.artists.find({}).sort([['_id', 1]]))
        return self.artists.update_one(
            {'_id': artists[_id]["_id"]},
            {'$set': new_d}, upsert=False).modified_count

    def remove_artist(self, _id: int):
        _id -= 1

        artists = list(self.artists.find({}).sort([['_id', 1]]))
        return self.artists.delete_one({"_id": artists[_id]["_id"]}).deleted_count

    def add_setlist(self, name: str, artist: str, songs: list):
        return self.users.insert_one({
            "name": name,
            "artist": artist,
            "songs": songs
        }).inserted_id

    def get_setlists_by_artist(self, artist: str):
        return list(self.setlists.find({"artist": artist}))

    def add_new_song_to_artist(self, artist_name: str, song: str):
        artist = self.get_artist_by_name(artist_name)[0]
        songs = list(artist["songs"])
        songs.append(song)
        new_d = {"songs": songs}
        return self.update_artist(artist["_id"], new_d)

    def add_new_user_to_artist(self, artist_name: str, user: str):
        artist = self.get_artist_by_name(artist_name)[0]
        users = list(artist["users"])
        users.append(user)
        new_d = {"users": users}
        return self.update_artist(artist["_id"], new_d)
