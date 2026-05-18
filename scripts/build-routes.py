#!/usr/bin/python python3

from pathlib import Path

route_file = Path(__file__).resolve().parent.parent / 'feed' / 'build' / 'rants' / 'routes.txt'

if not route_file.exists():
    raise SystemExit(
        f'Route file not found: {route_file}. Run `python feed/feed.py` before generating routes.'
    )

print(route_file.read_text().strip())
