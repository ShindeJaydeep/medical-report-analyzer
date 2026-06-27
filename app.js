const elements = {
  analyzeBtn: document.getElementById("analyzeBtn"),
  browseBtn: document.getElementById("browseBtn"),
  clearTextBtn: document.getElementById("clearTextBtn"),
  downloadPdfBtn: document.getElementById("downloadPdfBtn"),
  dropZone: document.getElementById("dropZone"),
  engineStatus: document.getElementById("engineStatus"),
  fileInput: document.getElementById("reportFile"),
  flagList: document.getElementById("flagList"),
  chartsGrid: document.getElementById("chartsGrid"),
  detailsGrid: document.getElementById("detailsGrid"),
  imageCaption: document.getElementById("imageCaption"),
  imagePreview: document.getElementById("imagePreview"),
  imagePreviewWrap: document.getElementById("imagePreviewWrap"),
  manualText: document.getElementById("manualText"),
  resetBtn: document.getElementById("resetBtn"),
  resultsTable: document.getElementById("resultsTable"),
  sampleBtn: document.getElementById("sampleBtn"),
  summaryGrid: document.getElementById("summaryGrid"),
  summaryText: document.getElementById("summaryText")
};

const sampleReport = [
  "Complete Blood Count and Wellness Panel",
  "Hemoglobin 10.2 g/dL 12-15",
  "WBC 12,500 /uL 4,000-11,000",
  "Platelets 280,000 /uL 150,000-450,000",
  "Vitamin D 15 ng/mL 30-100",
  "Fasting Blood Sugar 92 mg/dL 70-99",
  "Total Cholesterol 218 mg/dL <200",
  "HDL Cholesterol 42 mg/dL >40",
  "LDL Cholesterol 138 mg/dL <100"
].join("\n");

const labs = [
  {
    id: "hemoglobin",
    name: "Hemoglobin",
    aliases: ["hemoglobin", "haemoglobin", "hgb", "hb"],
    unit: "g/dL",
    decimals: 1,
    range: { min: 12, max: 15 },
    critical: { low: 7, high: 20 },
    low: "Hemoglobin is below the expected range. Hemoglobin carries oxygen through the body, so low levels can be seen with anemia or reduced red blood cell production.",
    high: "Hemoglobin is above the expected range. This can happen with dehydration, living at high altitude, smoking, or conditions that increase red blood cells.",
    normal: "Hemoglobin is within the reference range shown for this report.",
    possibilitiesLow: ["Iron deficiency", "Vitamin B12 or folate deficiency", "Recent blood loss", "Chronic inflammation or kidney disease"],
    possibilitiesHigh: ["Dehydration", "High altitude exposure", "Smoking", "A red blood cell disorder"],
    suggestionsLow: ["Ask your clinician whether iron, B12, or folate testing is appropriate.", "Eat iron-rich foods such as lentils, beans, spinach, eggs, and meat if suitable.", "Pair iron foods with vitamin C foods such as citrus, amla, or tomato.", "Follow prescribed supplements only as directed."],
    suggestionsHigh: ["Hydrate well unless you have a fluid restriction.", "Review smoking, altitude exposure, and sleep symptoms with your clinician.", "Do not start aspirin or blood-thinning medicine unless prescribed."]
  },
  {
    id: "wbc",
    name: "White blood cells",
    aliases: ["white blood cells", "white blood cell count", "white blood count", "wbc", "leukocyte count", "leukocytes"],
    unit: "/uL",
    decimals: 0,
    range: { min: 4000, max: 11000 },
    critical: { low: 1000, high: 50000 },
    low: "White blood cells are below the expected range. These cells help fight infection, so low counts can make infection risk higher.",
    high: "White blood cells are above the expected range. Higher values can appear with infection, inflammation, stress, medicines, or blood disorders.",
    normal: "White blood cells are within the reference range shown for this report.",
    possibilitiesLow: ["Recent viral illness", "Bone marrow suppression", "Certain medicines", "Autoimmune conditions"],
    possibilitiesHigh: ["Infection or inflammation", "Physical stress", "Steroid medicines", "A blood or immune condition"],
    suggestionsLow: ["Discuss infection precautions and medicine review with your clinician.", "Seek medical advice promptly if fever or repeated infections occur.", "Do not stop prescribed medicines without guidance."],
    suggestionsHigh: ["Look for symptoms such as fever, cough, urinary burning, or pain and discuss them with a clinician.", "Rest, hydrate, and follow the treatment plan if an infection is confirmed.", "Repeat testing may be needed if your doctor recommends it."]
  },
  {
    id: "vitamin_d",
    name: "Vitamin D",
    aliases: ["vitamin d", "25-oh vitamin d", "25 hydroxy vitamin d", "25(oh)d", "vit d"],
    unit: "ng/mL",
    decimals: 1,
    range: { min: 30, max: 100 },
    critical: { low: 10, high: 150 },
    low: "Vitamin D is below the expected range. Vitamin D supports bones, muscles, and immune function.",
    high: "Vitamin D is above the expected range. High levels are often related to excess supplementation and can affect calcium balance.",
    normal: "Vitamin D is within the reference range shown for this report.",
    possibilitiesLow: ["Low sun exposure", "Low dietary intake", "Malabsorption", "Higher body requirement"],
    possibilitiesHigh: ["Excess supplementation", "High-dose vitamin D treatment", "Calcium metabolism problems"],
    suggestionsLow: ["Discuss vitamin D replacement with your clinician.", "Include vitamin D foods such as fortified milk, eggs, and suitable fish.", "Use sensible sunlight exposure when appropriate for your skin and health history."],
    suggestionsHigh: ["Pause extra over-the-counter vitamin D until reviewed by a clinician.", "Ask whether calcium and kidney function should be checked.", "Keep a list of all supplements and doses."]
  },
  {
    id: "glucose",
    name: "Fasting blood sugar",
    aliases: ["fasting blood sugar", "fasting glucose", "blood sugar", "glucose", "fbs"],
    unit: "mg/dL",
    decimals: 0,
    range: { min: 70, max: 99 },
    critical: { low: 54, high: 400 },
    low: "Glucose is below the expected fasting range. Low glucose can cause shakiness, sweating, confusion, or weakness.",
    high: "Glucose is above the expected fasting range. Higher fasting glucose can be seen with prediabetes, diabetes, stress, or some medicines.",
    normal: "Fasting glucose is within the reference range shown for this report.",
    possibilitiesLow: ["Delayed meals", "Diabetes medicine effect", "Alcohol use", "Hormone or liver conditions"],
    possibilitiesHigh: ["Prediabetes or diabetes", "Recent illness or stress", "Steroid medicines", "Non-fasting sample"],
    suggestionsLow: ["If you have symptoms of low sugar, follow your clinician's low-glucose plan.", "Review meal timing and diabetes medicines if applicable.", "Seek urgent help for severe confusion, fainting, or seizure."],
    suggestionsHigh: ["Discuss repeat fasting glucose or HbA1c testing with your clinician.", "Choose high-fiber meals and limit sugary drinks.", "Add regular activity if your clinician says it is safe."]
  },
  {
    id: "hba1c",
    name: "HbA1c",
    aliases: ["hba1c", "hemoglobin a1c", "glycated hemoglobin", "a1c"],
    unit: "%",
    decimals: 1,
    range: { min: null, max: 5.6 },
    critical: { low: null, high: 10 },
    low: "HbA1c is below the usual comparison range. This may be expected in some people and should be interpreted with medical history.",
    high: "HbA1c is above the usual comparison range. It reflects higher average blood sugar over the past two to three months.",
    normal: "HbA1c is within the reference range used by this analyzer.",
    possibilitiesLow: ["Recent blood loss", "Shortened red blood cell survival", "Individual variation"],
    possibilitiesHigh: ["Prediabetes or diabetes", "Recent months of high blood sugar", "Medicine or lifestyle factors"],
    suggestionsLow: ["Review the result with your clinician if it does not match glucose readings.", "Mention anemia, transfusion, or recent bleeding history."],
    suggestionsHigh: ["Discuss a diabetes evaluation or treatment plan with your clinician.", "Prioritize high-fiber foods, sleep, movement, and medication adherence if prescribed."]
  },
  {
    id: "total_cholesterol",
    name: "Total cholesterol",
    aliases: ["total cholesterol", "cholesterol total", "cholesterol"],
    unit: "mg/dL",
    decimals: 0,
    range: { min: null, max: 200 },
    critical: { low: null, high: 300 },
    low: "Total cholesterol is below the comparison range. Low values may be normal for some people but should be reviewed in context.",
    high: "Total cholesterol is above the usual desirable range. Cholesterol risk depends on LDL, HDL, triglycerides, age, blood pressure, diabetes, and smoking history.",
    normal: "Total cholesterol is within the reference range used by this analyzer.",
    possibilitiesLow: ["Low dietary intake", "Thyroid or liver conditions", "Individual variation"],
    possibilitiesHigh: ["Dietary pattern", "Genetic tendency", "Low thyroid function", "Metabolic conditions"],
    suggestionsLow: ["Review nutrition and weight changes with a clinician if unexpected.", "Interpret alongside LDL, HDL, and triglycerides."],
    suggestionsHigh: ["Discuss full cardiovascular risk, not one value alone.", "Favor fiber-rich foods, unsaturated fats, and regular physical activity.", "Follow prescribed lipid-lowering medicines if applicable."]
  },
  {
    id: "ldl",
    name: "LDL cholesterol",
    aliases: ["ldl cholesterol", "ldl-c", "ldl"],
    unit: "mg/dL",
    decimals: 0,
    range: { min: null, max: 100 },
    critical: { low: null, high: 190 },
    low: "LDL is below the comparison range. This is often acceptable, especially when treatment targets lower LDL.",
    high: "LDL is above the usual optimal range. LDL is one part of cardiovascular risk and is interpreted with the whole risk profile.",
    normal: "LDL is within the reference range used by this analyzer.",
    possibilitiesLow: ["Effective cholesterol treatment", "Individual variation", "Dietary pattern"],
    possibilitiesHigh: ["Genetic tendency", "Dietary saturated fat", "Metabolic syndrome", "Low thyroid function"],
    suggestionsLow: ["Continue the plan recommended by your clinician.", "Review any symptoms or medication concerns during follow-up."],
    suggestionsHigh: ["Discuss risk-based LDL goals with your clinician.", "Increase soluble fiber foods such as oats, beans, and lentils.", "Choose unsaturated fats and limit trans fats."]
  },
  {
    id: "hdl",
    name: "HDL cholesterol",
    aliases: ["hdl cholesterol", "hdl-c", "hdl"],
    unit: "mg/dL",
    decimals: 0,
    range: { min: 40, max: null },
    critical: { low: 25, high: null },
    low: "HDL is below the usual comparison range. HDL is one marker within a broader heart-health profile.",
    high: "HDL is above the comparison range. Higher HDL is often not concerning by itself, but context still matters.",
    normal: "HDL is within the reference range used by this analyzer.",
    possibilitiesLow: ["Low physical activity", "Smoking", "Insulin resistance", "Genetic tendency"],
    possibilitiesHigh: ["Genetic tendency", "Lifestyle factors", "Some medicines"],
    suggestionsLow: ["Add regular physical activity if safe.", "Avoid smoking and discuss cessation support if relevant.", "Review the full lipid panel with a clinician."],
    suggestionsHigh: ["Interpret with LDL, triglycerides, and overall cardiovascular risk.", "Continue heart-healthy habits."]
  },
  {
    id: "triglycerides",
    name: "Triglycerides",
    aliases: ["triglycerides", "tg"],
    unit: "mg/dL",
    decimals: 0,
    range: { min: null, max: 150 },
    critical: { low: null, high: 500 },
    low: "Triglycerides are below the comparison range. Low values may be expected depending on diet and health context.",
    high: "Triglycerides are above the usual desirable range. Higher levels can be affected by sugar intake, alcohol, diabetes, thyroid function, and genetics.",
    normal: "Triglycerides are within the reference range used by this analyzer.",
    possibilitiesLow: ["Low-fat intake", "Individual variation", "Recent diet change"],
    possibilitiesHigh: ["High refined carbohydrate intake", "Alcohol use", "Diabetes or insulin resistance", "Genetic tendency"],
    suggestionsLow: ["Review nutrition if the result is unexpected or paired with weight loss.", "Interpret with the full lipid panel."],
    suggestionsHigh: ["Limit sugary drinks and refined carbohydrates.", "Discuss alcohol intake and diabetes screening with your clinician.", "Ask about urgent management if levels are very high."]
  },
  {
    id: "platelets",
    name: "Platelets",
    aliases: ["platelet count", "platelets", "plt"],
    unit: "/uL",
    decimals: 0,
    range: { min: 150000, max: 450000 },
    critical: { low: 20000, high: 1000000 },
    low: "Platelets are below the expected range. Platelets help blood clot, so low values can increase bleeding risk.",
    high: "Platelets are above the expected range. Higher values can be reactive after inflammation, infection, iron deficiency, or less commonly from bone marrow conditions.",
    normal: "Platelets are within the reference range shown for this report.",
    possibilitiesLow: ["Recent viral illness", "Medicine effect", "Immune platelet condition", "Bone marrow suppression"],
    possibilitiesHigh: ["Inflammation or infection", "Iron deficiency", "Recent surgery or blood loss", "Bone marrow disorder"],
    suggestionsLow: ["Report unusual bruising, bleeding, or tiny red skin spots to a clinician.", "Avoid starting aspirin or anti-inflammatory medicines unless approved.", "Seek urgent care for heavy bleeding."],
    suggestionsHigh: ["Review iron status and inflammation symptoms with your clinician.", "Stay hydrated and follow up if your doctor recommends repeat testing.", "Do not start blood thinners unless prescribed."]
  },
  {
    id: "rbc",
    name: "Red blood cells",
    aliases: ["red blood cells", "red blood cell count", "rbc"],
    unit: "million/uL",
    decimals: 2,
    range: { min: 4.0, max: 5.5 },
    critical: { low: 2.5, high: 7.0 },
    low: "Red blood cell count is below the expected range. This can align with anemia when hemoglobin is also low.",
    high: "Red blood cell count is above the expected range. This can happen with dehydration, altitude, smoking, or increased red cell production.",
    normal: "Red blood cell count is within the reference range shown for this report.",
    possibilitiesLow: ["Iron, B12, or folate deficiency", "Blood loss", "Chronic disease", "Bone marrow conditions"],
    possibilitiesHigh: ["Dehydration", "High altitude", "Smoking", "Sleep-related low oxygen"],
    suggestionsLow: ["Interpret with hemoglobin, hematocrit, MCV, and iron studies.", "Discuss symptoms such as fatigue, breathlessness, or dizziness."],
    suggestionsHigh: ["Hydrate unless restricted and review oxygen-related symptoms with your clinician.", "Ask whether repeat CBC testing is needed."]
  },
  {
    id: "hematocrit",
    name: "Hematocrit",
    aliases: ["hematocrit", "hct", "pcv"],
    unit: "%",
    decimals: 1,
    range: { min: 36, max: 46 },
    critical: { low: 21, high: 60 },
    low: "Hematocrit is below the expected range. It represents the proportion of blood made up by red blood cells.",
    high: "Hematocrit is above the expected range. It may rise with dehydration or increased red blood cell concentration.",
    normal: "Hematocrit is within the reference range shown for this report.",
    possibilitiesLow: ["Anemia", "Blood loss", "Iron or vitamin deficiency", "Chronic inflammation"],
    possibilitiesHigh: ["Dehydration", "Smoking", "High altitude", "Red blood cell disorder"],
    suggestionsLow: ["Review with hemoglobin and RBC indices.", "Discuss iron, B12, and folate testing if your clinician agrees."],
    suggestionsHigh: ["Hydrate if appropriate and review with hemoglobin and RBC count.", "Seek guidance if headaches, vision changes, or clotting symptoms occur."]
  },
  {
    id: "creatinine",
    name: "Creatinine",
    aliases: ["serum creatinine", "creatinine"],
    unit: "mg/dL",
    decimals: 2,
    range: { min: 0.6, max: 1.3 },
    critical: { low: null, high: 4.0 },
    low: "Creatinine is below the expected range. This can be related to lower muscle mass and is often interpreted with kidney filtration estimates.",
    high: "Creatinine is above the expected range. It can suggest reduced kidney filtration, dehydration, medicine effects, or high muscle breakdown.",
    normal: "Creatinine is within the reference range shown for this report.",
    possibilitiesLow: ["Lower muscle mass", "Pregnancy", "Individual variation"],
    possibilitiesHigh: ["Dehydration", "Kidney function change", "Medicine effect", "High muscle breakdown"],
    suggestionsLow: ["Interpret with eGFR and medical history.", "Review unexpected changes with your clinician."],
    suggestionsHigh: ["Discuss eGFR, urine testing, medicines, and hydration with your clinician.", "Avoid over-the-counter anti-inflammatory medicines unless approved."]
  },
  {
    id: "alt",
    name: "ALT",
    aliases: ["alanine aminotransferase", "sgpt", "alt"],
    unit: "U/L",
    decimals: 0,
    range: { min: 7, max: 56 },
    critical: { low: null, high: 500 },
    low: "ALT is below the comparison range. Low ALT is usually less clinically important by itself.",
    high: "ALT is above the expected range. ALT is a liver enzyme that can rise with liver irritation or injury.",
    normal: "ALT is within the reference range shown for this report.",
    possibilitiesLow: ["Individual variation", "Lower vitamin B6 status"],
    possibilitiesHigh: ["Fatty liver", "Alcohol-related liver irritation", "Viral hepatitis", "Medicine or supplement effect"],
    suggestionsLow: ["Review only if paired with symptoms or other abnormal results.", "Interpret with the full liver panel."],
    suggestionsHigh: ["Avoid alcohol until reviewed if advised by your clinician.", "Review medicines and supplements with your clinician.", "Discuss repeat liver tests or hepatitis screening if appropriate."]
  },
  {
    id: "ast",
    name: "AST",
    aliases: ["aspartate aminotransferase", "sgot", "ast"],
    unit: "U/L",
    decimals: 0,
    range: { min: 10, max: 40 },
    critical: { low: null, high: 500 },
    low: "AST is below the comparison range. Low AST is usually less clinically important by itself.",
    high: "AST is above the expected range. AST can rise from liver, muscle, or other tissue irritation.",
    normal: "AST is within the reference range shown for this report.",
    possibilitiesLow: ["Individual variation", "Lower vitamin B6 status"],
    possibilitiesHigh: ["Liver irritation", "Muscle injury", "Alcohol effect", "Medicine or supplement effect"],
    suggestionsLow: ["Interpret with ALT and the full clinical picture.", "Review only if your clinician finds it relevant."],
    suggestionsHigh: ["Review exercise, alcohol, medicines, and symptoms with your clinician.", "Interpret together with ALT, bilirubin, and alkaline phosphatase."]
  }
];

const state = {
  results: [],
  sourceName: "Manual text"
};

function setStatus(message) {
  elements.engineStatus.textContent = message;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\u2013|\u2014|\u2212/g, "-")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeLine(value) {
  return normalizeText(value).replace(/\s+/g, " ").trim();
}

function normalizeNumber(token) {
  if (!token) return NaN;
  return Number(String(token).replace(/[<>=,\s]/g, ""));
}

function numberPattern() {
  return /[<>=]?\s*(?:\d+(?:,\d{3})+|\d+)(?:\.\d+)?/g;
}

function aliasRegex(definition) {
  const aliases = definition.aliases
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((alias) => escapeRegExp(alias).replace(/\s+/g, "\\s+"));
  return new RegExp(`(^|[^a-z0-9])(${aliases.join("|")})(?=$|[^a-z0-9])`, "i");
}

function detectUnit(fragment, valueEnd, definition) {
  const afterValue = fragment.slice(valueEnd, valueEnd + 40);
  const unitMatch = afterValue.match(/(g\/dL|mg\/dL|ng\/mL|cells?\/uL|\/uL|x\s*10\^3\/uL|10\^3\/uL|k\/uL|million\/uL|mmol\/L|U\/L|IU\/L|%|fL|pg)/i);
  if (!unitMatch) return definition.unit;
  return unitMatch[1].replace(/\s+/g, "");
}

function parseRangeFromRest(rest) {
  const number = "(?:\\d+(?:,\\d{3})+|\\d+)(?:\\.\\d+)?";
  const range = new RegExp(`(?:normal|reference|ref\\.?|range|interval)?\\s*[:=]?\\s*([<>=]?\\s*${number})\\s*(?:-|to)\\s*([<>=]?\\s*${number})`, "i");
  const rangeMatch = rest.match(range);

  if (rangeMatch) {
    return {
      min: normalizeNumber(rangeMatch[1]),
      max: normalizeNumber(rangeMatch[2]),
      source: "report"
    };
  }

  const maxOnly = rest.match(new RegExp(`(?:<=|<|less than|up to|below)\\s*(${number})`, "i"));
  if (maxOnly) {
    return { min: null, max: normalizeNumber(maxOnly[1]), source: "report" };
  }

  const minOnly = rest.match(new RegExp(`(?:>=|>|greater than|at least|above)\\s*(${number})`, "i"));
  if (minOnly) {
    return { min: normalizeNumber(minOnly[1]), max: null, source: "report" };
  }

  return null;
}

function scaledDefaultRange(definition, unit) {
  const range = { ...definition.range, source: "default" };
  const compactUnit = String(unit || "").toLowerCase();
  const usesThousands = /10\^3|k\/ul|k\/uL/i.test(compactUnit);

  if ((definition.id === "wbc" || definition.id === "platelets") && usesThousands) {
    return {
      min: range.min == null ? null : range.min / 1000,
      max: range.max == null ? null : range.max / 1000,
      source: "default"
    };
  }

  return range;
}

function parseLabLine(line, definition) {
  const normalized = normalizeLine(line);
  const found = normalized.match(aliasRegex(definition));
  if (!found) return null;

  const aliasStart = found.index + found[1].length;
  const fragment = normalized.slice(aliasStart);
  const matches = [...fragment.matchAll(numberPattern())];
  if (!matches.length) return null;

  const resultToken = matches[0];
  const value = normalizeNumber(resultToken[0]);
  if (!Number.isFinite(value)) return null;

  const valueEnd = resultToken.index + resultToken[0].length;
  const unit = detectUnit(fragment, valueEnd, definition);
  const rangeRest = fragment.slice(valueEnd);
  const reportRange = parseRangeFromRest(rangeRest);
  const range = reportRange || scaledDefaultRange(definition, unit);

  return {
    id: definition.id,
    name: definition.name,
    value,
    unit,
    range,
    definition,
    sourceLine: normalized
  };
}

function extractResults(text) {
  const lines = normalizeText(text)
    .split("\n")
    .map((line) => normalizeLine(line))
    .filter(Boolean);

  const found = [];
  for (const definition of labs) {
    let best = null;
    for (const line of lines) {
      const parsed = parseLabLine(line, definition);
      if (parsed) {
        best = parsed;
        break;
      }
    }
    if (best) found.push(classifyResult(best));
  }

  return found;
}

function classifyResult(result) {
  const { value, range, definition } = result;
  let status = "normal";
  if (range.min != null && value < range.min) status = "low";
  if (range.max != null && value > range.max) status = "high";

  const criticalLow = definition.critical.low;
  const criticalHigh = definition.critical.high;
  if ((criticalLow != null && value <= criticalLow) || (criticalHigh != null && value >= criticalHigh)) {
    status = "critical";
  }

  let intensity = "normal";
  if (status === "low" && range.min) {
    intensity = (range.min - value) / range.min > 0.18 ? "low" : "borderline";
  } else if (status === "high" && range.max) {
    intensity = (value - range.max) / range.max > 0.18 ? "high" : "borderline";
  } else if (status === "critical") {
    intensity = "critical";
  }

  const direction = status === "critical"
    ? criticalDirection(result)
    : status;

  return {
    ...result,
    status,
    intensity,
    direction,
    statusLabel: labelForStatus(status, direction),
    explanation: explanationFor(result, status, direction),
    possibilities: possibilitiesFor(result, direction),
    suggestions: suggestionsFor(result, direction)
  };
}

function criticalDirection(result) {
  const { value, definition } = result;
  if (definition.critical.low != null && value <= definition.critical.low) return "low";
  if (definition.critical.high != null && value >= definition.critical.high) return "high";
  return "critical";
}

function labelForStatus(status, direction) {
  if (status === "normal") return "Normal";
  if (status === "critical" && direction === "low") return "Very low";
  if (status === "critical" && direction === "high") return "Very high";
  if (status === "low") return "Low";
  if (status === "high") return "High";
  return "Review";
}

function explanationFor(result, status, direction) {
  if (status === "normal") return result.definition.normal;
  if (direction === "low") return result.definition.low;
  if (direction === "high") return result.definition.high;
  return "This value is far outside the broad comparison range and should be reviewed promptly by a healthcare professional.";
}

function possibilitiesFor(result, direction) {
  if (direction === "low") return result.definition.possibilitiesLow || [];
  if (direction === "high") return result.definition.possibilitiesHigh || [];
  return ["No abnormal pattern was detected for this value."];
}

function suggestionsFor(result, direction) {
  if (direction === "low") return result.definition.suggestionsLow || [];
  if (direction === "high") return result.definition.suggestionsHigh || [];
  return ["Keep following your clinician's routine screening advice.", "Compare this result with prior reports when available."];
}

function formatNumber(value, decimals) {
  if (!Number.isFinite(value)) return "";
  if (Math.abs(value) >= 1000) return Math.round(value).toLocaleString("en-US");
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function formatValue(result) {
  return `${formatNumber(result.value, result.definition.decimals)} ${result.unit}`;
}

function formatRange(result) {
  const { min, max } = result.range;
  const decimals = result.definition.decimals;
  let text = "";
  if (min != null && max != null) text = `${formatNumber(min, decimals)}-${formatNumber(max, decimals)}`;
  if (min == null && max != null) text = `<${formatNumber(max, decimals)}`;
  if (min != null && max == null) text = `>${formatNumber(min, decimals)}`;
  if (!text) text = "Not provided";
  return `${text} ${result.unit}`.trim();
}

function abnormalResults() {
  return state.results.filter((result) => result.status !== "normal");
}

function criticalResults() {
  return state.results.filter((result) => result.status === "critical");
}

function analyzeCurrentText(sourceName = "Manual text") {
  const text = elements.manualText.value.trim();
  if (!text) {
    setStatus("Add report text");
    return;
  }

  state.sourceName = sourceName;
  state.results = extractResults(text);
  renderAll();
  setStatus(state.results.length ? "Analyzed" : "No values found");
}

function renderAll() {
  renderSummary();
  renderFlags();
  renderTable();
  renderDetails();
  renderCharts();
}

function renderSummary() {
  const total = state.results.length;
  const abnormal = abnormalResults().length;
  const critical = criticalResults().length;
  const normal = total - abnormal;

  elements.summaryGrid.innerHTML = [
    metric("Detected values", total),
    metric("Normal", normal),
    metric("Needs review", abnormal),
    metric("Urgent flags", critical)
  ].join("");

  if (!total) {
    elements.summaryText.textContent = "No recognized blood values yet. Paste report text or try the sample.";
    return;
  }

  const abnormalNames = abnormalResults().map((result) => `${result.statusLabel.toLowerCase()} ${result.name}`);
  const findings = abnormalNames.length
    ? abnormalNames.join("; ")
    : "all detected values are within the available comparison ranges";
  const urgent = critical
    ? "Some values are far outside broad comparison ranges. Prompt clinical review is recommended, especially with symptoms."
    : "No critical emergency values were flagged by this educational tool.";

  elements.summaryText.textContent = `Overall summary: ${findings}. ${urgent} Please discuss these findings with your physician for diagnosis and treatment.`;
}

function metric(label, value) {
  return `<div class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function renderFlags() {
  const abnormal = abnormalResults();
  if (!state.results.length) {
    elements.flagList.innerHTML = emptyState("Detected abnormal values will appear here.");
    return;
  }

  if (!abnormal.length) {
    elements.flagList.innerHTML = emptyState("No abnormal values detected in the recognized results.");
    return;
  }

  elements.flagList.innerHTML = abnormal
    .map((result) => `
      <article class="flag-card status-${escapeHtml(result.intensity)}">
        <span class="status-dot" aria-hidden="true"></span>
        <div>
          <h3>${escapeHtml(result.statusLabel)} ${escapeHtml(result.name)}</h3>
          <p>${escapeHtml(formatValue(result))}; normal ${escapeHtml(formatRange(result))}</p>
        </div>
      </article>
    `)
    .join("");
}

function renderTable() {
  if (!state.results.length) {
    elements.resultsTable.innerHTML = `<tr><td colspan="4">No extracted values yet.</td></tr>`;
    return;
  }

  elements.resultsTable.innerHTML = state.results
    .map((result) => `
      <tr>
        <td>${escapeHtml(result.name)}</td>
        <td>${escapeHtml(formatValue(result))}</td>
        <td>${escapeHtml(formatRange(result))}<br><small>${result.range.source === "report" ? "From report" : "General fallback"}</small></td>
        <td><span class="badge ${escapeHtml(result.intensity)}">${escapeHtml(result.statusLabel)}</span></td>
      </tr>
    `)
    .join("");
}

function renderDetails() {
  if (!state.results.length) {
    elements.detailsGrid.innerHTML = emptyState("Plain-language explanations will appear after analysis.");
    return;
  }

  elements.detailsGrid.innerHTML = state.results
    .map((result) => `
      <article class="detail-card">
        <header>
          <div>
            <p class="eyebrow">${escapeHtml(result.statusLabel)}</p>
            <h3>${escapeHtml(result.name)}</h3>
          </div>
          <span class="badge ${escapeHtml(result.intensity)}">${escapeHtml(result.statusLabel)}</span>
        </header>
        <div class="value-line">
          <div class="mini-box">
            <span>Result</span>
            <strong>${escapeHtml(formatValue(result))}</strong>
          </div>
          <div class="mini-box">
            <span>Normal</span>
            <strong>${escapeHtml(formatRange(result))}</strong>
          </div>
        </div>
        <p>${escapeHtml(result.explanation)}</p>
        <h3>Possible reasons</h3>
        <ul>${result.possibilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <h3>Lifestyle and follow-up</h3>
        <ul>${result.suggestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    `)
    .join("");
}

function renderCharts() {
  if (!state.results.length) {
    elements.chartsGrid.innerHTML = emptyState("Range charts will appear after analysis.");
    return;
  }

  elements.chartsGrid.innerHTML = state.results.map(renderChart).join("");
}

function renderChart(result) {
  const domain = chartDomain(result);
  const valuePct = percent(result.value, domain.min, domain.max);
  const normalLeft = percent(result.range.min ?? domain.min, domain.min, domain.max);
  const normalRight = percent(result.range.max ?? domain.max, domain.min, domain.max);
  const bandWidth = Math.max(2, normalRight - normalLeft);

  return `
    <article class="chart-card status-${escapeHtml(result.intensity)}">
      <div class="chart-head">
        <div>
          <h3>${escapeHtml(result.name)}</h3>
          <p>${escapeHtml(formatValue(result))}</p>
        </div>
        <span class="badge ${escapeHtml(result.intensity)}">${escapeHtml(result.statusLabel)}</span>
      </div>
      <div class="range-plot" aria-label="${escapeHtml(result.name)} range chart">
        <div class="range-line"></div>
        <div class="normal-band" style="left:${normalLeft}%;width:${bandWidth}%;"></div>
        <div class="marker" title="Your value" style="left:${valuePct}%;"></div>
        <div class="axis">
          <span>${escapeHtml(formatNumber(domain.min, result.definition.decimals))}</span>
          <span>Normal ${escapeHtml(formatRange(result))}</span>
          <span>${escapeHtml(formatNumber(domain.max, result.definition.decimals))}</span>
        </div>
      </div>
    </article>
  `;
}

function chartDomain(result) {
  const values = [result.value];
  if (result.range.min != null) values.push(result.range.min);
  if (result.range.max != null) values.push(result.range.max);

  let min = Math.min(...values);
  let max = Math.max(...values);

  if (result.range.min == null && result.range.max != null) min = 0;
  if (result.range.min != null && result.range.max == null) max = Math.max(result.value, result.range.min * 1.5);
  if (min === max) {
    min = Math.max(0, min - 1);
    max += 1;
  }

  const pad = (max - min) * 0.18 || 1;
  return {
    min: Math.max(0, min - pad),
    max: max + pad
  };
}

function percent(value, min, max) {
  const raw = ((value - min) / (max - min)) * 100;
  return Math.min(98, Math.max(2, raw));
}

function emptyState(text) {
  return `<div class="empty-state">${escapeHtml(text)}</div>`;
}

async function handleFile(file) {
  if (!file) return;

  state.sourceName = file.name;
  setStatus(`Reading ${file.name}`);
  elements.imagePreviewWrap.classList.add("is-hidden");

  try {
    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      const text = await extractPdfText(file);
      elements.manualText.value = text;
      analyzeCurrentText(file.name);
      return;
    }

    if (file.type.startsWith("image/")) {
      previewImage(file);
      const text = await extractImageText(file);
      elements.manualText.value = text;
      analyzeCurrentText(file.name);
      return;
    }

    setStatus("Unsupported file");
  } catch (error) {
    console.error(error);
    setStatus("Extraction needs text");
    elements.manualText.placeholder = "Automatic extraction was unavailable. Paste the report text here and click Analyze report.";
  }
}

function previewImage(file) {
  const url = URL.createObjectURL(file);
  elements.imagePreview.src = url;
  elements.imageCaption.textContent = file.name;
  elements.imagePreviewWrap.classList.remove("is-hidden");
}

function loadScript(src, globalName) {
  if (window[globalName]) return Promise.resolve();
  const existing = document.querySelector(`script[data-src="${src}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.src = src;
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });
}

async function extractPdfText(file) {
  setStatus("Loading PDF reader");
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", "pdfjsLib");
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  setStatus("Extracting PDF text");
  const data = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data }).promise;
  const chunks = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    chunks.push(content.items.map((item) => item.str).join(" "));
  }

  return normalizeText(chunks.join("\n"));
}

async function extractImageText(file) {
  setStatus("Loading OCR");
  await loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js", "Tesseract");

  setStatus("Running OCR");
  const result = await window.Tesseract.recognize(file, "eng", {
    logger: (progress) => {
      if (progress.status === "recognizing text" && progress.progress) {
        setStatus(`OCR ${Math.round(progress.progress * 100)}%`);
      }
    }
  });

  return normalizeText(result.data.text);
}

function downloadSummaryPdf() {
  const lines = buildPdfLines();
  const pdf = createPdf(lines);
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `medical-report-summary-${date}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildPdfLines() {
  const date = new Date().toLocaleString();
  const lines = [
    "Medical Report Analyzer Summary",
    `Generated: ${date}`,
    `Source: ${state.sourceName}`,
    "",
    "This educational summary does not diagnose, prescribe, or replace a clinician.",
    "Reference ranges vary by lab, age, sex, pregnancy status, and medical history.",
    ""
  ];

  if (!state.results.length) {
    lines.push("No recognized blood values were detected.");
    return lines;
  }

  lines.push("Overall Summary");
  const abnormal = abnormalResults();
  if (abnormal.length) {
    abnormal.forEach((result) => lines.push(`- ${result.statusLabel} ${result.name}: ${formatValue(result)}; normal ${formatRange(result)}`));
  } else {
    lines.push("- All detected values are within the available comparison ranges.");
  }

  if (criticalResults().length) {
    lines.push("- Some values are far outside broad comparison ranges. Prompt clinical review is recommended.");
  } else {
    lines.push("- No critical emergency values were flagged by this educational tool.");
  }

  lines.push("", "Detected Values");
  state.results.forEach((result) => {
    lines.push(`${result.name}: ${formatValue(result)} | Normal: ${formatRange(result)} | Status: ${result.statusLabel}`);
  });

  lines.push("", "Plain-Language Notes");
  state.results.forEach((result) => {
    lines.push("");
    lines.push(`${result.name}`);
    lines.push(`Result: ${formatValue(result)}`);
    lines.push(`Normal: ${formatRange(result)}`);
    lines.push(`Explanation: ${result.explanation}`);
    lines.push(`Possible reasons: ${result.possibilities.join(", ")}`);
    lines.push(`Lifestyle and follow-up: ${result.suggestions.join(" ")}`);
  });

  return lines;
}

function toPdfSafe(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wrapText(line, maxLength = 86) {
  const safe = toPdfSafe(line);
  if (!safe) return [""];
  const words = safe.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function createPdf(lines) {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 54;
  const lineHeight = 15;
  const top = pageHeight - margin;
  const bottom = margin;
  const maxLines = Math.floor((top - bottom) / lineHeight);
  const wrapped = lines.flatMap((line) => wrapText(line));
  const pages = [];

  for (let i = 0; i < wrapped.length; i += maxLines) {
    pages.push(wrapped.slice(i, i + maxLines));
  }

  if (!pages.length) pages.push(["Medical Report Analyzer Summary"]);

  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  const pageIds = [];
  pages.forEach((pageLines, index) => {
    const pageId = 4 + index * 2;
    const contentId = pageId + 1;
    pageIds.push(pageId);

    let stream = "BT\n/F1 11 Tf\n";
    pageLines.forEach((line, lineIndex) => {
      const y = top - lineIndex * lineHeight;
      const escaped = line.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
      stream += `1 0 0 1 ${margin} ${y} Tm (${escaped}) Tj\n`;
    });
    stream += "ET";

    objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentId} 0 R >>`;
  });

  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let body = "%PDF-1.4\n";
  const offsets = [0];
  for (let id = 1; id < objects.length; id += 1) {
    if (!objects[id]) continue;
    offsets[id] = body.length;
    body += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xref = body.length;
  body += `xref\n0 ${objects.length}\n`;
  body += "0000000000 65535 f \n";
  for (let id = 1; id < objects.length; id += 1) {
    const offset = offsets[id] || 0;
    body += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  body += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return body;
}

function resetApp() {
  state.results = [];
  state.sourceName = "Manual text";
  elements.manualText.value = "";
  elements.imagePreviewWrap.classList.add("is-hidden");
  elements.fileInput.value = "";
  setStatus("Ready");
  renderAll();
}

elements.browseBtn.addEventListener("click", () => elements.fileInput.click());
elements.fileInput.addEventListener("change", (event) => handleFile(event.target.files[0]));
elements.analyzeBtn.addEventListener("click", () => analyzeCurrentText());
elements.clearTextBtn.addEventListener("click", () => {
  elements.manualText.value = "";
  elements.manualText.focus();
});
elements.sampleBtn.addEventListener("click", () => {
  elements.manualText.value = sampleReport;
  state.sourceName = "Sample report";
  analyzeCurrentText("Sample report");
});
elements.resetBtn.addEventListener("click", resetApp);
elements.downloadPdfBtn.addEventListener("click", downloadSummaryPdf);

elements.dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  elements.dropZone.classList.add("is-dragging");
});

elements.dropZone.addEventListener("dragleave", () => {
  elements.dropZone.classList.remove("is-dragging");
});

elements.dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  elements.dropZone.classList.remove("is-dragging");
  handleFile(event.dataTransfer.files[0]);
});

elements.dropZone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    elements.fileInput.click();
  }
});

renderAll();
