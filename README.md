# Medical Report Analyzer

A browser-based prototype for explaining common blood test report values in simple language.

## Open

Use the local preview URL while the server is running:

```text
http://127.0.0.1:8765/
```

You can also open `index.html` directly in a browser. PDF text extraction and image OCR use browser-loaded CDN libraries when available, so those features work best with an internet connection.

## Included Features

- Upload area for PDF, JPG, and PNG reports.
- Optional browser OCR for images through Tesseract.js.
- Optional browser PDF text extraction through PDF.js.
- Manual text paste fallback.
- Blood value extraction for common CBC, vitamin, glucose, lipid, kidney, and liver markers.
- Abnormal value flags for low, high, and very abnormal results.
- Plain-language explanations, possible reasons, and lifestyle or follow-up suggestions.
- Overall health summary with an educational safety disclaimer.
- Range charts comparing each value with the normal range.
- Local PDF summary generation.

## Medical Safety

This prototype is educational only. It does not diagnose, prescribe, or replace a clinician. Reference ranges vary by laboratory, age, sex, pregnancy status, and medical history. The analyzer uses ranges printed in the report whenever it can detect them, and otherwise falls back to broad comparison ranges.
