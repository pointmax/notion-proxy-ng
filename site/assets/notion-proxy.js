// re-implement toggle blocks
const showToggle = (content, arrow) => {
  arrow.style.transform = "rotateZ(180deg)";
  content.style.display = "block";
};

const hideToggle = (content, arrow) => {
  arrow.style.transform = "rotateZ(90deg)";
  content.style.display = "none";
};

const toggleButtons = document.getElementsByClassName("notionproxyng-toggle-button");
for (let i = 0; i < toggleButtons.length; i++) {
  const toggleButton = toggleButtons.item(i);
  const toggleId = toggleButton.getAttribute("notionproxyng-toggle-id");
  const toggleContent = document.querySelector(`.notionproxyng-toggle-content[notionproxyng-toggle-id='${toggleId}']`);
  const toggleArrow = toggleButton.querySelector("svg");
  if (toggleButton && toggleContent) {
    hideToggle(toggleContent, toggleArrow);
    toggleButton.addEventListener("click", () => {
      if (toggleContent.style.display == "none") {
        showToggle(toggleContent, toggleArrow);
      } else {
        hideToggle(toggleContent, toggleArrow);
      }
    });
  }
}

// sets all iframes' parent container opacity to 1
// originally notion has a callback to do that on iframe loaded
const pendingIframes = document.getElementsByTagName("iframe");
for (let i = 0; i < pendingIframes.length; i++) {
  pendingIframes.item(i).parentElement.style.opacity = 1;
}

// const pendingIframes = document.getElementsByClassName("notionproxyng-iframe-target");
// for (let i = 0; i < pendingIframes.length; i++) {
//   const pendingIframe = pendingIframes.item(i);
//   const iframeSrc = pendingIframe.getAttribute("notionproxyng-iframe-src");
//   const iframe = document.createElement("iframe");

//   pendingIframe.style.opacity = 0;
//   iframe.onload = () => {
//     pendingIframe.style.opacity = 1;
//   };

//   iframe.style.width = "100%";
//   iframe.style.height = "100%";
//   iframe.style.position = "absolute";
//   iframe.style.left = 0;
//   iframe.style.top = 0;
//   iframe.style.pointerEvents = "auto";

//   iframe.setAttribute("src", iframeSrc);
//   iframe.setAttribute("frameborder", "0");
//   iframe.setAttribute(
//     "sandbox",
//     "allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
//   );

//   pendingIframe.appendChild(iframe);
// }

// hide search box on inline databases
// couldn't find a reliable way to do this in css
const collectionSearchBoxes = document.getElementsByClassName("collectionSearch");
for (let i = 0; i < collectionSearchBoxes.length; i++) {
  const collectionSearchBox = collectionSearchBoxes.item(i).parentElement;
  collectionSearchBox.style.display = "none";
}

// re-implement anchor links
const anchorLinks = document.querySelectorAll("a.notionproxyng-anchor-link");
for (let i = 0; i < anchorLinks.length; i++) {
  const anchorLink = anchorLinks.item(i);
  const id = anchorLink.getAttribute("href").replace("#", "");
  const targetBlockId =
    id.slice(0, 8) + "-" + id.slice(8, 12) + "-" + id.slice(12, 16) + "-" + id.slice(16, 20) + "-" + id.slice(20);
  anchorLink.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(targetBlockId);
    document.querySelector(`div[data-block-id='${targetBlockId}']`).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// remove target=_blank
Array.from(document.querySelectorAll('a[target="_blank"]'))
  .forEach(link => link.removeAttribute('target'));

