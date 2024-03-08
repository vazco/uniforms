#!/bin/bash

# Check if the correct number of arguments are passed
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <root_directory> <output_file>"
    exit 1
fi

# Assign arguments to variables
root_directory=$1
output_file=$2

# Create or clear the output file
> "$output_file"

echo "Starting concatenation of md files from '$root_directory' directory."

# Find all .md files and concatenate their contents
find "$root_directory" -type f -name "*.md" ! -path "*/node_modules/*" | while read filename; do
    echo "Adding file: $filename"
    echo "File: $filename" >> "$output_file"
    echo "" >> "$output_file"
    cat "$filename" >> "$output_file"
    echo "" >> "$output_file"
done

echo "Concatenation complete. Output is in $output_file"
