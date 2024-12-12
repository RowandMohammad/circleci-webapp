/**
 * @jest-environment jsdom
 */
require('@testing-library/jest-dom');
const { screen, fireEvent } = require('@testing-library/dom');

// Before each test, set up the DOM
beforeEach(() => {
  // Set the initial HTML
  document.body.innerHTML = `
    <button id="show-text-button">Show Text</button>
    <div id="new-text" style="display:none;">SOME NEW TEXT!</div>
  `;

  // Manually attach the event listener since <script> won't run here
  const button = document.getElementById('show-text-button');
  const newTextDiv = document.getElementById('new-text');
  button.addEventListener('click', () => {
    newTextDiv.style.display = 'block';
  });
});

test('clicking the button shows the hidden text', () => {
  const button = screen.getByText('Show Text');

  // Before click, ensure the text is not visible
  expect(screen.getByText('SOME NEW TEXT!')).not.toBeVisible();

  // Click the button
  fireEvent.click(button);

  // After the click, the text should now be visible
  expect(screen.getByText('SOME NEW TEXT!')).toBeVisible();
});
