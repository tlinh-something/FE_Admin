# echo "Switching to branch master..."
# git checkout master

echo "Building app..."
npm run build

echo "Deploy files to server..."
scp -r -i "C:\Users\Asus\OneDrive\Desktop\art" dist/* root@167.172.92.40:/var/www/admin


echo "Done!"