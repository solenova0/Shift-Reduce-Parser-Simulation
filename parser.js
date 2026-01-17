let grammar = [];
let input = "";
let stack = [];
let index = 0;
let isFinished = false;
let traceLog = [];

function addRow(stackArr, inputStr, action, cls = "") {
  const tbody = document.getElementById("tableBody");
  const row = tbody.insertRow();
  const sText = "$" + stackArr.join("");
  const iText = inputStr.slice(index) + "$";

  row.insertCell(0).innerText = sText;
  row.insertCell(1).innerText = iText;
  const actionCell = row.insertCell(2);
  actionCell.innerText = action;
  actionCell.className = cls;

  traceLog.push(`${sText.padEnd(15)} | ${iText.padEnd(15)} | ${action}`);
  
  const container = document.querySelector(".table-container");
  container.scrollTop = container.scrollHeight;
}

function parseGrammar(text) {
  return text.trim().split("\n").map(line => {
    const [lhs, rhs] = line.split("->").map(s => s.trim());
    return { lhs, rhs };
  }).sort((a, b) => b.rhs.length - a.rhs.length);
}

function start() {
  const grammarText = document.getElementById("grammarInput").value;
  const inputVal = document.getElementById("inputStr").value.trim();

  if (!grammarText || !inputVal) {
    alert("Please enter grammar and input string");
    return;
  }

  grammar = parseGrammar(grammarText);
  input = inputVal;
  stack = [];
  index = 0;
  isFinished = false;
  traceLog = ["STACK | INPUT | ACTION"];

  document.getElementById("tableBody").innerHTML = "";
  addRow(stack, input, "START");
}

function nextStep() {
  if (isFinished) return;

  const stackStr = stack.join("");
  
  // 1. REDUCE logic
  for (let rule of grammar) {
    if (stackStr.endsWith(rule.rhs) && rule.rhs !== "") {
      for (let i = 0; i < rule.rhs.length; i++) stack.pop();
      stack.push(rule.lhs);
      addRow(stack, input, `REDUCE ${rule.lhs} → ${rule.rhs}`, "action-reduce");
      return;
    }
  }

  // 2. SHIFT logic 
  if (index < input.length) {
    let lookahead = input.substring(index, index + 2);
    let charToShift = (lookahead === "id") ? "id" : input[index];
    
    stack.push(charToShift);
    index += charToShift.length;
    addRow(stack, input, `SHIFT ${charToShift}`, "action-shift");
    return;
  }

  // 3. Finish Check
  isFinished = true;
  const startSymbol = grammar[0].lhs;
  if (stack.length === 1 && stack[0] === startSymbol && index === input.length) {
    addRow(stack, input, "ACCEPT", "action-accept");
  } else {
    addRow(stack, input, "REJECT", "action-reject");
  }
}

function exportTrace() {
  const blob = new Blob([traceLog.join("\n")], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "trace.txt";
  a.click();
}

function resetParser() {
  location.reload(); // Simple way to clear all states
}