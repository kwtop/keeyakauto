"""Read the user-supplied workbook and preserve local reference photos.

This importer writes the prepared JSON and image copies only. It never modifies
the reference workbook or source pictures. No stock or offer is manufactured.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
from pathlib import Path

import openpyxl

WORKSPACE = Path(__file__).resolve().parents[1]
REFERENCE = WORKSPACE.parent / "参考资料"
BOOK = REFERENCE / "参数" / "独立站新车基本参数.xlsx"
PICTURES = REFERENCE / "独立站新车图片素材"

BRANDS = {
    "丰田": ("Toyota", "toyota"), "大众": ("Volkswagen", "volkswagen"),
    "五菱": ("Wuling", "wuling"), "名爵": ("MG", "mg"),
    "埃安": ("AION", "aion"), "比亚迪": ("BYD", "byd"),
    "睿蓝": ("Livan", "livan"), "长安": ("Changan", "changan"),
    "长安启源": ("Changan Qiyuan", "changan-qiyuan"),
    "广汽传祺": ("GAC Trumpchi", "gac-trumpchi"), "吉利": ("Geely", "geely"),
    "捷途": ("Jetour", "jetour"), "方程豹": ("Fangchengbao", "fangchengbao"),
    "深蓝": ("Deepal", "deepal"),
}
MODELS = {
    "卡罗拉": ("Corolla", "corolla"), "凯美瑞": ("Camry", "camry"),
    "ID.3": ("ID.3", "id-3"), "星光": ("Xingguang", "xingguang"),
    "缤果": ("Bingo", "bingo"), "MG4": ("MG4", "mg4"),
    "MG5": ("MG5", "mg5"), "MG7": ("MG7", "mg7"), "UT": ("UT", "ut"),
    "海豹05": ("Seal 05 DM-i", "seal-05-dm-i"),
    "海豹06": ("Seal 06 DM-i", "seal-06-dm-i"),
    "海豹07": ("Seal 07 DM-i", "seal-07-dm-i"), "海鸥": ("Seagull", "seagull"),
    "驱逐舰05": ("Destroyer 05", "destroyer-05"), "汉L": ("Han L", "han-l"),
    "秦L": ("Qin L DM-i", "qin-l-dm-i"), "秦PLUS": ("Qin PLUS", "qin-plus"),
    "蓝气球": ("Lanqiqiu", "lanqiqiu"), "UNI-V": ("UNI-V", "uni-v"),
    "A06": ("A06", "a06"), "RAV4荣放": ("RAV4", "rav4"),
    "卡罗拉锐放": ("Corolla Cross", "corolla-cross"), "BZ3X": ("bZ3X", "bz3x"),
    "探岳": ("Tayron", "tayron"), "探歌": ("T-Roc", "t-roc"),
    "途岳": ("Tharu", "tharu"), "途昂": ("Teramont", "teramont"),
    "GS3": ("GS3", "gs3"), "博越": ("Boyue", "boyue"),
    "星越L": ("Xingyue L", "xingyue-l"), "缤越": ("Binyue", "binyue"),
    "X70L": ("X70L", "x70l"), "X70 PLUS": ("X70 PLUS", "x70-plus"),
    "X90 PLUS": ("X90 PLUS", "x90-plus"), "大圣": ("Dashing", "dashing"),
    "旅行者": ("Traveler", "traveler"), "自由者": ("Ziyouzhe", "ziyouzhe"),
    "豹5": ("Bao 5", "bao-5"), "豹8": ("Bao 8", "bao-8"),
    "钛3": ("Tai 3", "tai-3"), "钛7": ("Tai 7", "tai-7"),
    "海狮05DM-i": ("Sea Lion 05 DM-i", "sea-lion-05-dm-i"),
    "海狮06DM-i": ("Sea Lion 06 DM-i", "sea-lion-06-dm-i"),
    "海狮07DM-i": ("Sea Lion 07 DM-i", "sea-lion-07-dm-i"),
    "元PLUS": ("Yuan PLUS", "yuan-plus"), "元UP": ("Yuan UP", "yuan-up"),
    "唐DM-i": ("Tang DM-i", "tang-dm-i"), "唐L": ("Tang L", "tang-l"),
    "宋L": ("Song L", "song-l"), "宋Pro": ("Song Pro DM-i", "song-pro-dm-i"),
    "G318": ("G318", "g318"), "S05": ("S05", "s05"), "S07": ("S07", "s07"),
    "X3 PRO": ("X3 PRO", "x3-pro"), "睿蓝7": ("7", "7"), "睿蓝9": ("9", "9"),
    "X5 PLUS": ("X5 PLUS", "x5-plus"), "UNI-K": ("UNI-K", "uni-k"),
    "UNI-Z": ("UNI-Z", "uni-z"), "CS55PLUS": ("CS55 PLUS", "cs55-plus"),
    "CS75PLUS": ("CS75 PLUS", "cs75-plus"), "CS75": ("CS75", "cs75"),
    "Q05": ("Q05", "q05"), "Q07": ("Q07", "q07"),
}
POWERTRAINS = {"Petrol": "Gasoline", "EV": "Pure Electric", "HEV": "Hybrid", "PHEV": "PHEV", "EREV": "EREV"}

# These overrides suppress uncertain source fields; they never supply a guessed replacement.
ISSUES = {
    4: {"fields": ["engine"], "message": "Camry trim says 2.5HG, while the displacement cell says 2.0L. Displacement withheld."},
    10: {"fields": ["powertrain", "range", "trim"], "message": "MG7 row specifies EV / 610 km. Exact powertrain and trim must be checked against the supplied model images and original specification."},
    17: {"fields": ["powertrain", "range", "trim"], "message": "Han L trim says DM-p while the powertrain cell says EV. Conflicting fields withheld."},
    18: {"fields": ["range"], "message": "Qin L trim says 120KM while the range cell says 128km. Range withheld."},
    26: {"fields": ["engine"], "message": "Tayron trim says 380TSI, while the source displacement cell says 1.5L. Engine specification requires exact-version verification."},
    46: {"fields": ["image"], "message": "Sea Lion 07 DM-i is categorized as SUV, but all six supplied folder photographs show a three-box sedan. Record withheld from the public catalogue pending correct model imagery."},
}

# Contact-sheet review selects a complete-car exterior photo, keeping original pixels.
# Values refer to the deterministic filename order in each source model folder.
LEAD_IMAGES: dict[int, int] = {
    3: 3, 4: 1, 5: 0, 6: 4, 7: 1, 8: 3, 9: 2, 10: 0, 11: 2, 12: 2,
    13: 1, 14: 1, 15: 0, 16: 0, 17: 3, 18: 1, 19: 0, 20: 2, 21: 0,
    22: 3, 23: 2, 24: 0, 25: 0, 26: 3, 27: 2, 28: 3, 29: 2, 30: 0,
    31: 0, 32: 0, 33: 3, 34: 2, 35: 2, 36: 2, 37: 2, 38: 2, 39: 2,
    40: 2, 41: 3, 42: 1, 43: 0, 44: 0, 45: 0, 46: 0, 47: 2, 48: 0,
    49: 1, 50: 2, 51: 3, 52: 1, 53: 3, 54: 3, 55: 2, 56: 1, 57: 0,
    58: 1, 59: 1, 60: 3, 61: 1, 62: 1, 63: 1, 64: 4, 65: 3, 66: 1,
}

def normalize(value: str) -> str:
    return re.sub(r"[\s.\-_]", "", value).lower().replace("上汽大众", "大众")

def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--audit-sheet", type=Path, help="Optional contact sheets for internal photo selection")
    args = parser.parse_args()
    workbook = openpyxl.load_workbook(BOOK, data_only=True, read_only=True)
    sheet = workbook.worksheets[0]
    folders = [folder for folder in PICTURES.glob("*/*/*") if folder.is_dir()]
    records = []
    category = None
    for row_number, cells in enumerate(sheet.iter_rows(values_only=True), 1):
        if row_number < 3:
            continue
        group, source_brand, source_model, trim, year, raw_powertrain, raw_value, body = cells[:8]
        category = group or category
        if not source_model:
            continue
        brand, brand_slug = BRANDS[source_brand]
        model_name, slug = MODELS[source_model]
        name = model_name if model_name.startswith(brand) else f"{brand} {model_name}"
        matches = [folder for folder in folders
                   if normalize(folder.parent.name) == normalize(source_brand)
                   and normalize(folder.name) == normalize(source_model)]
        if len(matches) != 1:
            raise ValueError(f"Row {row_number}: expected one image folder, found {matches}")
        folder = matches[0]
        files = sorted([file for file in folder.iterdir() if file.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}])
        if not files:
            raise ValueError(f"Row {row_number}: no source photos")
        gallery = []
        for photo_index, file in enumerate(files, 1):
            image_rel = Path("images/catalog") / brand_slug / slug / f"{photo_index:02}{file.suffix.lower()}"
            target = WORKSPACE / "public" / image_rel
            target.parent.mkdir(parents=True, exist_ok=True)
            if not target.exists() or sha256(target) != sha256(file):
                shutil.copy2(file, target)
            gallery.append({
                "src": "/" + image_rel.as_posix(), "alt": f"{name} supplied model reference photograph {photo_index}",
                "sourceFile": str(file.relative_to(WORKSPACE.parent)).replace("\\", "/"),
                "sha256": sha256(file), "treatment": "original", "evidenceType": "model-reference",
                "note": "User-supplied model reference photograph. Exact trim, model year and rights require confirmation. Not a stock-unit photograph.",
            })
        issue = ISSUES.get(row_number)
        withheld = issue["fields"] if issue else []
        powertrain = "To confirm" if "powertrain" in withheld else POWERTRAINS[raw_powertrain]
        spec_source = f"独立站新车基本参数.xlsx / {sheet.title} / row {row_number}"
        specs = [
            {"label": "Model year", "value": str(year), "source": spec_source, "cell": f"E{row_number}"},
            {"label": "Source body category", "value": body, "source": spec_source, "cell": f"H{row_number}"},
        ]
        if "powertrain" not in withheld:
            specs.append({"label": "Powertrain", "value": powertrain, "source": spec_source, "cell": f"F{row_number}"})
        raw_value = str(raw_value or "").strip()
        if raw_value and raw_value.lower().endswith(("l", "t")) and "engine" not in withheld:
            specs.append({"label": "Engine designation", "value": raw_value, "source": spec_source, "cell": f"G{row_number}", "note": "Source designation; exact engine and displacement require version confirmation."})
        # All supplied km figures lack a test cycle. Preserve them internally,
        # but never promote them to a comparable public range specification.
        source_range = raw_value if "km" in raw_value.lower() else None
        seats_match = re.search(r"([56789])座", str(trim))
        seats = int(seats_match.group(1)) if seats_match else None
        if seats is None:
            chinese_seats = re.search(r"([五六七八九])座", str(trim))
            if chinese_seats:
                seats = {"五": 5, "六": 6, "七": 7, "八": 8, "九": 9}[chinese_seats.group(1)]
        if seats:
            specs.append({"label": "Seats", "value": str(seats), "source": spec_source, "cell": f"D{row_number}"})
        variant = {
            "id": f"{year}-{hashlib.sha256(str(trim).encode('utf-8')).hexdigest()[:10]}",
            "name": "Exact trim to confirm" if "trim" in withheld else str(trim),
            "year": str(year), "powertrain": powertrain, "specs": specs,
            "source": spec_source, "marketVersion": "China-market reference; export configuration to confirm",
            "steering": "To confirm", "seats": seats,
            "note": "Images are matched to the model family; exact version matching is not yet verified.",
        }
        record = {
            "publishable": "image" not in withheld,
            "kind": "new", "brand": brand, "brandSlug": brand_slug, "slug": slug,
            "name": name, "modelName": model_name, "sourceModelName": source_model,
            "year": str(year), "body": body, "powertrain": powertrain, "seats": seats,
            "image": gallery[LEAD_IMAGES.get(row_number, 0)]["src"], "gallery": gallery,
            "source": "user-supplied-reference-workbook", "sourceLabel": "User-supplied vehicle reference materials",
            "sourceNote": "Model-family reference. Exact trim, supply, quantity, destination compatibility and quotation are confirmed per inquiry.",
            "sourceImportedAt": "2026-10-12", "verifiedAt": None,
            "supplyMethod": "Confirm on request", "availability": "Unverified", "referenceOnly": True,
            "specs": specs, "variants": [variant],
            "publicCaution": "Exact powertrain and trim require confirmation." if issue and "powertrain" in withheld else None,
            "rawSource": {
                "workbook": str(BOOK.relative_to(WORKSPACE.parent)).replace("\\", "/"),
                "worksheet": sheet.title, "row": row_number, "category": category,
                "brand": source_brand, "model": source_model, "trim": trim,
                "year": year, "powertrain": raw_powertrain, "value": raw_value, "body": body,
                "rangeWithoutTestCycle": source_range,
            },
            "internalIssues": ([issue["message"]] if issue else []) +
                (["Range figure has no stated test cycle and has been omitted from public specifications."] if source_range else []),
        }
        records.append(record)
    workbook.close()
    output = {
        "sourceWorkbook": str(BOOK.relative_to(WORKSPACE.parent)).replace("\\", "/"),
        "sourceWorkbookSha256": sha256(BOOK), "importedAt": "2026-10-12",
        "records": records,
        "summary": {
            "models": len(records), "brands": len({record["brandSlug"] for record in records}),
            "variants": sum(len(record["variants"]) for record in records),
            "images": sum(len(record["gallery"]) for record in records),
            "publishedModels": sum(record["publishable"] for record in records),
            "publishedImages": sum(len(record["gallery"]) for record in records if record["publishable"]),
            "pendingRows": [record["rawSource"]["row"] for record in records if not record["publishable"]],
            "sourceConflictRows": sorted(ISSUES), "emptyCategories": ["MPV", "Pickup"],
            "usedWorkbookHasRecords": False,
        },
    }
    (WORKSPACE / "src/data/vehicle-source-data.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if args.audit_sheet:
        from PIL import Image, ImageDraw, ImageOps
        args.audit_sheet.mkdir(parents=True, exist_ok=True)
        for batch_no, offset in enumerate(range(0, len(records), 16), 1):
            group_records = records[offset:offset + 16]
            canvas = Image.new("RGB", (1200, len(group_records) * 166), "white")
            draw = ImageDraw.Draw(canvas)
            for index, record in enumerate(group_records):
                y = index * 166
                draw.text((4, y + 2), f"Row {record['rawSource']['row']} | {record['name']}", fill="black")
                for photo_index, photo in enumerate(record["gallery"]):
                    im = Image.open(WORKSPACE / "public" / photo["src"].lstrip("/"))
                    thumb = ImageOps.contain(im, (194, 138))
                    canvas.paste(thumb, (photo_index * 200, y + 22))
                    draw.text((photo_index * 200 + 4, y + 146), str(photo_index), fill="black")
            canvas.save(args.audit_sheet / f"source-contact-{batch_no}.jpg", quality=88)
    print(json.dumps(output["summary"], ensure_ascii=False))

if __name__ == "__main__":
    main()
