document.addEventListener("DOMContentLoaded", function () {
  let input = "";
  let output = "";

  // Array of button ids for digits
  const digitIds = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  digitIds.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = function () {
        input += btn.textContent;
        document.getElementById("get").value = input;
      };
    }
  });

  // Array of operator button ids and their symbols (matching HTML)
  const operators = [
    { id: "add", symbol: "+" },
    { id: "sub", symbol: "-" },
    { id: "mul", symbol: "*" },
    { id: "divi", symbol: "/" },
    { id: "dot", symbol: "." },
    { id: "perc", symbol: "%" },
  ];
  operators.forEach((op) => {
    const btn = document.getElementById(op.id);
    if (btn) {
      btn.onclick = function () {
        // Prevent two operators in a row (except for dot and percent)
        if (op.symbol === "." || op.symbol === "%") {
          if (input.length > 0 && !/[.%]$/.test(input)) {
            input += op.symbol;
            document.getElementById("get").value = input;
          }
        } else {
          if (input.length > 0 && !/[+\-*/%]$/.test(input)) {
            input += op.symbol;
            document.getElementById("get").value = input;
          }
        }
      };
    }
  });

  // Clear button
  const clearBtn = document.getElementById("clear");
  if (clearBtn) {
    clearBtn.onclick = function () {
      input = "";
      output = "";
      document.getElementById("get").value = input;
      document.getElementById("out").value = output;
    };
  }

  // Backspace button
  const backBtn = document.getElementById("back");
  if (backBtn) {
    backBtn.onclick = function () {
      input = input.slice(0, -1);
      document.getElementById("get").value = input;
    };
  }

  // Equals button (id="sums" in HTML)
  const equalsBtn = document.getElementById("sums");
  if (equalsBtn) {
    equalsBtn.onclick = function () {
      try {
        // Replace % with /100 for percentage calculation
        let safeInput = input.replace(/%/g, "/100");
        // Only allow numbers, operators, dot, and spaces
        if (/^[0-9+\-*/.% ]+$/.test(input)) {
          // eslint-disable-next-line no-eval
          output = eval(safeInput).toString();
        } else {
          output = "Error";
        }
      } catch (e) {
        output = "Error";
      }
      document.getElementById("out").value = output;
    };
  }

  // Optional: Keyboard support
  document.addEventListener("keydown", function (e) {
    if (e.key >= "0" && e.key <= "9") {
      input += e.key;
      document.getElementById("get").value = input;
    } else if (["+", "-", "*", "/", "."].includes(e.key)) {
      if (input.length > 0 && !/[+\-*/.]$/.test(input)) {
        input += e.key;
        document.getElementById("get").value = input;
      }
    } else if (e.key === "Enter" || e.key === "=") {
      if (/^[0-9+\-*/. ]+$/.test(input)) {
        try {
          // eslint-disable-next-line no-eval
          output = eval(input).toString();
        } catch {
          output = "Error";
        }
      } else {
        output = "Error";
      }
      document.getElementById("out").value = output;
    } else if (e.key === "Backspace") {
      input = input.slice(0, -1);
      document.getElementById("get").value = input;
    } else if (e.key === "Escape") {
      input = "";
      output = "";
      document.getElementById("get").value = input;
      document.getElementById("out").value = output;
    }
  });
});
