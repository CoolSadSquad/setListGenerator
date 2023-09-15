# -*- coding: utf-8 -*-
import os

from jinja2 import Template, Environment, FileSystemLoader, select_autoescape
from datetime import datetime
import pdfkit
from database import DB
from pyhtml2pdf import converter


def generate_html(setlist_id: str):
    db = DB()

    env = Environment(
        loader=FileSystemLoader('templates'),
        autoescape=select_autoescape(['html', 'xml', 'css'])
    )

    temp = env.get_template("setlist.html")
    setlist = db.get_setlist_by_id(setlist_id)
    if setlist["date"] is str:
        setlist["date"] = setlist["date"][:setlist["date"].find("T")]
    elif setlist["date"] is datetime:
        setlist["date"] = setlist["date"].strftime("%d %b %Y")
    return temp.render(setlist=setlist)


def generate_pdf(setlist_id: str):
    setlist_html = generate_html(setlist_id)
    converter.convert(f'http://localhost:8888/setlists/html/{setlist_id}', f'setlists/{setlist_id}.pdf')
    # pdfkit.from_url(f"", f"")
    return os.path.abspath(f"setlists/{setlist_id}.pdf")


if __name__ == "__main__":
    generate_pdf("64cd9d885beaa9484bfb2cb7")
