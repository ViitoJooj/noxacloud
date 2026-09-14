import os

import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("APPLICATION_BACKEND", "http://localhost:8080") + "/v1/users"

TIMEOUT = 10


def create_user(payload: dict) -> requests.Response:
    return requests.post(BASE_URL, json=payload, timeout=TIMEOUT)


def list_users() -> requests.Response:
    return requests.get(BASE_URL, timeout=TIMEOUT)


def get_user(user_id: str) -> requests.Response:
    return requests.get(f"{BASE_URL}/{user_id}", timeout=TIMEOUT)


def update_user(user_id: str, payload: dict) -> requests.Response:
    return requests.patch(f"{BASE_URL}/{user_id}", json=payload, timeout=TIMEOUT)


def delete_user(user_id: str) -> requests.Response:
    return requests.delete(f"{BASE_URL}/{user_id}", timeout=TIMEOUT)
