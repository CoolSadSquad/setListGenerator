# -*- coding: utf-8 -*-

from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from database import DB
from typing import Union, List
from pydantic import Json
import schemas
from enum import Enum
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated


app = FastAPI()

db = DB()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Tags(Enum):
    setlists = "Setlists"
    artists = "Artists"
    common = "Common"
    users = "Users"


# DONE: Setlists API


@app.get("/setlists/", response_model=List[schemas.Setlist], tags=[Tags.setlists])
async def get_all_setlists():
    return db.get_all_setlists()


@app.get("/setlists/{setlist_id}", response_model=Union[schemas.Setlist, None], tags=[Tags.setlists])
async def get_setlist(setlist_id: str):
    return db.get_setlist_by_id(setlist_id)


@app.post("/setlists/", response_model=schemas.Setlist, tags=[Tags.setlists])
async def create_setlist(name: str, artist: str, songs: Json):
    return db.add_setlist(name, artist, songs)


@app.delete("/setlists/{setlist_id}", response_model=schemas.DeleteSchema, tags=[Tags.setlists])
async def delete_setlist(setlist_id: str):
    return {"deleted_count": db.delete_setlist(setlist_id)}


@app.put("/setlists/{setlist_id}", response_model=Union[schemas.Setlist, None], tags=[Tags.setlists])
async def update_setlist(setlist_id: str, new_json: Json):
    return db.update_setlist(setlist_id, dict(new_json))


# DONE: Artists API

@app.get("/artists/", response_model=List[schemas.Artist], tags=[Tags.artists])
async def get_all_artists():
    return db.get_all_artists()


@app.get("/artists/{artist_id}", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def get_artist_by_id(artist_id: str):
    return db.get_artist_by_id(artist_id)


@app.get("/artists/name/{name}", response_model=List[schemas.Artist], tags=[Tags.artists])
async def get_artist_by_name(name: str):
    return db.get_artist_by_name(name)


@app.post("/artists/", response_model=schemas.Artist, tags=[Tags.artists])
async def create_artist(name: str, songs: Json, users: Json):
    return db.add_artist(name, songs, users)


@app.delete("/artists/{artist_id}", response_model=schemas.DeleteSchema, tags=[Tags.artists])
async def delete_artist(artist_id: str):
    return {"deleted_count": db.delete_artist(artist_id)}


@app.put("/artists/{artist_id}", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def update_artist(artist_id: str, new_json: Json):
    return db.update_artist(artist_id, dict(new_json))


@app.put("/artists/song/{artist_id}", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def add_artist_song(artist_id: str, song: str):
    return db.add_artist_song(artist_id, song)


@app.delete("/artists/song/{artist_id}", response_model=Union[schemas.Artist, None], tags=[Tags.artists])
async def delete_artist_song(artist_id: str, song: str):
    return db.delete_artist_song(artist_id, song)


# TODO: Users API


@app.get("/users/", response_model=List[schemas.User], tags=[Tags.users])
async def get_all_users():
    return db.get_all_users()


@app.get("/users/{user_id}", response_model=Union[schemas.User, None], tags=[Tags.users])
async def get_user_by_id(user_id: str):
    return db.get_user_by_id(user_id)


@app.get("/users/login/{login}", response_model=List[schemas.User], tags=[Tags.users])
async def get_user_by_login(login: str):
    return db.get_user_by_login(login)


@app.post("/login/", response_model=Union[schemas.User, None], tags=[Tags.users])
async def login_user(credentials: schemas.UserLogin):
    email = credentials.email
    password = credentials.password
    return db.login_user(email, password)


@app.post("/users/", response_model=Union[schemas.User, None], tags=[Tags.users])
async def create_user(data: schemas.UserCreate):
    return db.add_user(data.login, data.email, data.password)


@app.put("/users/{user_id}", response_model=Union[schemas.User, None], tags=[Tags.users])
async def update_artist(user_id: str, new_json: Json):
    return db.update_user(user_id, dict(new_json))



# TODO: Common methods


@app.get("/setlists/artist/{artist_name}", response_model=List[schemas.Setlist], tags=[Tags.common])
async def get_setlists_by_artist(artist: str):
    return db.get_setlists_by_artist(artist)
