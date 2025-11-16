from django.db import connections
from django.db.utils import OperationalError
from django.http import JsonResponse


def healthz(request):
    db_ok = True
    try:
        connections["default"].cursor()
    except OperationalError:
        db_ok = False
    return JsonResponse({"status": "ok", "db": db_ok})
