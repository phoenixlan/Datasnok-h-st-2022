# Rookie mistake

## Læremål

 * Forstå at uansett hvor bra sikring du har, kan alt falle fra hverandre om du slurver

## Løsning

Oppgaven er inspirert av Sony's episke feil med PlayStation 3, der det som ble sett på som den mest sikre konsollen noen sinne falt fra hverandre fordi nøkkelgeneratoren de brukte var defekt. Dette ble offentliggjort i et kjent foredrag som jeg anbefaler sterkt å se: [https://www.youtube.com/watch?v=DUGGJpn2_zY](https://www.youtube.com/watch?v=DUGGJpn2_zY)

I vårt tilfelle "gjenskapte" vi det på en enklere måte ved å kryptere noe med AES, med `0x00` som både nøkkel og IV.



