// productimage
// output
const input = document.getElementById("productimage");
const image = document.getElementById("output");

input.onchange = evt => {
  const[file] = input.files;
  if(file) {
    image.src = URL.createObjectURL(file);
  }
}



