let lastScrollTop = 0;
const header = document.querySelector("header");
const toTop = document.querySelector(".to-top");
const heroSection = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const heroSectionOffsetTop = heroSection.offsetTop;

  if (scrollTop > heroSectionOffsetTop) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }

  if (scrollTop > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});
document.addEventListener('DOMContentLoaded', function() {
  fetch('sponsors.json')
    .then(response => response.json())
    .then(data => {
      const containers = {
        'Title': document.getElementById('title-sponsor-container'),
        'Gold': document.getElementById('gold-sponsor-container'),
        'Platinum': document.getElementById('platinum-sponsor-container'),
        'Associate': document.getElementById('associate-sponsor-container'),
        'Domain': document.getElementById('domain-sponsor-container'),
        'Platform': document.getElementById('platform-partners-container'),
        'Inkind': document.getElementById('inkind-partners-container')
      };

      data.forEach(sponsor => {
        const sponsorDiv = document.createElement('div');
        sponsorDiv.classList.add('sponsor', sponsor.type.toLowerCase());
        sponsorDiv.innerHTML = `
          <a href="${sponsor.website}" target="_blank">
            <img src="${sponsor.logo}" alt="${sponsor.type} Sponsor">
            <p>${sponsor.name}</p>
          </a>
        `;
        if (containers[sponsor.type]) {
          containers[sponsor.type].appendChild(sponsorDiv);
        }
      });
    })
    .catch(error => console.error('Error fetching sponsor data:', error));
});