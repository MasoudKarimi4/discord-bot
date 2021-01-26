// Masoud JS Palindrome Checker Project

function palindrome(str) {

  // Converting the string to lowercase in Regex to prevent issues
  str = str.toLowerCase().replace(/[\W_]/g, "");

  // Iterating through all components , returning false if an inconsistency is detected
  for (let k = 0, len = str.length - 1; k < len / 2; k++) {
    if (str[k] !== str[len - k]) {
      return false;
    }
  }return true;
}
palindrome("pop");
