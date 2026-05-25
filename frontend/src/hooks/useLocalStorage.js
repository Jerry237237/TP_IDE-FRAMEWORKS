import { useState, useEffect } from "react";

function useLocalStorage(cle, valeurInitiale) {
  const [valeur, setValeur] = useState(() => {
    const donneesSauvegardees = localStorage.getItem(cle);
    if (donneesSauvegardees) {
      return JSON.parse(donneesSauvegardees);
    }
    return valeurInitiale;
  });

  useEffect(() => {
    localStorage.setItem(cle, JSON.stringify(valeur));
  }, [valeur]);

  return [valeur, setValeur];
}

export default useLocalStorage;