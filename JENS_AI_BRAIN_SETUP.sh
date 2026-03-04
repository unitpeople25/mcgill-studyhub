#!/bin/bash

# ============================================================
#  🧠💡 JENS' ALL-IN-ONE SETUP SCRIPT
#  Multi-Milliarden-Dollar KI + Hirnforschung EMPIRE
#  Version 1.0 | Powered by Claude (Anthropic)
# ============================================================

set -e  # Stop on first error

# ─────────────────────────────────────────────
# 🎨 FARBEN & SYMBOLE
# ─────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

print_header() {
    echo -e "\n${MAGENTA}${BOLD}╔══════════════════════════════════════════════╗"
    echo -e "║  🧠  $1"
    echo -e "╚══════════════════════════════════════════════╝${NC}\n"
}

print_step() {
    echo -e "${CYAN}  ➤  $1${NC}"
}

print_ok() {
    echo -e "${GREEN}  ✅  $1${NC}"
}

print_warn() {
    echo -e "${YELLOW}  ⚠️   $1${NC}"
}

print_error() {
    echo -e "${RED}  ❌  $1${NC}"
}

# ─────────────────────────────────────────────
# 🚀 WILLKOMMEN
# ─────────────────────────────────────────────
clear
echo -e "${BOLD}${MAGENTA}"
cat << 'EOF'
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🧠💰  JENS' MULTI-MILLIARDEN KI+HIRNFORSCHUNG      ║
  ║         ALL-IN-ONE SETUP SCRIPT                       ║
  ║                                                       ║
  ║   Installiert & konfiguriert ALLES was du brauchst:   ║
  ║   • Python KI-Stack (TF, PyTorch, Scikit, etc.)       ║
  ║   • Neurowissenschaft & EEG/fMRI Tools                ║
  ║   • GitHub Copilot + GitLens + DVC                    ║
  ║   • GitHub Actions Workflows                          ║
  ║   • Projektstruktur für dein Unternehmen              ║
  ║   • VS Code Extensions & Einstellungen                ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${YELLOW}Drücke ENTER um zu starten... oder Ctrl+C zum Abbrechen${NC}"
read -r

# ─────────────────────────────────────────────
# 📦 SCHRITT 1: SYSTEM-UPDATES
# ─────────────────────────────────────────────
print_header "SCHRITT 1: SYSTEM-UPDATES & BASIS-PAKETE"

print_step "System aktualisieren..."
sudo apt-get update -qq && sudo apt-get upgrade -y -qq
print_ok "System aktualisiert!"

print_step "Basis-Pakete installieren..."
sudo apt-get install -y -qq \
    git curl wget unzip zip \
    build-essential cmake \
    python3 python3-pip python3-venv \
    libhdf5-dev libssl-dev \
    ffmpeg libsm6 libxext6 \
    graphviz
print_ok "Basis-Pakete installiert!"

# ─────────────────────────────────────────────
# 🐍 SCHRITT 2: PYTHON VIRTUAL ENVIRONMENT
# ─────────────────────────────────────────────
print_header "SCHRITT 2: PYTHON VIRTUAL ENVIRONMENT"

PROJECT_NAME="ki_hirnforschung"
VENV_DIR="$HOME/$PROJECT_NAME/venv"

print_step "Projektordner erstellen: $HOME/$PROJECT_NAME"
mkdir -p "$HOME/$PROJECT_NAME"
cd "$HOME/$PROJECT_NAME"

print_step "Virtual Environment erstellen..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip setuptools wheel -q
print_ok "Virtual Environment bereit: $VENV_DIR"

# ─────────────────────────────────────────────
# 🤖 SCHRITT 3: KI / DEEP LEARNING PAKETE
# ─────────────────────────────────────────────
print_header "SCHRITT 3: KI & DEEP LEARNING PAKETE"

print_step "TensorFlow installieren..."
pip install tensorflow -q
print_ok "TensorFlow ✓"

print_step "PyTorch installieren..."
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu -q
print_ok "PyTorch ✓"

print_step "Scikit-Learn & ML-Basics installieren..."
pip install scikit-learn xgboost lightgbm catboost -q
print_ok "ML-Basics ✓"

print_step "Datenanalyse-Pakete installieren..."
pip install numpy pandas scipy matplotlib seaborn plotly -q
print_ok "Datenanalyse ✓"

print_step "Jupyter & Notebooks installieren..."
pip install jupyterlab notebook ipywidgets ipykernel -q
print_ok "Jupyter ✓"

print_step "Hugging Face Transformers (NLP/Brain Signals) installieren..."
pip install transformers datasets tokenizers accelerate -q
print_ok "Hugging Face Transformers ✓"

print_step "OpenAI & Anthropic APIs installieren..."
pip install openai anthropic -q
print_ok "API Clients ✓"

print_step "Computer Vision (OpenCV) installieren..."
pip install opencv-python Pillow -q
print_ok "Computer Vision ✓"

print_step "MLflow für Experiment-Tracking installieren..."
pip install mlflow -q
print_ok "MLflow ✓"

# ─────────────────────────────────────────────
# 🧠 SCHRITT 4: NEUROWISSENSCHAFT / HIRNFORSCHUNG TOOLS
# ─────────────────────────────────────────────
print_header "SCHRITT 4: NEUROWISSENSCHAFT & HIRNFORSCHUNG TOOLS"

print_step "MNE-Python (EEG/MEG Analyse) installieren..."
pip install mne -q
print_ok "MNE-Python (EEG/MEG) ✓"

print_step "NiBabel (MRT/fMRI Daten) installieren..."
pip install nibabel nilearn -q
print_ok "NiBabel + NiLearn (fMRI) ✓"

print_step "PyEDFlib (EDF Biosignal-Dateien) installieren..."
pip install pyEDFlib -q
print_ok "PyEDFlib ✓"

print_step "Brian2 (Neuronale Netzwerk Simulation) installieren..."
pip install brian2 -q
print_ok "Brian2 ✓"

print_step "Neo (Elektrophysiologie) installieren..."
pip install neo -q
print_ok "Neo ✓"

print_step "Elephant (Neuro-Daten Analyse) installieren..."
pip install elephant -q
print_ok "Elephant ✓"

# ─────────────────────────────────────────────
# 📊 SCHRITT 5: DATEN-VERSIONIERUNG MIT DVC
# ─────────────────────────────────────────────
print_header "SCHRITT 5: DVC - DATA VERSION CONTROL"

print_step "DVC installieren (inkl. Cloud-Support)..."
pip install "dvc[s3,gs,azure,ssh]" -q
print_ok "DVC ✓"

print_step "DVC in Projekt initialisieren..."
cd "$HOME/$PROJECT_NAME"
git init -q 2>/dev/null || true
dvc init -q 2>/dev/null || true
print_ok "DVC initialisiert!"

# ─────────────────────────────────────────────
# 🔧 SCHRITT 6: ENTWICKLER-TOOLS
# ─────────────────────────────────────────────
print_header "SCHRITT 6: ENTWICKLER-TOOLS & CODE-QUALITÄT"

print_step "Code-Qualität & Formatierung installieren..."
pip install black flake8 pylint mypy isort pre-commit -q
print_ok "Code-Qualität Tools ✓"

print_step "Testing-Framework installieren..."
pip install pytest pytest-cov pytest-html -q
print_ok "pytest ✓"

print_step "Dokumentation (Sphinx) installieren..."
pip install sphinx sphinx-rtd-theme -q
print_ok "Sphinx ✓"

print_step "FastAPI (für KI-APIs/Backends) installieren..."
pip install fastapi uvicorn pydantic httpx -q
print_ok "FastAPI ✓"

print_step "Docker SDK installieren..."
pip install docker -q
print_ok "Docker SDK ✓"

# ─────────────────────────────────────────────
# 📁 SCHRITT 7: PROJEKTSTRUKTUR ERSTELLEN
# ─────────────────────────────────────────────
print_header "SCHRITT 7: PROFESSIONELLE PROJEKTSTRUKTUR"

cd "$HOME/$PROJECT_NAME"

print_step "Ordnerstruktur erstellen..."
mkdir -p \
    data/raw \
    data/processed \
    data/external \
    data/eeg_data \
    data/fmri_data \
    data/models \
    notebooks/exploration \
    notebooks/experiments \
    src/data_processing \
    src/models \
    src/visualization \
    src/api \
    src/brain_signals \
    tests/unit \
    tests/integration \
    docs \
    reports/figures \
    .github/workflows \
    configs \
    scripts

print_ok "Ordnerstruktur erstellt!"

# ─────────────────────────────────────────────
# 📄 SCHRITT 8: WICHTIGE KONFIGURATIONSDATEIEN
# ─────────────────────────────────────────────
print_header "SCHRITT 8: KONFIGURATIONSDATEIEN ERSTELLEN"

# requirements.txt
print_step "requirements.txt generieren..."
pip freeze > requirements.txt
print_ok "requirements.txt ✓"

# .gitignore
print_step ".gitignore erstellen..."
cat > .gitignore << 'GITIGNORE'
# Python
__pycache__/
*.py[cod]
*.egg
*.egg-info/
dist/
build/
venv/
.venv/
.env

# Jupyter
.ipynb_checkpoints/
*.ipynb

# Daten (über DVC verwaltet!)
data/raw/
data/processed/
*.nii
*.nii.gz
*.edf
*.set
*.fif

# Modelle (große Dateien)
*.h5
*.pkl
*.pt
*.pth
*.onnx

# MLflow
mlruns/
mlartifacts/

# IDE
.vscode/settings.json
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Secrets
*.env
secrets.json
api_keys.txt
GITIGNORE
print_ok ".gitignore ✓"

# pyproject.toml
print_step "pyproject.toml erstellen..."
cat > pyproject.toml << 'PYPROJECT'
[tool.black]
line-length = 88
target-version = ['py310']
include = '\.pyi?$'

[tool.isort]
profile = "black"
multi_line_output = 3

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "--cov=src --cov-report=html --cov-report=term"

[tool.mypy]
python_version = "3.10"
warn_return_any = true
warn_unused_configs = true
PYPROJECT
print_ok "pyproject.toml ✓"

# pre-commit config
print_step "pre-commit Konfiguration erstellen..."
cat > .pre-commit-config.yaml << 'PRECOMMIT'
repos:
  - repo: https://github.com/psf/black
    rev: 23.12.1
    hooks:
      - id: black
  - repo: https://github.com/pycqa/isort
    rev: 5.13.2
    hooks:
      - id: isort
  - repo: https://github.com/pycqa/flake8
    rev: 7.0.0
    hooks:
      - id: flake8
        args: ['--max-line-length=88', '--extend-ignore=E203']
PRECOMMIT
print_ok "pre-commit ✓"

# ─────────────────────────────────────────────
# ⚙️ SCHRITT 9: GITHUB ACTIONS WORKFLOWS
# ─────────────────────────────────────────────
print_header "SCHRITT 9: GITHUB ACTIONS WORKFLOWS"

# Haupt-CI/CD Workflow
print_step "CI/CD Workflow erstellen..."
cat > .github/workflows/ci_cd.yml << 'WORKFLOW'
name: 🧠 KI+Hirnforschung CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  # ─── Tests ───────────────────────────────
  test:
    name: 🧪 Tests ausführen
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: 🐍 Python einrichten
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
          cache: 'pip'

      - name: 📦 Dependencies installieren
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: 🎨 Code-Style prüfen (Black)
        run: black --check src/ tests/

      - name: 🧹 Imports prüfen (isort)
        run: isort --check-only src/ tests/

      - name: 🔍 Linting (flake8)
        run: flake8 src/ tests/ --max-line-length=88

      - name: ✅ Tests ausführen (pytest)
        run: pytest --cov=src --cov-report=xml

      - name: 📊 Coverage hochladen
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  # ─── Sicherheits-Scan ─────────────────────
  security:
    name: 🔒 Sicherheits-Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: 🛡️ Bandit Security Check
        run: |
          pip install bandit
          bandit -r src/ -ll

  # ─── Dokumentation bauen ──────────────────
  docs:
    name: 📚 Dokumentation
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: 🐍 Python einrichten
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
      - name: 📦 Sphinx installieren
        run: pip install sphinx sphinx-rtd-theme
      - name: 📖 Docs bauen
        run: |
          cd docs
          make html 2>/dev/null || echo "Docs-Build übersprungen (noch nicht konfiguriert)"
WORKFLOW
print_ok "CI/CD Workflow ✓"

# DVC Data Pipeline Workflow
print_step "DVC Data Pipeline Workflow erstellen..."
cat > .github/workflows/data_pipeline.yml << 'DVWORKFLOW'
name: 🗄️ Data Pipeline (DVC)

on:
  schedule:
    - cron: '0 2 * * 1'  # Jeden Montag um 2 Uhr
  workflow_dispatch:      # Manuell startbar

jobs:
  dvc-pipeline:
    name: 📊 DVC Datenpipeline
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: 🐍 Python einrichten
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'

      - name: 📦 DVC installieren
        run: pip install dvc

      - name: 🔄 DVC Pull (Daten holen)
        run: dvc pull
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: ▶️ DVC Pipeline ausführen
        run: dvc repro

      - name: 📤 DVC Push (Ergebnisse speichern)
        run: dvc push
DVWORKFLOW
print_ok "DVC Workflow ✓"

# ─────────────────────────────────────────────
# 🖥️ SCHRITT 10: VS CODE EINSTELLUNGEN
# ─────────────────────────────────────────────
print_header "SCHRITT 10: VS CODE EINSTELLUNGEN & EXTENSIONS"

mkdir -p .vscode

print_step "VS Code settings.json erstellen..."
cat > .vscode/settings.json << 'VSCODE'
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "ms-python.black-formatter",
    "python.formatting.provider": "black",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.pylintEnabled": false,
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "editor.rulers": [88],
    "files.trimTrailingWhitespace": true,
    "editor.tabSize": 4,
    "python.defaultInterpreterPath": "./venv/bin/python",
    "jupyter.notebookFileRoot": "${workspaceFolder}",
    "git.autofetch": true,
    "gitlens.currentLine.enabled": true,
    "gitlens.hovers.enabled": true,
    "editor.inlineSuggest.enabled": true,
    "github.copilot.enable": {
        "*": true,
        "python": true,
        "jupyter": true
    },
    "workbench.colorTheme": "Default Dark Modern",
    "terminal.integrated.defaultProfile.linux": "bash"
}
VSCODE
print_ok "VS Code settings.json ✓"

# Extensions-Liste
print_step "VS Code extensions.json erstellen..."
cat > .vscode/extensions.json << 'EXTENSIONS'
{
    "recommendations": [
        "ms-python.python",
        "ms-python.black-formatter",
        "ms-toolsai.jupyter",
        "github.copilot",
        "github.copilot-chat",
        "eamodio.gitlens",
        "mhutchie.git-graph",
        "iterative.dvc",
        "ms-azuretools.vscode-docker",
        "ms-vscode-remote.remote-ssh",
        "ms-vscode-remote.remote-containers",
        "redhat.vscode-yaml",
        "tamasfe.even-better-toml",
        "donjayamanne.python-environment-manager",
        "streetsidesoftware.code-spell-checker",
        "streetsidesoftware.code-spell-checker-german"
    ]
}
EXTENSIONS
print_ok "extensions.json ✓"

# Launch-Konfiguration (Debugging)
print_step "VS Code launch.json (Debug) erstellen..."
cat > .vscode/launch.json << 'LAUNCH'
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "🐍 Python: Aktuelle Datei",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal"
        },
        {
            "name": "🧪 pytest: Alle Tests",
            "type": "python",
            "request": "launch",
            "module": "pytest",
            "args": ["tests/", "-v"],
            "console": "integratedTerminal"
        },
        {
            "name": "🚀 FastAPI: Server starten",
            "type": "python",
            "request": "launch",
            "module": "uvicorn",
            "args": ["src.api.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
            "console": "integratedTerminal"
        }
    ]
}
LAUNCH
print_ok "launch.json ✓"

# ─────────────────────────────────────────────
# 📓 SCHRITT 11: STARTER-NOTEBOOKS
# ─────────────────────────────────────────────
print_header "SCHRITT 11: STARTER-NOTEBOOKS & BEISPIEL-CODE"

# EEG Beispiel-Skript
print_step "EEG Analyse Starter-Skript erstellen..."
cat > src/brain_signals/eeg_starter.py << 'EEGPY'
"""
🧠 EEG Daten-Analyse Starter
Jens' KI+Hirnforschung - EEG Pipeline
"""

import mne
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path


def load_eeg_data(filepath: str) -> mne.io.Raw:
    """EEG-Daten laden (unterstützt .edf, .fif, .set)"""
    path = Path(filepath)
    
    if path.suffix == '.edf':
        raw = mne.io.read_raw_edf(filepath, preload=True, verbose=False)
    elif path.suffix == '.fif':
        raw = mne.io.read_raw_fif(filepath, preload=True, verbose=False)
    elif path.suffix == '.set':
        raw = mne.io.read_raw_eeglab(filepath, preload=True, verbose=False)
    else:
        raise ValueError(f"Unbekanntes EEG-Format: {path.suffix}")
    
    print(f"✅ EEG geladen: {raw.info['nchan']} Kanäle, {raw.info['sfreq']} Hz")
    return raw


def preprocess_eeg(raw: mne.io.Raw, 
                   l_freq: float = 1.0, 
                   h_freq: float = 40.0) -> mne.io.Raw:
    """Standard EEG Vorverarbeitung"""
    # Bandpass-Filter
    raw_filtered = raw.copy().filter(l_freq, h_freq, verbose=False)
    print(f"✅ Filter angewendet: {l_freq}-{h_freq} Hz")
    
    # Notch-Filter (50 Hz Netzstörung entfernen)
    raw_filtered.notch_filter(freqs=50, verbose=False)
    print("✅ Notch-Filter (50 Hz) angewendet")
    
    return raw_filtered


def extract_epochs(raw: mne.io.Raw, 
                   events: np.ndarray,
                   tmin: float = -0.2, 
                   tmax: float = 0.8) -> mne.Epochs:
    """Epochen aus EEG-Daten extrahieren"""
    epochs = mne.Epochs(raw, events, tmin=tmin, tmax=tmax, 
                        baseline=(None, 0), preload=True, verbose=False)
    print(f"✅ {len(epochs)} Epochen extrahiert")
    return epochs


def compute_psd(raw: mne.io.Raw, fmin: float = 1, fmax: float = 45):
    """Power Spectral Density berechnen"""
    psd, freqs = raw.compute_psd(fmin=fmin, fmax=fmax).get_data(return_freqs=True)
    return psd, freqs


if __name__ == "__main__":
    print("🧠 EEG Analyse Starter bereit!")
    print("Verwendung:")
    print("  from src.brain_signals.eeg_starter import load_eeg_data, preprocess_eeg")
    print("  raw = load_eeg_data('data/eeg_data/meine_daten.edf')")
    print("  raw_clean = preprocess_eeg(raw)")
EEGPY
print_ok "EEG Starter ✓"

# fMRI Beispiel-Skript
print_step "fMRI Analyse Starter-Skript erstellen..."
cat > src/brain_signals/fmri_starter.py << 'FMRIPY'
"""
🧠 fMRI Daten-Analyse Starter
Jens' KI+Hirnforschung - MRT/fMRI Pipeline
"""

import nibabel as nib
import nilearn
from nilearn import plotting, image, datasets
import numpy as np
import matplotlib.pyplot as plt


def load_fmri(filepath: str):
    """fMRI NIfTI-Datei laden"""
    img = nib.load(filepath)
    data = img.get_fdata()
    print(f"✅ fMRI geladen: Shape {data.shape}, Voxelgröße {img.header.get_zooms()}")
    return img, data


def smooth_fmri(img, fwhm: float = 6.0):
    """Räumliches Glätten (Smoothing)"""
    smoothed = image.smooth_img(img, fwhm=fwhm)
    print(f"✅ Smoothing angewendet: FWHM={fwhm}mm")
    return smoothed


def plot_brain(img, title: str = "Brain", output: str = None):
    """Gehirn visualisieren"""
    display = plotting.plot_anat(img, title=title, display_mode='ortho')
    if output:
        display.savefig(output)
        print(f"✅ Bild gespeichert: {output}")
    return display


def extract_roi_signal(func_img, atlas_img, roi_index: int) -> np.ndarray:
    """ROI (Region of Interest) Signal extrahieren"""
    from nilearn.maskers import NiftiLabelsMasker
    masker = NiftiLabelsMasker(labels_img=atlas_img, verbose=0)
    time_series = masker.fit_transform(func_img)
    return time_series[:, roi_index]


if __name__ == "__main__":
    print("🧠 fMRI Analyse Starter bereit!")
    print("Verwendung:")
    print("  from src.brain_signals.fmri_starter import load_fmri, plot_brain")
    print("  img, data = load_fmri('data/fmri_data/subject01.nii.gz')")
    print("  plot_brain(img, title='Subject 01')")
FMRIPY
print_ok "fMRI Starter ✓"

# KI-Modell Starter
print_step "KI-Modell Starter-Skript erstellen..."
cat > src/models/brain_ai_model.py << 'AIMODEL'
"""
🤖🧠 KI-Modell für Hirnforschung
Jens' Multi-Milliarden KI+Hirnforschung
"""

import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.preprocessing import StandardScaler
import mlflow
import mlflow.pytorch


class BrainSignalDataset(Dataset):
    """Dataset für Hirnsignal-Daten (EEG/fMRI)"""
    
    def __init__(self, X: np.ndarray, y: np.ndarray):
        self.X = torch.FloatTensor(X)
        self.y = torch.LongTensor(y)
    
    def __len__(self):
        return len(self.X)
    
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]


class BrainStateClassifier(nn.Module):
    """
    🧠 Neuronales Netz zur Klassifikation von Gehirnzuständen
    z.B. Schmerz vs. kein Schmerz, Schlafphasen, etc.
    """
    
    def __init__(self, input_dim: int, hidden_dim: int = 256, num_classes: int = 2):
        super(BrainStateClassifier, self).__init__()
        
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.3),
            
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.BatchNorm1d(hidden_dim // 2),
            nn.ReLU(),
            nn.Dropout(0.3),
            
            nn.Linear(hidden_dim // 2, num_classes)
        )
    
    def forward(self, x):
        return self.network(x)


def train_model(model, train_loader, val_loader, 
                epochs: int = 50, lr: float = 1e-3):
    """Modell trainieren mit MLflow Tracking"""
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"🖥️  Training auf: {device}")
    
    model = model.to(device)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    criterion = nn.CrossEntropyLoss()
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5)
    
    # MLflow Experiment starten
    mlflow.set_experiment("brain_state_classification")
    
    with mlflow.start_run():
        mlflow.log_params({
            "epochs": epochs,
            "learning_rate": lr,
            "device": str(device)
        })
        
        for epoch in range(epochs):
            model.train()
            train_loss = 0.0
            
            for X_batch, y_batch in train_loader:
                X_batch, y_batch = X_batch.to(device), y_batch.to(device)
                
                optimizer.zero_grad()
                outputs = model(X_batch)
                loss = criterion(outputs, y_batch)
                loss.backward()
                optimizer.step()
                train_loss += loss.item()
            
            avg_train_loss = train_loss / len(train_loader)
            val_acc = evaluate_model(model, val_loader, device)
            scheduler.step(avg_train_loss)
            
            mlflow.log_metrics({
                "train_loss": avg_train_loss,
                "val_accuracy": val_acc
            }, step=epoch)
            
            if (epoch + 1) % 10 == 0:
                print(f"Epoch {epoch+1}/{epochs} | Loss: {avg_train_loss:.4f} | Val-Acc: {val_acc:.4f}")
        
        mlflow.pytorch.log_model(model, "brain_classifier")
        print("✅ Modell in MLflow gespeichert!")
    
    return model


def evaluate_model(model, loader, device):
    """Modell evaluieren"""
    model.eval()
    correct = total = 0
    
    with torch.no_grad():
        for X_batch, y_batch in loader:
            X_batch, y_batch = X_batch.to(device), y_batch.to(device)
            outputs = model(X_batch)
            _, predicted = torch.max(outputs, 1)
            total += y_batch.size(0)
            correct += (predicted == y_batch).sum().item()
    
    return correct / total


if __name__ == "__main__":
    print("🤖🧠 KI-Modell Starter bereit!")
    print("Beispiel-Training:")
    print("  X = np.random.randn(1000, 64)  # 1000 EEG-Samples, 64 Kanäle")
    print("  y = np.random.randint(0, 2, 1000)  # Klassen")
    print("  model = BrainStateClassifier(input_dim=64)")
AIMODEL
print_ok "KI-Modell Starter ✓"

# ─────────────────────────────────────────────
# 📝 SCHRITT 12: README ERSTELLEN
# ─────────────────────────────────────────────
print_header "SCHRITT 12: README & DOKUMENTATION"

cat > README.md << 'README'
# 🧠💰 KI + Hirnforschung — Jens' Multi-Milliarden Unternehmen

![CI/CD](https://github.com/DEIN_USERNAME/ki_hirnforschung/actions/workflows/ci_cd.yml/badge.svg)
[![Python 3.10](https://img.shields.io/badge/python-3.10-blue.svg)](https://www.python.org/downloads/)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

## 🚀 Über dieses Projekt

Cutting-Edge KI-Forschung für Hirnforschung, EEG/fMRI-Analyse und neuronale Dekodierung.

## 🛠️ Installation

```bash
# Repository klonen
git clone https://github.com/DEIN_USERNAME/ki_hirnforschung.git
cd ki_hirnforschung

# Virtual Environment aktivieren
source venv/bin/activate

# Dependencies installieren
pip install -r requirements.txt
```

## 🧠 Hauptfunktionen

| Modul | Beschreibung |
|-------|-------------|
| `src/brain_signals/eeg_starter.py` | EEG-Daten laden & vorverarbeiten |
| `src/brain_signals/fmri_starter.py` | fMRI/MRT-Analyse |
| `src/models/brain_ai_model.py` | KI-Modell für Gehirnzustands-Klassifikation |
| `src/api/` | FastAPI REST-API |

## 📊 Tools & Stack

- **KI**: TensorFlow, PyTorch, Scikit-Learn, Hugging Face
- **Hirnforschung**: MNE-Python, NiBabel, NiLearn, Brian2
- **Daten**: DVC (Data Version Control)
- **Tracking**: MLflow
- **CI/CD**: GitHub Actions
- **Code-Qualität**: Black, Flake8, pytest

## 🔬 Daten

Daten werden mit DVC versioniert:
```bash
dvc pull   # Daten herunterladen
dvc push   # Daten hochladen
```

## 🧪 Tests ausführen

```bash
pytest tests/ -v
```

## 📈 MLflow Dashboard starten

```bash
mlflow ui
# → http://localhost:5000
```

---
*Erstellt von Jens | Powered by Claude (Anthropic)*
README

print_ok "README.md ✓"

# ─────────────────────────────────────────────
# ✅ ABSCHLUSS
# ─────────────────────────────────────────────
print_header "🎉 INSTALLATION ABGESCHLOSSEN!"

echo -e "${BOLD}${GREEN}"
cat << 'EOF'
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   ✅ ALLES ERFOLGREICH INSTALLIERT!                   ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${CYAN}${BOLD}📦 Installierte Pakete:${NC}"
echo -e "  🤖 TensorFlow + PyTorch + Scikit-Learn"
echo -e "  🧠 MNE-Python + NiBabel + NiLearn + Brian2 + Neo + Elephant"
echo -e "  📊 MLflow + Hugging Face Transformers"
echo -e "  🔧 FastAPI + DVC + pytest + Black + Flake8"
echo -e "  🔑 OpenAI + Anthropic API Clients"

echo -e "\n${CYAN}${BOLD}📁 Projektstruktur:${NC}"
echo "  $HOME/$PROJECT_NAME/"
echo "  ├── data/          (EEG, fMRI, Modelle — via DVC)"
echo "  ├── notebooks/     (Jupyter Notebooks)"
echo "  ├── src/           (Source Code)"
echo "  │   ├── brain_signals/  (EEG + fMRI Starter)"
echo "  │   ├── models/         (KI-Modelle)"
echo "  │   └── api/            (FastAPI)"
echo "  ├── tests/         (pytest Tests)"
echo "  ├── .github/       (GitHub Actions Workflows)"
echo "  └── .vscode/       (VS Code Einstellungen)"

echo -e "\n${CYAN}${BOLD}🚀 Nächste Schritte:${NC}"
echo -e "${YELLOW}  1. ${NC}VS Code Extensions installieren: Ctrl+Shift+P → 'Extensions: Show Recommended'"
echo -e "${YELLOW}  2. ${NC}GitHub Copilot: Ctrl+Shift+P → 'GitHub Copilot: Sign In'"
echo -e "${YELLOW}  3. ${NC}DVC Remote konfigurieren: dvc remote add -d myremote s3://dein-bucket"
echo -e "${YELLOW}  4. ${NC}MLflow starten: mlflow ui → http://localhost:5000"
echo -e "${YELLOW}  5. ${NC}Jupyter starten: jupyter lab"
echo -e "${YELLOW}  6. ${NC}ZenHub installieren: https://www.zenhub.com/"

echo -e "\n${GREEN}${BOLD}  🧠💰 Dein Multi-Milliarden KI-Empire ist bereit! VIEL ERFOLG, JENS! 🚀${NC}\n"
