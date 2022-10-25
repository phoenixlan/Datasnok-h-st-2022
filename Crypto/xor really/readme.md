# Xor really

## Læremål

 * Forstå known plaintext attacks mot XOR
 * Forstå at XOR er en dårlig form for kryptografi

## Løsning

Du blir gitt følgende ciphertext: `50e2f4894ee3e3b778e5e99372ef8fa04cd3c6`

Fra oppgavetittelen vet vi at det er snakk om XOR kryptering. Siden alle flagg starter med `PHOENIX{` kan vi XOR'e det med cipherteksten for å få ut nøkkelen som ble brukt for å kryptere. Den første byten i nøkkelen er `0x00` for å hinte til at dette er mulig. Konverterer du ciphertexten fra hex til binær ser du at første bokstav er P, samme som vi vet klarteksten kommer til å være. Første byte av nøkkelen må derfor være `0x00`.

Resten av nøkkelen kan du gjette deg fram til med en ascii-til-tekst tabell og ligg tålmodighet.

 * Cleartext: `PHOENIX{xOR_rE4lLy}`
 * Key: 00aabbcc

