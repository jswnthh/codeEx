from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def process_code(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            code_lines = data.get("code", "").split("\n")

            # Print received code lines to the backend console
            print("Received Code Lines:")
            for i, line in enumerate(code_lines):
                print(f"{i + 1}: {line}")

            return JsonResponse({"message": "Code received successfully."})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)
