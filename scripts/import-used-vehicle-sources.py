"""Import supplied used-car records without modifying the workbook or photos."""
from __future__ import annotations

import argparse
from datetime import datetime
import hashlib
import json
from pathlib import Path
import re
import shutil
import xml.etree.ElementTree as ET
import zipfile

import openpyxl
from openpyxl.utils.datetime import from_excel

ROOT = Path(__file__).resolve().parents[1]
REFERENCE = ROOT.parent / "参考资料"
BOOK = REFERENCE / "独立站二手车基本参数.xlsx"
PICTURES = REFERENCE / "独立站二手车图片"
CONFIG = ROOT / "src/data/used-car-import-map.json"
POWERTRAINS = {"Petrol": "Gasoline", "EV": "Pure Electric", "PHEV": "PHEV", "EREV": "EREV", "HEV": "Hybrid"}


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def natural(path: Path):
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path.name)]


def month(value, epoch) -> str:
    date = from_excel(value, epoch) if isinstance(value, (int, float)) else value
    if not isinstance(date, datetime):
        raise ValueError(f"Unsupported registration date: {value!r}")
    return date.strftime("%Y-%m")


def document_identity(folder: Path):
    documents = list(folder.glob("*.docx"))
    if len(documents) != 1:
        raise ValueError(f"Expected one matching vehicle document in {folder}")
    with zipfile.ZipFile(documents[0]) as archive:
        xml = ET.fromstring(archive.read("word/document.xml"))
    text = "".join(node.text or "" for node in xml.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t"))
    mileage = re.search(r"【行驶里程】\s*(\d+)", text)
    registration = re.search(r"【上牌时间】\s*(\d{4})年\s*(\d{1,2})月", text)
    if not mileage or not registration:
        raise ValueError(f"Missing identity checks in {documents[0]}")
    # Do not copy prices, VINs, seller data or signed report URLs into public data.
    return documents[0], int(mileage[1]), f"{int(registration[1]):04d}-{int(registration[2]):02d}"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    if digest(BOOK) != config["reviewedWorkbookSha256"]:
        raise ValueError("The workbook changed after photo matching was reviewed. Review the row-to-vehicle mapping before importing again.")
    workbook = openpyxl.load_workbook(BOOK, read_only=True, data_only=True)
    sheet = workbook.worksheets[0]
    rows = {number: values for number, values in enumerate(sheet.iter_rows(values_only=True), 1) if number > 2 and values[2]}
    if set(rows) != {entry["row"] for entry in config["records"]}:
        raise ValueError("The workbook rows and reviewed photo map differ. Review before importing.")
    records, manifest, issues, used_folders = [], [], [], set()
    for entry in config["records"]:
        row = entry["row"]
        values = rows[row]
        _, brand_raw, model_raw, trim_raw, year_raw, power_raw, range_or_engine, body_raw, mileage_raw, date_raw = values
        folder = PICTURES / entry["folder"]
        if not folder.is_dir() or folder in used_folders:
            raise ValueError(f"Missing or reused photo folder: {folder}")
        used_folders.add(folder)
        files = sorted([p for p in folder.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}], key=natural)
        if not files or entry["lead"] >= len(files):
            raise ValueError(f"Invalid lead photograph for row {row}")
        registration, mileage = month(date_raw, workbook.epoch), int(mileage_raw)
        if mileage < 0 or mileage != mileage_raw:
            raise ValueError(f"Invalid mileage at I{row}")
        document = None
        if entry.get("checkDocument"):
            document, doc_mileage, doc_registration = document_identity(folder)
            if (doc_mileage, doc_registration) != (mileage, registration):
                raise ValueError(f"The document and workbook identify different cars at row {row}")
        title_year = re.search(r"\b(20\d{2})", str(trim_raw))
        title_year = title_year[1] if title_year else None
        year = str(year_raw)
        row_issues = []
        if not re.fullmatch(r"20\d{2}", year) or title_year and year != title_year:
            row_issues.append({"field": "year", "cell": f"E{row}", "value": year_raw, "titleValue": title_year})
            year = title_year if config["resolveConflictsFromTitle"] and title_year else "To confirm"
        power = POWERTRAINS.get(power_raw)
        if not power:
            raise ValueError(f"Unknown powertrain at F{row}")
        if entry.get("titlePowertrain") and entry["titlePowertrain"] != power:
            row_issues.append({"field": "powertrain", "cell": f"F{row}", "value": power_raw, "titleValue": entry["titlePowertrain"]})
            power = entry["titlePowertrain"] if config["resolveConflictsFromTitle"] else "To confirm"
        category = {"sedan": "Sedan", "suv": "SUV", "mpv": "MPV", "pickup": "Pickup"}.get(str(body_raw).strip().lower(), "")
        if entry.get("category") and category != entry["category"]:
            row_issues.append({"field": "category", "cell": f"H{row}", "value": body_raw, "reviewedValue": entry["category"], "basis": "Reviewed supplied exterior photographs"})
            category = entry["category"]
        if category not in {"Sedan", "SUV", "MPV", "Pickup"}:
            raise ValueError(f"Invalid category at row {row}")
        name = entry["model"] if entry["model"].startswith(entry["brand"]) else f"{entry['brand']} {entry['model']}"
        record_id = f"UC-20261026-{row:03d}"
        source = f"Supplied used-car workbook / {sheet.title} / row {row}"
        trim = entry["trim"] if year != "To confirm" and power != "To confirm" else re.sub(r"^20\d{2}\s+", "", entry["trim"])
        gallery, photo_sources = [], []
        order = [entry["lead"], *[i for i in range(len(files)) if i != entry["lead"]]]
        for position, index in enumerate(order, 1):
            photo = files[index]
            relative = Path("images/used-catalog") / entry["brandSlug"] / entry["slug"] / f"{position:02d}{photo.suffix.lower()}"
            url, target = "/" + relative.as_posix(), ROOT / "public" / relative
            sha = digest(photo)
            if args.apply:
                target.parent.mkdir(parents=True, exist_ok=True)
                if not target.exists() or digest(target) != sha:
                    shutil.copy2(photo, target)
            gallery.append({"src": url, "alt": f"{name} supplied vehicle photograph {position}", "treatment": "original", "evidenceType": "model-reference", "note": "Original photograph supplied for this vehicle record. Request current photographs and condition records before purchase."})
            photo_sources.append({"src": url, "sourceFile": str(photo.relative_to(ROOT.parent)).replace("\\", "/"), "sha256": sha})
        specs = [
            {"field": "modelYear", "label": "Model year", "value": year, "source": source, "cell": f"E{row}"},
            {"field": "registrationMonth", "label": "First registration (as supplied)", "value": registration, "source": source, "cell": f"J{row}"},
            {"field": "mileage", "label": "Recorded mileage", "value": str(mileage), "unit": "km", "source": source, "cell": f"I{row}"},
            {"field": "powertrain", "label": "Powertrain", "value": power, "source": source, "cell": f"F{row}"},
        ]
        engine = str(range_or_engine).strip() if re.fullmatch(r"\d+(?:\.\d+)?[LT]", str(range_or_engine).strip(), re.I) else None
        if engine:
            specs.append({"field": "engine", "label": "Engine designation", "value": engine, "source": source, "cell": f"G{row}"})
        elif re.fullmatch(r"\d+(?:\.\d+)?\s*km", str(range_or_engine).strip(), re.I):
            specs.append({"field": "sourceRange", "label": "Range entry in supplied sheet", "value": re.sub(r"\s*km$", "", str(range_or_engine).strip(), flags=re.I), "unit": "km", "source": source, "cell": f"G{row}", "note": "Test cycle and electric-only versus combined range are not specified in the sheet. Not a verified driving-range specification."})
        seats = entry.get("seats")
        if not seats:
            seats_match = re.search(r"([56789])座", str(trim_raw))
            seats = int(seats_match[1]) if seats_match else None
        records.append({
            "kind": "used", "brand": entry["brand"], "brandSlug": entry["brandSlug"], "slug": entry["slug"],
            "name": name, "modelName": entry["model"], "year": year, "body": category, "category": category,
            "powertrain": power, "seats": seats, "image": gallery[0]["src"], "imagePosition": "50% 60%",
            "source": gallery[0]["src"], "sourceLabel": "User-supplied used-car record",
            "sourceNote": "Supplied vehicle details and original photographs. Current availability, mileage and condition require confirmation for the individual car.",
            "sourceImportedAt": config["importedAt"], "verifiedAt": None, "availability": "Unverified", "referenceOnly": True,
            "defaultVariantName": trim, "gallery": gallery, "specs": specs,
            **({"presentationImage": entry["presentationImage"]} if entry.get("presentationImage") else {}),
            "usedRecord": {"reference": record_id, "trim": trim, "registrationMonth": registration, "mileageKm": mileage,
                "productionMonth": entry.get("productionMonth"), "conditionNote": entry.get("condition"), "keys": entry.get("keys"),
                "needsReview": any(issue["field"] in {"year", "powertrain"} for issue in row_issues) and not config["resolveConflictsFromTitle"], "sourceRow": row},
        })
        manifest.append({"reference": record_id, "row": row, "key": entry["brandSlug"] + "/" + entry["slug"],
            "rawSource": dict(zip(["group", "brand", "model", "trim", "year", "powertrain", "engineOrRange", "category", "mileageKm", "registrationSerial"], values)),
            "document": str(document.relative_to(ROOT.parent)).replace("\\", "/") if document else None,
            "photos": photo_sources, "issues": row_issues})
        issues.extend({"row": row, **issue, "resolvedFromTitle": config["resolveConflictsFromTitle"] and issue["field"] in {"year", "powertrain"}} for issue in row_issues)
    workbook.close()
    all_folders = {p.parent for p in PICTURES.rglob("*") if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}}
    summary = {"records": len(records), "brands": len({r["brandSlug"] for r in records}), "photos": sum(len(r["gallery"]) for r in records),
        "categories": {category: sum(r["category"] == category for r in records) for category in ["Sedan", "SUV", "MPV", "Pickup"]},
        "reviewRows": sorted({issue["row"] for issue in issues}), "unmatchedPhotoFolders": [str(p.relative_to(PICTURES)).replace("\\", "/") for p in sorted(all_folders - used_folders)]}
    if args.apply:
        (ROOT / "src/data/used-vehicle-data.json").write_text(json.dumps({"importedAt": config["importedAt"], "records": records, "summary": summary}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        audit = ROOT / "docs/used-cars-import-20261026"
        audit.mkdir(parents=True, exist_ok=True)
        (audit / "source-manifest.json").write_text(json.dumps({"workbook": str(BOOK.relative_to(ROOT.parent)).replace("\\", "/"), "workbookSha256": digest(BOOK), "importedAt": config["importedAt"], "correctionApproval": config.get("correctionApproval"), "records": manifest, "issues": issues, "summary": summary}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == "__main__":
    main()
