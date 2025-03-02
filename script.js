function formatBinary(binaryStr) {
  // Align to 32 bits, pad with 0s, and add a space every 4 bits
  const paddedBinary = binaryStr.padStart(32, '0');
  return paddedBinary.replace(/(.{4})/g, '$1 ').trim();
}

function convertNumber() {
  const inputBase = document.getElementById('input-base').value;
  let inputValue = document.getElementById('input-value').value.trim();

  if (!inputValue) {
    clearOutputs();
    return;
  }

  let decimal;

  // Handle Hexadecimal input
  if (inputBase === 'hexadecimal') {
    // Remove any '0x' or '0X' prefix before parsing
    if (inputValue.startsWith('0x') || inputValue.startsWith('0X')) {
      inputValue = inputValue.slice(2); // Remove 0x or 0X
    }

    // If the input contains invalid characters (anything other than 0-9, A-F, a-f), it's invalid
    if (/[^0-9a-fA-F]/.test(inputValue)) {
      alert("Invalid hexadecimal input! Please enter a valid hexadecimal number.");
      clearOutputs();
      return;
    }
    decimal = parseInt(inputValue, 16); // Convert hexadecimal to decimal
    if (isNaN(decimal)) {
      return;
    }
  } else if (inputBase === 'decimal') {
    // If the input is not valid
    if (isNaN(inputValue)) {
      alert("Invalid input! Please enter a valid number.");
      clearOutputs();
      return;
    }
    decimal = parseInt(inputValue, 10); // Decimal to decimal
  } else if (inputBase === 'octal') {
    decimal = parseInt(inputValue, 8); // Octal to decimal
  } else if (inputBase === 'binary') { // Add handling for binary input
    // Check if the input is a valid binary number (only 0s and 1s)
    if (/^[01]+$/.test(inputValue)) {
      decimal = parseInt(inputValue, 2);
    } else {
      alert("Invalid binary number! Please enter a valid binary number.");
      clearOutputs();
      return;
    }
  }

  // If the input is not valid
  if (isNaN(decimal)) {
    alert("Invalid input! Please enter a valid number.");
    clearOutputs();
    return;
  }

  // Convert to binary, octal, and hexadecimal
  const binary = formatBinary(decimal.toString(2));
  const octal = '0' + decimal.toString(8);  // Octal with 0 prefix
  const hexadecimal = '0x' + decimal.toString(16).toUpperCase();  // Hexadecimal with 0x prefix

  // Display the results
  document.getElementById('decimal-output').value = decimal; // Decimal output
  document.getElementById('binary-output').value = binary;
  document.getElementById('octal-output').value = octal;
  document.getElementById('hexadecimal-output').value = hexadecimal;
}

function copyToClipboard(elementId) {
  const textArea = document.getElementById(elementId);
  textArea.select();
  document.execCommand('copy');
  alert(`${elementId.replace('-output', '')} copied to clipboard!`);
}

function clearOutputs() {
  document.getElementById('input-value').value = '';
  document.getElementById('decimal-output').value = '';
  document.getElementById('binary-output').value = '';
  document.getElementById('octal-output').value = '';
  document.getElementById('hexadecimal-output').value = '';
}

function switchInputBase() {
  const inputBase = document.getElementById('input-base').value;
  const inputValue = document.getElementById('input-value');

  if (inputBase === 'hexadecimal') {
    inputValue.placeholder = 'Enter Hexadecimal Number (e.g. 0xA3)';
  } else if (inputBase === 'octal') {
    inputValue.placeholder = 'Enter Octal Number';
  } else if (inputBase === 'binary') {
    inputValue.placeholder = 'Enter Binary Number'; // Placeholder for binary
  } else {
    inputValue.placeholder = 'Enter Decimal Number';
  }

  // Automatically trigger conversion if there's a value
  if (inputValue.value) {
    convertNumber();
  } else {
    clearOutputs();
  }
}
