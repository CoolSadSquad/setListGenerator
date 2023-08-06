# -*- coding: utf-8 -*-
from datetime import datetime
from typing import Any, List, Union

from bson import objectid
from pydantic import BaseModel, validator, root_validator
from pydantic.utils import GetterDict


class SetlistBase(BaseModel):
    name: str
    artist: str
    songs: list


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
    songs: list
    users: list


class Artist(ArtistBase):
    id: Union[str, Any]

    @root_validator(pre=True)
    def _set_id(cls, data):
        id = data.get("_id")
        if id:
            data["id"] = str(id)
        return data


class DeleteSchema(BaseModel):
    deleted_count: int