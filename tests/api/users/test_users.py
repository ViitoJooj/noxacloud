import os
import sys

_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # tests/api
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from utils import client, generators

results = {"passed": 0, "failed": 0}


def expect(condition: bool, message: str) -> None:
    if condition:
        results["passed"] += 1
        print(f"  [OK] {message}")
    else:
        results["failed"] += 1
        print(f"  [FAIL] {message}")


def test_invalid_fields_one_by_one() -> None:
    print("== inputs invalidos, um por vez ==")
    for field in generators.INVALID_VALUES:
        payload = generators.invalid_field_payload(field)
        resp = client.create_user(payload)
        expect(resp.status_code >= 400, f"{field} invalido -> status {resp.status_code}")


def test_all_invalid_fields() -> None:
    print("== inputs invalidos, todos ao mesmo tempo ==")
    payload = generators.all_invalid_payload()
    resp = client.create_user(payload)
    expect(resp.status_code >= 400, f"todos invalidos -> status {resp.status_code}")


def test_functional_flow() -> None:
    print("== fluxo funcional (um usuario fixo) ==")

    user = generators.random_valid_user()

    resp = client.create_user(user)
    expect(resp.status_code == 201, f"create -> status {resp.status_code}")

    body = resp.json() if resp.content else {}
    data = body.get("Data", body)
    user_id = data.get("ID") or data.get("id")
    expect(bool(user_id), "create retornou um id")

    if not user_id:
        return

    resp = client.get_user(user_id)
    expect(resp.status_code == 200, f"get by id -> status {resp.status_code}")

    resp = client.list_users()
    expect(resp.status_code == 200, f"list -> status {resp.status_code}")

    updated = dict(user)
    updated["name"] = generators.random_full_name()
    resp = client.update_user(user_id, updated)
    expect(resp.status_code == 200, f"update -> status {resp.status_code}")

    resp = client.delete_user(user_id)
    expect(resp.status_code == 204, f"delete -> status {resp.status_code}")


def main() -> None:
    test_invalid_fields_one_by_one()
    test_all_invalid_fields()
    test_functional_flow()

    print()
    print(f"passed={results['passed']} failed={results['failed']}")
    if results["failed"] > 0:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
