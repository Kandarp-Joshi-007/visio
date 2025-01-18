import os
import pandas as pd
import sys
from ydata_profiling import ProfileReport
import webbrowser

# Input arguments
data_file = sys.argv[1]
output_file = sys.argv[2]

# New arguments
selected_columns = sys.argv[3].split(',') if len(sys.argv) > 3 else None
print("Selected Columns:", selected_columns)  # Debugging statement

selected_rows = sys.argv[4].split(':') if len(sys.argv) > 4 else None

# Read the CSV file
try:
    df = pd.read_csv(data_file)
except Exception as e:
    print("Error:", e)
    sys.exit(1)

# Process selected columns
if selected_columns:
    # Filter out selected columns that exist in the DataFrame
    selected_columns = [col for col in selected_columns if col in df.columns]
    if selected_columns:
        df = df[selected_columns]
    else:
        print("No valid columns selected. Using all columns.")

print("DataFrame after selecting columns:")
print(df)  # Debugging statement
print("Original Columns:", df.columns)

# Process selected rows
if selected_rows:
    try:
        start, end = map(int, selected_rows)
        df = df.iloc[start:end]
    except Exception as e:
        print("Error:", e)

print("DataFrame after selecting rows:")
print(df)  # Debugging statement

# Check if DataFrame has columns
if df.empty or df.columns.empty:
    print("DataFrame is empty or does not have any columns.")
    sys.exit(1)

# Store original column names before adding row-wise stats
original_columns = list(df.columns)

# Generate pandas profiling report
profile = ProfileReport(df, title="VisioBrain Data Report", explorative=True)
profile.config.html.style.logo = "background.png"
# Save the report to HTML file
profile_file = "output.html"
profile.to_file(profile_file)

# Print the path to the HTML file
print("HTML file path:", os.path.abspath(profile_file))

# Open the HTML file in the default web browser
webbrowser.open("file://" + os.path.abspath(profile_file))
