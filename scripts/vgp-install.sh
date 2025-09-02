# this script most recently updated/maintained in september 2025
# extract username from current working directory (expects format: username.github.io)
current_dir=$(basename "$PWD")
# extract username from current working directory (expects format: username.github.io)
if [[ "$current_dir" =~ ^([^.]+)\.github\.io$ ]]; then
  username="${BASH_REMATCH[1]}"
  echo $username
else
  echo "Error: Current directory name must be in the format username.github.io."
  echo "Please check which directory you are in. Check with your instructor if you need help. Cancelling operation."
  exit 1
fi

# check if vgp-projects folder already exists
if [ -d "vgp-projects" ]; then
  echo "Error: vgp-projects directory already exists."
  echo "You may have already run this script. Check with your instructor before proceeding. Cancelling operation."
  exit 1
fi

# clone student-owned vgp-projects repo
git clone https://github.com/$username/vgp

# remove git references from cloned repo if the vgp folder exists
if [ -d "vgp" ]; then
  echo "Preparing vgp projects and instructions..."
else
  echo "Error: vgp folder does not exist."
  echo "There may be an issue with your repository. Please check with your instructor to help troubleshoot. Cancelling operation."
  exit 1
fi

cd vgp
rm -rf .git*
cd ..

# move vgp projects to root
mv vgp/vgp-projects vgp-projects/

# remove cloned vgp repo once all projects are installed
rm -rf vgp
