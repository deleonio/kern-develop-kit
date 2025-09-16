#!/bin/bash
# filepath: /Users/moppitz/Workspace/kolibri/kern-kolibri-kit/commit-snapshots.sh

# Get the total number of snapshot files
TOTAL_FILES=$(find snapshots -name "*.png" | wc -l | tr -d ' ')
echo "Total snapshot files found: $TOTAL_FILES"

# Get all snapshot files sorted
SNAPSHOT_FILES=($(find snapshots -name "*.png" | sort))

# Counter for file processing
file_count=0
batch_start=1

# Process files in batches of 5
for ((i=0; i<${#SNAPSHOT_FILES[@]}; i+=5)); do
    # Calculate batch end
    batch_end=$((batch_start + 4))
    if [ $batch_end -gt $TOTAL_FILES ]; then
        batch_end=$TOTAL_FILES
    fi

    # Get files for this batch
    batch_files=()
    for ((j=i; j<i+5 && j<${#SNAPSHOT_FILES[@]}; j++)); do
        batch_files+=("${SNAPSHOT_FILES[j]}")
    done

    # Add files to git
    for file in "${batch_files[@]}"; do
        git add "$file"
        echo "Added: $file"
    done

    # Create commit message
    commit_message="Add snapshot $batch_start bis $batch_end / $TOTAL_FILES"

    # Commit the batch
    git commit -m "$commit_message"
    echo "Committed: $commit_message"

    # Push the commit
    git push
    echo "Pushed batch $batch_start-$batch_end"
    echo "---"

    # Update batch start for next iteration
    batch_start=$((batch_end + 1))
done

echo "All snapshots have been committed and pushed!"
