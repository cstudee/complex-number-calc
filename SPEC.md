

# Project Specification: Complex Number Calculator

## App Overview
A web-based calculator designed to perform basic arithmetic on complex numbers. The app supports both rectangular (a + bi) and polar (r ∠ θ) coordinate systems and maintains a local session history of calculations.

## Screens
### Main Calculator Screen
- **Input Section:** Users can toggle between Rectangular and Polar input modes. Each mode provides two labeled text fields.
- **Controls:** Four operation buttons (+, -, *, /) and a "Calculate" button.
- **Result Area:** Displays the computed result clearly, showing both the rectangular and polar forms of the answer.
- **History Section:** A list showing previous calculations. Each entry shows the inputs, the operator used, and the result.

## Interactions
- **Toggling Modes:** Clicking the toggle switch changes the input labels and placeholders immediately.
- **Calculating:** Clicking "Calculate" validates the input, performs the math, updates the Result Area, and prepends the new calculation to the History list.
- **Clearing:** A "Clear" button resets all input fields; a "Clear History" button wipes the history list.

## Data Storage
- **Local State:** The app will store the current inputs and the history list in the browser's memory (RAM) for the duration of the session.

## Tech Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel





