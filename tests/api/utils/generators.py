import random
import string

import requests

from . import validators

# validate.CNPJ do go-sdk consulta a Receita Federal de verdade, entao nao da
# pra gerar um CNPJ novo "valido" a cada execucao - precisa ser um que exista.
# Em vez de fixar uma lista no codigo, buscamos as corretoras registradas na
# CVM (endpoint publico da BrasilAPI), que sao empresas reais e ativas.
CVM_CORRETORAS_URL = "https://brasilapi.com.br/api/cvm/corretoras/v1"

# usado so se o fetch acima falhar (CNPJs reais, confirmados via BrasilAPI)
FALLBACK_CNPJS = [
    "33000167000101",  # Petrobras
    "00000000000191",  # Banco do Brasil
    "60701190000104",  # Itau Unibanco
    "47960950000121",  # Magazine Luiza
]

_cnpj_pool_cache: list[str] | None = None


def _fetch_cnpj_pool() -> list[str]:
    global _cnpj_pool_cache

    if _cnpj_pool_cache is not None:
        return _cnpj_pool_cache

    try:
        resp = requests.get(CVM_CORRETORAS_URL, timeout=10)
        resp.raise_for_status()
        corretoras = resp.json()

        pool = [
            c["cnpj"]
            for c in corretoras
            if c.get("status") == "EM FUNCIONAMENTO NORMAL" and c.get("cnpj")
        ]
        _cnpj_pool_cache = pool or list(FALLBACK_CNPJS)
    except (requests.RequestException, ValueError):
        _cnpj_pool_cache = list(FALLBACK_CNPJS)

    return _cnpj_pool_cache

VOWELS = "aeiou"
CONSONANTS = "bcdfghjklmnpqrstvwxyz"


def _random_word(min_len: int = 3, max_len: int = 8) -> str:
    length = random.randint(min_len, max_len)
    start_with_consonant = random.random() < 0.5

    chars = []
    for i in range(length):
        pool = CONSONANTS if (i % 2 == 0) == start_with_consonant else VOWELS
        chars.append(random.choice(pool))

    return chars[0].upper() + "".join(chars[1:])


def random_full_name() -> str:
    while True:
        name = f"{_random_word()} {_random_word()}"
        if validators.is_valid_full_name(name):
            return name


def random_email() -> str:
    while True:
        local = "".join(random.choices(string.ascii_lowercase + string.digits, k=10))
        domain = "".join(random.choices(string.ascii_lowercase, k=8))
        email = f"{local}@{domain}.com"
        if validators.is_valid_email(email):
            return email


def random_phone() -> str:
    while True:
        ddd = random.randint(11, 99)
        number = random.randint(900000000, 999999999)
        phone = f"+55{ddd}{number}"
        if validators.is_valid_phone(phone):
            return phone


def random_cpf() -> str:
    while True:
        base = [random.randint(0, 9) for _ in range(9)]
        if len(set(base)) == 1:
            continue

        total = sum(d * w for d, w in zip(base, range(10, 1, -1)))
        d1 = (total * 10) % 11
        d1 = 0 if d1 == 10 else d1

        total = sum(d * w for d, w in zip(base + [d1], range(11, 1, -1)))
        d2 = (total * 10) % 11
        d2 = 0 if d2 == 10 else d2

        digits = "".join(map(str, base + [d1, d2]))
        if validators.is_valid_cpf(digits):
            return digits


def random_cnpj() -> str:
    return random.choice(_fetch_cnpj_pool())


def random_password() -> str:
    specials = "!@#$%*"
    while True:
        letters = "".join(random.choices(string.ascii_letters, k=6))
        digits = "".join(random.choices(string.digits, k=3))
        special = random.choice(specials)
        chars = list(letters + digits + special)
        random.shuffle(chars)
        password = "".join(chars)
        if validators.is_valid_password(password):
            return password


def random_valid_user() -> dict:
    return {
        "name": random_full_name(),
        "email": random_email(),
        "phone": random_phone(),
        "cpf": random_cpf(),
        "cnpj": random_cnpj(),
        "password": random_password(),
    }


# Um valor invalido garantido por campo, sem depender de rede
# (cnpj/cpf usam "todos os digitos iguais", rejeitado localmente antes
# de qualquer consulta externa).
INVALID_VALUES = {
    "name": "Al",
    "email": "not-an-email",
    "phone": "123",
    "cpf": "11111111111",
    "cnpj": "11111111111111",
    "password": "123456",
}


def invalid_field_payload(field: str) -> dict:
    payload = random_valid_user()
    payload[field] = INVALID_VALUES[field]
    return payload


def all_invalid_payload() -> dict:
    return dict(INVALID_VALUES)
