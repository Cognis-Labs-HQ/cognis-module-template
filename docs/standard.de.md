# Vorlage für externe Cognis-Module

Die Vorlage für externe Cognis-Module ist eine installierbare Referenzimplementierung für API-, UI-, CLI-, Persistenz-, Capability-, Flow-, Lokalisierungs-, Test- und Paketierungsverträge.

## Anwendungsbeispiele

- Öffnen Sie nach der Aktivierung `/showcase`, um die lokalisierte Browseroberfläche zu verwenden.
- Führen Sie `cognisctl module-template:list` aus, um dieselbe authentifizierte API über die CLI zu nutzen.
- Lösen Sie `showcase:listItems` über `ctx` auf, um Einträge ohne Import von Modulinterna aufzulisten.
- Erweitern Sie den Flow `showcase-items`, um Ergebnisse über eine benannte, entfernbare Integrationsstufe anzureichern.

## Technische Spezifikation

Die Vorlage zeigt die Grenzen, die jedes eigenständige externe Cognis-Modul einhalten muss.

### Integrationsvertrag

- `bootstrap.js` ist der einzige Integrationseinstiegspunkt der Plattform.
- `ctx` stellt Routen, UI-Registrierung, Capabilities, Flows, Authentifizierung, Protokollierung und Persistenzzugriff bereit.
- Laufzeitimporte bleiben repository-relativ und greifen nie auf Interna von Cognis oder benachbarten Komponenten zu.
- Bereichsgebundene Registrierungen müssen beim Deaktivieren oder Deinstallieren entfernbar sein.

### Sicherheit

- API-Routen authentifizieren und autorisieren vor der Geschäftslogik.
- Anfragedaten werden an der HTTP-Grenze begrenzt, validiert und normalisiert.
- Öffentliche Fehler geben keine internen Implementierungsdetails preis.
- Fehler werden mit sicheren strukturierten Metadaten protokolliert.

### Freigabeprozess

- Halten Sie die Versionen in `manifest.json`, `package.json` und `package-lock.json` synchron und bewahren Sie die Modul-UUID.
- Führen Sie vor einem Release-Commit `npm install`, `npm test`, `npm run lint`, `npm run manifest:hashes`, `npm run check:manifest` und `git diff --check` aus.
- Erzeugen Sie `manifest.files` nach der letzten Änderung einer ausgelieferten Datei neu, damit alle repository-relativen Pfade und SHA-256-Prüfsummen überprüfbar bleiben.
