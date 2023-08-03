# -*- coding: utf-8 -*-

from fastapi import FastAPI
from database import DB
from typing import Union

app = FastAPI()

db = DB()


# Setlists
@app.get("/setlists/", tags=["Setlists"])
async def get_all_setlists():
    return db.get_all_setlists()


@app.get("/setlists/{setlist_id}", tags=["Setlists"])
async def get_setlist(setlist_id: str):
    return db.get_setlist_by_id(int(setlist_id))
