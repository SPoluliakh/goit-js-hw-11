mybutton = document.getElementById('myBtn');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    // mybutton.style.display = 'block';
    mybutton.style.opacity = 0.5;
    mybutton.style.visibility = 'visible';
  } else {
    // mybutton.style.display = 'none';
    mybutton.style.opacity = 0;
    mybutton.style.visibility = 'hidden';
  }
}
