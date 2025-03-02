document.addEventListener('DOMContentLoaded', () => {
    // Initialize Ace Editor
    const codeEditor = ace.edit("codeEditor");
    codeEditor.session.setMode("ace/mode/c_cpp");
    codeEditor.setOptions({
        fontSize: "12pt",
        showLineNumbers: true,
        showGutter: true,
        vScrollBarAlwaysVisible: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        wrap: true
    });

    // Example code snippets
    const examples = {
        hello: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
        loop: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int sum = 0;\n    \n    for(int i = 1; i <= 10; i++) {\n        sum += i;\n        cout << "Current sum: " << sum << endl;\n    }\n    \n    cout << "Final sum: " << sum << endl;\n    return 0;\n}`,
        function: `#include <iostream>\nusing namespace std;\n\n// Function to calculate factorial\nint factorial(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int num = 5;\n    cout << "Factorial of " << num << " is " << factorial(num) << endl;\n    return 0;\n}`
    };

    // Add click event listeners to example buttons
    document.querySelectorAll('.example-btn').forEach(button => {
        button.addEventListener('click', () => {
            const exampleCode = examples[button.dataset.example];
            codeEditor.setValue(exampleCode);
        });
    });

    // Analyze button handler
    document.getElementById('analyzeBtn').addEventListener('click', () => {
        console.log("Button works");
            let codeContent = codeEditor.getValue();
            fetch('/process_code/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: codeContent })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Backend Response:", data);
            })
            .catch(error => console.error("Error sending code:", error));
        });
    });