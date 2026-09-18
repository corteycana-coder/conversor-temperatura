(() => {
  'use strict';

  const form = document.querySelector('#converter-form');
  const input = document.querySelector('#temperature-input');
  const fromUnit = document.querySelector('#from-unit');
  const toUnit = document.querySelector('#to-unit');
  const inputUnit = document.querySelector('#input-unit');
  const errorMessage = document.querySelector('#error-message');
  const resultValue = document.querySelector('#result-value');
  const resultCaption = document.querySelector('#result-caption');
  const status = document.querySelector('#temperature-status');
  const statusText = document.querySelector('#status-text');
  const statusIcon = document.querySelector('.status-icon');

  const symbols = { C: '°C', F: '°F', K: 'K' };

  function toCelsius(value, unit) {
    if (unit === 'F') return (value - 32) * 5 / 9;
    if (unit === 'K') return value - 273.15;
    return value;
  }

  function fromCelsius(value, unit) {
    if (unit === 'F') return value * 9 / 5 + 32;
    if (unit === 'K') return value + 273.15;
    return value;
  }

  function formatResult(value) {
    return Number(value.toFixed(2)).toLocaleString('es-CO', { maximumFractionDigits: 2 });
  }

  function clearError() { errorMessage.textContent = ''; input.removeAttribute('aria-invalid'); }
  function showError(message) { errorMessage.textContent = message; input.setAttribute('aria-invalid', 'true'); }

  function validateInput() {
    const rawValue = input.value.trim();
    if (!rawValue) return 'Escribe una temperatura para realizar la conversión.';
    const value = Number(rawValue);
    if (!Number.isFinite(value)) return 'Ingresa un valor numérico válido.';
    if (fromUnit.value === 'K' && value < 0) return 'La temperatura en Kelvin no puede ser inferior a 0 K.';
    return '';
  }

  // Rangos de referencia en Celsius: fría < 10, templada 10–29.99, caliente ≥ 30.
  function updateTemperatureIndicator(celsius) {
    const isCold = celsius < 10;
    const isHot = celsius >= 30;
    status.className = `temperature-status ${isCold ? 'status-cold' : isHot ? 'status-hot' : 'status-mild'}`;
    statusIcon.textContent = isCold ? '❄' : isHot ? '♨' : '☼';
    statusText.textContent = isCold ? 'Temperatura fría' : isHot ? 'Temperatura caliente' : 'Temperatura templada';
  }

  function convertTemperature() {
    const validationMessage = validateInput();
    clearError();
    if (validationMessage) {
      showError(validationMessage);
      resultValue.textContent = '—';
      resultCaption.textContent = 'Revisa el valor ingresado para continuar.';
      status.className = 'temperature-status status-neutral';
      statusIcon.textContent = '◌';
      statusText.textContent = 'Esperando un valor';
      return false;
    }
    const value = Number(input.value);
    const converted = fromCelsius(toCelsius(value, fromUnit.value), toUnit.value);
    resultValue.textContent = `${formatResult(converted)} ${symbols[toUnit.value]}`;
    resultCaption.textContent = `${formatResult(value)} ${symbols[fromUnit.value]} equivalen a`;
    updateTemperatureIndicator(toCelsius(value, fromUnit.value));
    resultValue.classList.remove('is-updated');
    void resultValue.offsetWidth;
    resultValue.classList.add('is-updated');
    return true;
  }

  function swapUnits() {
    const previousFrom = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = previousFrom;
    inputUnit.textContent = symbols[fromUnit.value];
    if (input.value.trim()) convertTemperature();
  }

  function clearForm() {
    form.reset();
    inputUnit.textContent = symbols[fromUnit.value];
    clearError();
    resultValue.textContent = '—';
    resultCaption.textContent = 'Ingresa una temperatura para comenzar.';
    status.className = 'temperature-status status-neutral';
    statusIcon.textContent = '◌';
    statusText.textContent = 'Esperando un valor';
    input.focus();
  }

  form.addEventListener('submit', (event) => { event.preventDefault(); convertTemperature(); });
  input.addEventListener('input', () => { inputUnit.textContent = symbols[fromUnit.value]; if (input.value.trim()) convertTemperature(); else clearForm(); });
  fromUnit.addEventListener('change', () => { inputUnit.textContent = symbols[fromUnit.value]; if (input.value.trim()) convertTemperature(); });
  toUnit.addEventListener('change', () => { if (input.value.trim()) convertTemperature(); });
  document.querySelector('#swap-button').addEventListener('click', swapUnits);
  document.querySelector('#clear-button').addEventListener('click', clearForm);
})();
