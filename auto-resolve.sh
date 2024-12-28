# Pull the latest changes from the remote repository
git fetch origin

# Merge the changes with the 'theirs' strategy to automatically resolve conflicts in favor of remote
git merge -X theirs origin/main  # Replace 'main' with your branch name if different

# Check if there are any unmerged files (should be none if conflicts are resolved)
$mergeStatus = git status
if ($mergeStatus -match "unmerged") {
    Write-Host "There are still unmerged files. Please resolve them manually."
    exit 1
} else {
    Write-Host "Conflicts resolved automatically. Changes have been merged."
    git push origin main  # Push changes back to the remote repository (optional)
}
