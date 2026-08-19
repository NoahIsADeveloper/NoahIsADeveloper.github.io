
Put your exported PGP public key here as "pubkey.asc" and the
"Download public key" button on the site will work automatically.
 
Export it with:
  gpg --armor --export your@email.com > pubkey.asc
 
Until you add the file, the download link will just 404 — harmless,
but worth adding once you have a key.
 


Thumbnails for the Projects section go here.
 
The example tile in index.html looks for "example.jpg" — rename your own
screenshot to that (or update the src in index.html) to swap it in.
For each additional project, copy the whole <a class="project-tile">...</a>
block in the Projects card and point it at a new image + link.
 
