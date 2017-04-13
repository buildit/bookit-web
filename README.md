## Docker packaging
 
 Travis build performs Docker image push only for `master` branch.
 We do not perform separate `npm i` and reuse build `node_modules` with `npm prune --production`.
  
 Local build and run example 
 `npm run build && docker build . -t bookit-web:local && docker run --rm -ti -p 8080:80 -e API_BASE_URL=http://localhost:1234/ bookit-web:local`

 Build and push (just in case you do not trust Travis build)
 `npm run build && docker build . -t builditdigital/bookit-web:latest && docker push builditdigital/bookit-web:latest`
