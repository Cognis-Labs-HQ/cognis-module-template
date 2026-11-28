# Anwendung

Ein installierbares Beispiel zum Erstellen einer Cognis-Erweiterung mit eigenen Daten und eigener Oberfläche.

## Voraussetzungen

Ein Administrator muss das Modul installieren und aktivieren. Melden Sie sich vor dem Öffnen der Beispielseite an.

## Beispiele

Öffnen Sie /showcase, geben Sie eine Bezeichnung ein und senden Sie das Formular ab. Öffnen Sie die Liste erneut, um den gespeicherten Eintrag zu prüfen.

- Öffnen Sie nach der Aktivierung `/showcase`, um die lokalisierte Page-Composer-Oberfläche zu verwenden.
- Führen Sie `cognisctl modules:module-template:list` aus, um dieselbe authentifizierte API über die CLI zu nutzen.
- Lösen Sie `module-template:listItems` über `ctx` auf, statt Modulinterna zu importieren.
- Erweitern Sie den Flow `module-template:listItems` durch eine benannte, entfernbare Stufe.
- Deaktivieren und reaktivieren Sie das Modul, um wiederholbare Registrierungen zu prüfen.

## Erwartete Ergebnisse

Der Eintrag erscheint in der Modulliste; authentifizierter Befehl und Browseransicht lesen dieselben gespeicherten Einträge.

## Fehlerbehebung

Ist die Beispielseite nicht verfügbar, lassen Sie Aktivierung sowie benötigte Datenbank- und Authentifizierungsdienste prüfen.
