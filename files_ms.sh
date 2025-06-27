#!/bin/bash

# Define the output file name
OUTPUT_FILE="code.txt"

# Project root directory (current directory)
PROJECT_DIR="."

# --- Script Start ---

# 1. Clear the output file and add a header.
echo "Project: tej-a192-rapid-trace" > $OUTPUT_FILE
echo "Generated on: $(date)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 2. Generate and append the directory structure.
# 'tree' is preferred. If not installed, it uses a 'find' command as a fallback.
# The -I flag ignores directories/files matching the pattern.
echo "Directory Structure:" >> $OUTPUT_FILE
if command -v tree &> /dev/null
then
    # Use tree, ignoring standard clutter including assets
    tree -I "node_modules|dist|.git|*lock.json|assets" $PROJECT_DIR >> $OUTPUT_FILE
else
    # Fallback using find to create a tree-like view
    find $PROJECT_DIR -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g' >> $OUTPUT_FILE
fi
echo "" >> $OUTPUT_FILE

# 3. Append the content of each relevant file.
# This loop finds all files, excluding specified directories and file names.
find $PROJECT_DIR -type f \
  -not -path '*/node_modules/*' \
  -not -path '*/dist/*' \
  -not -path '*/.git/*' \
  -not -path '*/client/src/assets/*' \
  -not -name 'package-lock.json' \
  -not -name '*.log' \
  -not -name '*.svg' \
  -not -name '*.ico' \
  -not -name '*.png' \
  -not -name '*.jpg' \
  -not -name '*.jpeg' \
  -not -name '*.gif' |
while read -r file; do
  # Print a separator and the file path
  echo "================================================" >> $OUTPUT_FILE
  echo "FILE: ${file#./}" >> $OUTPUT_FILE
  echo "================================================" >> $OUTPUT_FILE

  # Append the file's content
  cat "$file" >> $OUTPUT_FILE

  # Add a blank line for better separation
  echo "" >> $OUTPUT_FILE
done

echo "✅ Success! Project structure and code have been written to $OUTPUT_FILE"