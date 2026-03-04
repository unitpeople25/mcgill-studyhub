#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

# --- Konfiguration ---
INTERNAL="/dev/sda"                    # interne Platte
TARGET="/dev/sdc"                      # USB-HDD
BACKUP_DEST="$TARGET"                  # RAW Backup
CLONEZILLA_FOLDER="clonezilla"
CLONEZILLA_MOUNT="/mnt/$CLONEZILLA_FOLDER"
LOGFILE="$HOME/backup_log.txt"
DATE=$(date +%Y%m%d-%H%M)
USE_LUKS=false
LUKS_NAME="backup_drive"

# --- Logging ---
echo "Backup gestartet: $DATE" >> "$LOGFILE"

# --- RAW Clone ---
echo "Starte RAW-Clone..." | tee -a "$LOGFILE"
sudo dd if="$INTERNAL" of="$BACKUP_DEST" bs=64K status=progress conv=noerror,sync
echo "RAW-Clone abgeschlossen: $(date)" >> "$LOGFILE"

# --- Clonezilla / Partclone Image ---
echo "Starte Clonezilla Image Backup..." | tee -a "$LOGFILE"
sudo mkdir -p "$CLONEZILLA_MOUNT"
sudo mount "$TARGET" "$CLONEZILLA_MOUNT" 2>/dev/null || true
IMG_PATH="$CLONEZILLA_MOUNT/image-$DATE.img"
sudo partclone.ext4 -c -s "${INTERNAL}2" -o "$IMG_PATH"
echo "Clonezilla Backup abgeschlossen: $(date)" >> "$LOGFILE"

# --- Prüfsummen ---
echo "Prüfsumme des RAW-Backups..." >> "$LOGFILE"
sudo sha256sum "$BACKUP_DEST" >> "$LOGFILE"

# --- Unmount & LUKS schließen ---
sudo umount "$CLONEZILLA_MOUNT" 2>/dev/null || true
if [ "$USE_LUKS" = true ]; then
    sudo cryptsetup close "$LUKS_NAME"
fi

echo "Backup komplett abgeschlossen: $(date)" | tee -a "$LOGFILE"
echo "=====================================" >> "$LOGFILE"
echo "✅ Alle Schritte abgeschlossen!"
