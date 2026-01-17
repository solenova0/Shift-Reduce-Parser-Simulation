# Shift–Reduce (SR) Parser Pro

A robust, web-based implementation of a Bottom-Up Shift-Reduce parser. This tool visualizes the stack operations and input transitions required to parse a string based on a user-defined Context-Free Grammar (CFG).

## 🚀 Key Features
- **Atomic Step Execution**: View every individual Shift and Reduce operation one by one.
- **Longest-Match Priority**: The reduction engine sorts grammar rules by length to ensure the most specific reduction is performed first, preventing premature matches.
- **Trace Export**: Download the entire parsing history as a `.txt` file for documentation or debugging.
- **Visual Feedback**: Color-coded actions for Shift (Green), Reduce (Yellow), Accept (Bright Green), and Reject (Red).

## 🛠 How to Use
1. **Define Grammar**: Enter your rules in the textarea using the `LHS->RHS` format (e.g., `E->E+T`). Place one production per line.
2. **Initialize**: Enter your input string and click **Start**. This initializes the stack and the trace log.
3. **Step Through**: Click **Next Step** to watch the parser attempt to reduce the stack or shift the next input character.
4. **Export**: Once the parser reaches an `ACCEPT` or `REJECT` state, click **Export Trace** to save the process.

## 📝 Algorithm Logic (Shift-Reduce)
The parser follows these priority-based steps during every "Next Step" call:
1. **Reduce**: Check if the current Stack's suffix matches any Grammar RHS. If multiple rules match, it picks the longest RHS to reduce first.
2. **Shift**: If no reduction is possible, it pushes the next character from the Input string onto the Stack.
3. **Finish**: If the Input is empty and no more reductions are possible:
    - **Accept**: If the Stack contains exactly the Start Symbol.
    - **Reject**: If the Stack contains anything else.

## ⚠️ Limitations
- **Shift-Reduce Conflicts**: This implementation is a "greedy" parser and does not perform backtracking or lookahead (LR/LALR).
- **Ambiguity**: Ambiguous grammars may lead to a `REJECT` state if the greedy reduction choice is incorrect.

## 📁 File Structure
- `index.html`: The UI structure and input controls.
- `style.css`: Modern dark-theme styling and action-specific color coding.
- `parser.js`: The core logic for grammar parsing, stack manipulation, and trace logging.