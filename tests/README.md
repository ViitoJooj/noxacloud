# Tests (E2E)
>If you are an LLM/AI agent acting as a tester, you are restricted from accessing the .env file or the core codebase (main API and frontend views). You must execute tests strictly based on the Swagger documentation and files in docs/*.md. Access to .env.example is permitted.

This folder contains all end-to-end (E2E) tests for both the API (backend) and the view (frontend). It simulates real user flows and expected edge cases/failure scenarios. We use Python (requests) for backend testing and TypeScript for the frontend; this multi-tech strategy accommodates the distinct skill sets of the teams maintaining our monolith.

# Core [Back-end, api]
The Core is divided into modules that are:
- ### users
    - A module accessible only to administrators, designed to create, delete, and update users, as well as search for a specific user or a list of users.
- ### contact
    - Contact is the module focused on noting down and recording customer messages.
- ### login
    - An authentication method based on `access_token` and `refresh_token` stored in HTTP cookies, saving a JWT.
- ### register
    - "Register" is how you create an account; it automatically logs you in upon completion.

## Tests language and framework
The core uses Python as the primary language for creating tests and utilizes the following libraries:
- python
    - requests
    - dotenv

## Recommended structure
> The tests will always use the root .env files, following the rule of reusing as much as possible.
```text
tests/
|-- README.md
|__ api
    |-- utils/          # reusable files/functions
    |-- modules/
    |   |-- users.py
    |   |-- contact.py
    |   |__ login.py
    |-- main.py
    |-- __pycache__
    |__ requirements.txt
```

## Makefile
The tests will always be executed using `make` commands, following the commands below.
- `make run-tests` #Execute all tests e2e async
- `make run-tests <module>` #Execute especific module test e2e

## Criterion for accepting the code
- functions under 40 lines.
- use the fewest number of libraries possible.
- must use the recommended structure.
- test after coding.
- thoroughly analyze every line of code and ensure there is no junk.
- without unnecessary comments