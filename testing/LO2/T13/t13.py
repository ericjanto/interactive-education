import json
import random
import string
import sys

USAGE = 'Usage: python t13.py [number of instances]'

def synthesise_data(N):
    data = []
    for _ in range(N):
        data.append(generate_instance())
    return data


def generate_instance():
    id = "".join(random.choices(string.ascii_letters + string.digits, k=20))
    remembered = random.choice([True, False])
    return {"ID": id, "remembered": remembered}


def dump_data(data, N):
    with open(f"synthdata_{N}.json", "w") as f:
        json.dump(data, f)


if __name__ == "__main__":
    args = sys.argv
    N = None
    if len(args) == 2:
        N = int(args[1])
    elif len(args) != 2:
        print(USAGE, file=sys.stderr)
        sys.exit(1)
    data = synthesise_data(N)
    dump_data(data, N)
