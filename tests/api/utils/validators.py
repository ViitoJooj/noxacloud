"""
Port em Python das regras de github.com/ViitoJooj/go-sdk/validate (users.*),
usado só pra gerar dados que sabemos, de antemao, que vao passar ou falhar
na validacao real do backend.
"""

KEYBOARD_PATTERNS = ["qwerty", "asdfgh", "zxcvbn", "123456", "654321"]
COMMON_PASSWORDS = {"password", "123456", "12345678", "qwerty", "admin", "senha123"}
INVALID_EMAIL_CHARS = list("<>()[],;:\\/\"'!#$%^&*=+{}|?~`")


def strip_non_digits(s: str) -> str:
    return "".join(c for c in s if c.isdigit())


def all_same_digit(s: str) -> bool:
    return len(s) > 0 and len(set(s)) == 1


def cpf_check_digits_valid(cpf: str) -> bool:
    if len(cpf) != 11 or not cpf.isdigit():
        return False

    total = sum(int(cpf[i]) * (10 - i) for i in range(9))
    d1 = (total * 10) % 11
    d1 = 0 if d1 == 10 else d1
    if d1 != int(cpf[9]):
        return False

    total = sum(int(cpf[i]) * (11 - i) for i in range(10))
    d2 = (total * 10) % 11
    d2 = 0 if d2 == 10 else d2
    return d2 == int(cpf[10])


def is_valid_cpf(cpf: str) -> bool:
    digits = strip_non_digits(cpf)
    if len(digits) != 11:
        return False
    if all_same_digit(digits):
        return False
    return cpf_check_digits_valid(digits)


def is_valid_email(email: str) -> bool:
    email = email.strip()
    if not (6 <= len(email) <= 150):
        return False
    if "@" not in email or "." not in email:
        return False
    if " " in email:
        return False
    if email != email.lower():
        return False
    if any(ord(c) > 127 for c in email):
        return False
    if any(c in email for c in INVALID_EMAIL_CHARS):
        return False
    return True


def is_valid_phone(phone: str) -> bool:
    phone = phone.strip()
    if not phone:
        return False
    digits = sum(1 for c in phone if c.isdigit())
    if not (8 <= digits <= 20):
        return False
    for i, c in enumerate(phone):
        if c.isdigit():
            continue
        if c == "+" and i == 0:
            continue
        return False
    return True


def is_valid_full_name(name: str) -> bool:
    if not name:
        return False
    if not (5 <= len(name) <= 150):
        return False
    if len(name.split()) < 2:
        return False
    if "  " in name:
        return False
    if name[0] in (" ", "-", "'") or name[-1] in (" ", "-", "'"):
        return False
    for c in name:
        if not (c.isalpha() or c in "-' "):
            return False
    return True


def has_special_character(s: str) -> bool:
    return any(not c.isalnum() for c in s)


def has_sequential_numbers(s: str) -> bool:
    count = 1
    for i in range(1, len(s)):
        if s[i].isdigit() and s[i - 1].isdigit() and int(s[i]) == int(s[i - 1]) + 1:
            count += 1
            if count >= 3:
                return True
        else:
            count = 1
    return False


def has_sequential_letters(s: str) -> bool:
    count = 1
    for i in range(1, len(s)):
        if s[i].isalpha() and s[i - 1].isalpha() and ord(s[i]) == ord(s[i - 1]) + 1:
            count += 1
            if count >= 3:
                return True
        else:
            count = 1
    return False


def has_keyboard_pattern(s: str) -> bool:
    low = s.lower()
    return any(p in low for p in KEYBOARD_PATTERNS)


def is_common_password(s: str) -> bool:
    return s.lower() in COMMON_PASSWORDS


def is_valid_password(password: str) -> bool:
    if not (6 <= len(password) <= 50):
        return False
    if not has_special_character(password):
        return False
    if password != password.strip():
        return False
    if has_sequential_numbers(password):
        return False
    if has_sequential_letters(password):
        return False
    if has_keyboard_pattern(password):
        return False
    if is_common_password(password):
        return False
    return True
