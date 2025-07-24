#!/usr/bin/python python3

import os
import requests

target_file = 'routes.txt'

routes_files = [
    'https://feed.strong.scot/rants/routes.txt',
]


def fetch_routes(
    url: str
):
    # Send GET request
    response = requests.get(url)

    # Parse JSON content
    if response.status_code == 200:
        return response.text.split(os.linesep)
    else:
        return None


combined_routes = []
for route_file in routes_files:
    combined_routes = combined_routes + fetch_routes(route_file)

print(os.linesep.join(combined_routes))
