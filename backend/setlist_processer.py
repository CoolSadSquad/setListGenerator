# -*- coding: utf-8 -*-
import os

from jinja2 import Template, Environment, FileSystemLoader, select_autoescape
import pdfkit
from database import DB


def generate_html(setlist_id: str):
    db = DB()

    env = Environment(
        loader=FileSystemLoader('templates'),
        autoescape=select_autoescape(['html', 'xml', 'css'])
    )

    temp = env.get_template("setlist.html")

    return temp.render(setlist=db.get_setlist_by_id(setlist_id))


def generate_pdf(setlist_id: str):
    pdfkit.from_url(f"http://localhost:8888/setlists/html/{setlist_id}", f"setlists/{setlist_id}.pdf")
    return os.path.abspath(f"setlists/{setlist_id}.pdf")

if __name__ == "__main__":
    generate_pdf("64cd9d885beaa9484bfb2cb7")
