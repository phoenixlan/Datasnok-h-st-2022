# Bad drive krypto

## Læremål

 * Forstå at XOR-nøkler kan trivielt gjettes dersom klarteksten inneholder masse `0x00`
 * Kunne mounte et diskbilde som disk

## Hint i oppgave-tittel

 * Bad drive crypto impliserer dårlig kryptografi. XOR er et eksempel på dårlig kryptografi

## Løsning

Å åpne filen i en hvilkensomhelst hexeditor(Jeg anbefaler HxD) viser en fil som ser ca slik ut:

```
ptr:Bad Drive Crypto/ (main) $ xxd -l 512 test.img.encrypted                                                                                                                      [16:01:20]
00000000: 2bf6 5077 abac b334 a6ab b41a c2ce c41a  +.Pw...4........
00000010: c2ca c21a e832 c81a e0ca c21a c0ca c01a  .....2..........
00000020: c0ca c01a 40ca e96c 92c4 a754 8fea 8e5b  ....@..l...T...[
00000030: 8d8f e03a e0ea 865b 94fb f23a e0ea ce05  ...:...[...:....
00000040: 7e91 bcb6 e20a b411 967e cea1 c7ca 0d0a  ~........~......
00000050: 9e21 3028 2407 d6d7 d921 3e4e a8a3 b33a  .!0($....!>N...:
00000060: a9b9 e074 afbe e07b e0a8 af75 b4ab a276  ...t...{...u...v
00000070: a5ea a473 b3a1 ee3a e09a ac7f a1b9 a53a  ...s...:.......:
00000080: a9a4 b37f b2be e07b e0a8 af75 b4ab a276  .......{...u...v
00000090: a5ea a676 afba b063 e0ab ae7e cdc0 b068  ...v...c...~...h
000000a0: a5b9 b33a a1a4 b93a abaf b93a b4a5 e06e  ...:...:...:...n
000000b0: b2b3 e07b a7ab a974 e0e4 ee34 e0c7 ca1a  ...{...t...4....
000000c0: c0ca c01a c0ca c01a c0ca c01a c0ca c01a  ................
000000d0: c0ca c01a c0ca c01a c0ca c01a c0ca c01a  ................
000000e0: c0ca c01a c0ca c01a c0ca c01a c0ca c01a  ................
```
_(Jeg bruker xxd som hexeditor i dette tilfellet)_

Det viktigste å observere her er det repetitive mønsteret `c0ca c01a`. Siden vi vet at filen `test.img.encrypted` skal være kryptert, er repetitive tegn et tegn på at algoritmen som ble brukt var svak. Dette vet vi fordi perfekt kryptering i teorien har _lav entropi_, noe som betyr at det skal være umulig å se forskjell på kryptert data og støy. Dvs. hvert tall 0-255 skal dukke opp ca like mange ganger i fila. 

Siden vi vet at fila er en kryptert-diskfil, kan vi gjøre et par antagelser:

 * Diskfilen er antageligvis ikke 100% full av data, den inneholder nok litt tomrom
 * Tomrommet må inneholde _noe_. 0x00 er sannsynlig.

Filen inneholder mye `c0ca c01a`, så vi kan anta at dette er tomrommet. Dersom vi antar klarteksten for disse bytene er `0x00`, kan vi gjøre et _known plaintext attack_. Dette er xor veldig sårbar til.

`0x00` xoret med et tall blir bare tallet. F.ex er `0x00 xor 0xfa = 0xfa`. Dermed vet vi at nøkkelen er `c0cac01a`.

Filen kan dekrypteres på mange forskjellige måter. En mulighet er å bruke cyberchef.

## Hente ut flagget

Etter at du har dekryptert diskbildet må du hente ut flagget. Siden filen er et diskbilde er den letteste måten å få ut innholdet på å montere det til filsystemet ditt. I linux er dette ganske lett.

```
mkdir /tmp/datasnok
mount test.img /tmp/datasnok
```

Du vil så kunne hente ut flagget ved å navigere til `/tmp/datasnok`
