# -*- coding: utf-8 -*-

from fastapi import FastAPI
from database import DB
from typing import Union, List
from pydantic import Json
import schemas

app = FastAPI()

db = DB()


# Setlists

@app.get("/setlists/", response_model=List[schemas.Setlist], tags=["Setlists"])
async def get_all_setlists():
    return db.get_all_setlists()


@app.get("/setlists/{setlist_id}", response_model=Union[schemas.Setlist, None], tags=["Setlists"])
async def get_setlist(setlist_id: str):
    return db.get_setlist_by_id(setlist_id)


@app.post("/setlists/", response_model=schemas.Setlist, tags=["Setlists"])
async def create_setlist(name: str, artist: str, songs: Json):
    return db.add_setlist(name, artist, songs)


@app.delete("/setlists/{setlist_id}", response_model=schemas.DeleteSchema, tags=["Setlists"])
async def delete_setlist(setlist_id: str):
    return {"deleted_count": db.delete_setlist(setlist_id)}


@app.post("/setlists/{setlist_id}", response_model=Union[schemas.Setlist, None], tags=["Setlists"])
async def update_setlist(setlist_id: str, new_json: Json):
    return db.update_setlist(setlist_id, dict(new_json))


@app.get("/setlists/artist/{artist_name}", response_model=List[schemas.Setlist], tags=["Setlists", "Artists"])
async def get_setlists_by_artist(artist: str):
    return db.get_setlists_by_artist(artist)

