export function normalizeString(str) {
  return str
    .trim()
    .replace(/[_\s-]+/g, "-") // uniformise en tirets
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève les accents
    .replace(/['’‘`´]/g, "") // enlève les apostrophes
    .replace(/[^a-zA-Z0-9-]/g, ""); // enlève les caractères spéciaux mais garde les majuscules
}

// export function normalizeString(str) {
//   return (
//     str
//       .trim()
//       // .toLowerCase()
//       .replace(/[_\s-]+/g, "-") // tout en tirets
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "") // accents
//       .replace(/['’‘`´]/g, "") // apostrophes
//       .replace(/[^a-z0-9-]/g, "")
//   ); // caractères spéciaux (optionnel)
// }
