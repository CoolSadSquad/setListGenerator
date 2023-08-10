# -*- coding: utf-8 -*-
from datetime import datetime
from typing import Any, List, Union

from bson import objectid
from pydantic import BaseModel, validator, root_validator
from pydantic.utils import GetterDict


class SetlistBase(BaseModel):
    name: str
    artist: str
    songs: List[str] = []


class Setlist(SetlistBase):
    id: Union[str, Any]

    @root_validator(pre=True)
    def _set_id(cls, data):
        id = data.get("_id")
        if id:
            data["id"] = str(id)
        return data


class ArtistBase(BaseModel):
    name: str
    songs: List[str] = []
    users: List[str] = []


class Artist(ArtistBase):
    id: Union[str, Any]

    @root_validator(pre=True)
    def _set_id(cls, data):
        id = data.get("_id")
        if id:
            data["id"] = str(id)
        return data


class UserBase(BaseModel):
    login: str
    email: str
    artists: List[str] = []


class UserCreate(BaseModel):
    login: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class User(UserBase):
    id: Union[str, Any]

    @root_validator(pre=True)
    def _set_id(cls, data):
        id = data.get("_id")
        if id:
            data["id"] = str(id)
        return data


class DeleteSchema(BaseModel):
    deleted_count: int