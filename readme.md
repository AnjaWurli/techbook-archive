## Tech-Book Archiv

Unter https://bookmonkey-api.jgreg.uber.space/ findet ihr eine restful Api. Alternativ könnt ihr diese auch lokal installieren https://www.npmjs.com/package/bookmonkey-api

## Aufgaben:

1. Gib alle Bücher in einer Tabelle aus. Pro Zeile / Bucheintrag soll nur Titel und isbn angezeigt werden.
2. Es soll überhalb der Tabelle ein Suchfunktion geben. Berücksichtigt werden soll auch das abstract und der subtitble.
3. Jedes Buch soll gelöscht werden können.
4. Jedes Buch soll editiert werden können.
5. Es sollen neue Bücher erstellt werden können.
6. Durch anklicken eines Buch Titels sollen alle Details zu einem Buch angezeigt werden.
7. Erstelle eine Merkzettel Funktion.

- Jedes Buch soll zu dem Merkzettel hinzugefügt und wieder entfernt werden können.
- Die gemerkten Bücher sollen über den localstorage gespeichert werden.
- Der Merkzettel soll über eine extra url aufgerufen werden können z.B. http://localhost:5500/wishlist
- Auf der Seite wird wieder eine Tabelle, wie bei der Auflistung, ausgegeben werden aber diesmal nur mit den Büchern die auf der Merkliste stehen. Es soll ein Button geben um die Bücher von der Merkliste zu entfernen

Das Styling obliegt ganz dir.

Hinweis für Experimentierfreudige
Versuche edit, detail und create auf eigene Seiten auszulagern

Edit Beispiel: http://localhost:5500/edit/index.html?id=9780071494618
Detail Beispiel: http://localhost:5500/book-detail/index.html?id=9780071494618
Create http://localhost:5500/create

Inspiration um die ID für das Editieren und die Detailseite auf einer extra Seite zu bekommen und zu Wissen um welches Buch es sich handelt: https://www.youtube.com/watch?v=j3-LV3XxhVg

## Zeit:

Aufgabe 1: 1,5h
Aufgabe 3: 1h
Aufgabe 2: 30min
Aufgabe 5: 1,5h
Aufgabe 6: 1,5h
