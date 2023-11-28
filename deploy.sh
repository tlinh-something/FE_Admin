# echo "Switching to branch master..."
# git checkout master

# echo "Building app..."
# npm run build

echo "Deploy files to server..."
scp -r -i "C:\Users\DELL\OneDrive\Máy tính\art" dist/* root@206.189.145.38:/var/www/becode/


echo "Done!"