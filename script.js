/* =====================================================
   WILLIAM LEE BOOKS - STATIC SITE SCRIPTS
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileNav();
  initFadeAnimations();
  initBookModals();
  initContactForm();
});

/* Current Year*/
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});


/* =====================================================
   MOBILE NAVIGATION
   ===================================================== */
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function() {
    const isOpen = mobileNav.classList.toggle('open');
    
    if (menuIcon && closeIcon) {
      menuIcon.style.display = isOpen ? 'none' : 'block';
      closeIcon.style.display = isOpen ? 'block' : 'none';
    }
  });

  // Close mobile nav when clicking a link
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('open');
      if (menuIcon && closeIcon) {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });
  });
}

/* =====================================================
   FADE-IN ANIMATIONS
   ===================================================== */
function initFadeAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (!fadeElements.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(function(el) {
    observer.observe(el);
  });
}

/* =====================================================
   BOOK MODALS
   ===================================================== */

/**
 * BOOK DATA
 * - Keep your current HTML + JS structure
 * - Only “moon” (Book 1: Gone Before The Moon) is updated to match the OLD modal content
 * - Images expected in: /assets/*.webp
 */
const booksData = {
  'moon': {
    title: 'Gone Before The Moon',
    pages: [
      // Page 1: Prologue
      {
        type: 'excerpt',
        header: 'Prologue',
        title: 'Prologue',
        italic: false,
        content: ` <p>"The metallic tang of blood and antiseptic hung heavy in the air as she stumbled through the narrow corridor, her breath ragged and uneven. Fluorescent lights flickered above, casting jagged shadows that seemed to chase her every step. Her red headband was soaked with sweat, a few strands of her dark hair plastered to her face. Her hands trembled as she gripped the edges of the dark coat she'd stolen, the oversized fabric billowing behind her like a ghost.</p>
                                <p>Run.</p>
                                <p>The voice wasn't hers. It never was. They're coming.</p>
                                <p>Others chimed in, a cacophony of whispers and shouts that made her skull throb. She clenched her teeth, trying to drown them out, but it was no use. They were always there, an endless crowd in her mind, arguing, screaming, beggin</p>
                                <p>She turned a corner, her bare feet slapping against the cold tile, and froze. The room ahead was small and dark, except for the faint green glow of a monitor in the corner. A figure lay sprawled on the floor, half-hidden by shadows. Her heart lurched as recognition slammed into her. </p>
                                <p>"Billy," she whispered, her voice barely audible over the pounding in her ears.</p>
                                <p>Her brother's lifeless eyes stared back at her, unblinking. His body was contorted, twisted as if he'd fought until the very end. She dropped to her knees beside him, her fingers brushing against his bloodied cheek. He was still warm.</p>
                                <p>He's gone. </p>
                                <p>You can't save him. </p>
                                <p>Leave him. </p>
                                <p>"No," she hissed, shaking her head. The voices swirled, growing louder, overlapping until she could barely think. Tears blurred her vision as she gripped his shirt, shaking him gently, then harder.</p>
                                <p>"Billy, wake up," she pleaded. Her voice cracked, and the words broke into a sob.</p>
                                <p>They'll catch you. </p>
                                <p>Elena, you need to go.</p>
                                <p>A distant alarm blared, its sharp wail snapping her back to reality. The pounding of boots echoed from somewhere down the hall, growing louder with every second. </p>
                                <p>Her body moved before her mind could catch up, instincts driving her forward. She pressed a trembling kiss to Billy's forehead, then forced herself to stand. </p>
                                <p>"I'm sorry," she whispered, her voice breaking. With one last glance at her brother's lifeless form, she turned and bolted. </p>
                                <p>The halls twisted and turned in ways that made no sense, but she didn't stop. The voices screamed warnings, guiding her through the maze of corridors. Her bare feet skidded around a corner, and she crashed into a steel door. </p>
                                <p>Locked.</p>
                                <p>"No, no, no," she muttered, fumbling with the keypad beside it. Numbers flooded her mind, fragments of codes she'd seen in passing. Her fingers moved on their own, tapping in a sequence before she even realized what she was doing. </p>
                                <p>The lock clicked. The door groaned open, and she stumbled outside into the night. The cold air hit her like a slap, sharp and biting against her damp skin. She sucked in a deep breath, the scent of pine and earth replacing the sterile stench of the lab. For a moment, the voices in her head quieted, like they were catching their breath too. </p>
                                <p>But there was no relief. Not yet. She glanced back at the facility, its harsh lights glowing faintly through the trees. Somewhere inside, the doctor would be searching for her. He wouldn't stop. Not until he dragged her back, kicking and screaming, to finish what he'd started. </p>
                                <p>Her fingers brushed against her headband, the only thing left of the woman she used to be. She tightened it and stepped into the shadows of the forest, her body trembling with grief and fury. </p>
                                <p>Billy was gone... But she wasn't... Not yet... </p>`
      },

      // Page 2: Characters
{
  type: 'characters',
  title: 'Characters',
  characters: [
    {
      name: 'Kade Aston',
      image: 'assets/Kade.webp',
      description: 'A troubled teenager still reeling from the recent loss of his parents. Withdrawn and skipping school, he vanishes without a trace; setting off a chain of events that will unravel secrets far bigger than anyone expects.'
    },
    {
      name: 'Duncan Webb',
      image: 'assets/Duncan.webp',
      description: 'A quiet, thoughtful teenager and Kade\'s best friend. When Kade disappears and the city around him seems to shrug it off, Duncan finds the courage to take matters into his own hands. Doing this he uncovers a trail of secrets no one was meant to find.'
    },
    {
      name: 'PC Marlon Tredon',
      image: 'assets/Marlon.webp',
      description: 'A young, eager police officer, always looking to impress his superiors. He throws himself into the search, using his badge to gain an edge and prove himself.'
    },
    {
      name: 'Dante Tredon',
      image: 'assets/Dante Tredon - book 1.webp',
      description: 'Walking the thin line between law and loyalty. An undercover cop and Marlon’s older brother, he’s the steady hand trying to keep Marlon grounded, even when his own world is built on secrets and danger.'
    },
    {
      name: 'Latisha Tredon',
      image: 'assets/Latisha Tredon - book 1.webp',
      description: 'Carrying the weight of their father’s death in the line of duty. Unlike her brothers, she turned away from the dangers of the badge. Smart, switched-on, and level-headed, she doesn’t hide her disapproval of Marlon and Dante’s paths, yet she remains the unshakable voice of reason in their chaotic lives.'
    },
    {
      name: 'Dr Magnus Blackthorne',
      image: 'assets/Dr Magnus Blackthorne.webp',
      description: 'Some call him mad, others call him a genius. Years of genetic research and studies make him one of the most knowledgeable and experimental in the field.'
    },
    {
      name: 'DC Emily Langford',
      image: 'assets/DC Emily Langford - book 1.webp',
      description: 'A sweet and caring member of the police force. Offers a softer view on things compared to some of the force.'
    },
    {
      name: 'Cynthia Webb',
      image: 'assets/Cynthia.webp',
      description: 'Duncan’s caring mother, who’s also become a second mum to Kade; especially after he lost his parents. With nowhere else to go, she takes Kade in without hesitation.'
    },
    {
      name: 'PC Gordon Churchill',
      image: 'assets/PC Churchill.webp',
      description: 'At first glance, he seems like one of the grumpiest officers on the force. But spend a little time with him, and his more tolerable (and even helpful) side begins to show.'
    },
    {
      name: 'Richard Lanesworth',
      image: 'assets/Richard Lanesworth - book 1.webp',
      description: 'A wealthy man enjoying his retirement in the quiet luxury of his countryside manor. Beneath his refined exterior lies a gentler passion: capturing the beauty of animals through the lens of his camera.'
    },
    {
      name: 'Dr Stephen Heckingbottom',
      image: 'assets/Dr Stephen Heckingbottom - book 1.webp',
      description: 'The calculating head of Chimera Solutions, a cutting-edge company delving into genetic research. Brilliant and ambitious, his vision pushes the boundaries of science, though not always with regard for the cost.'
    },
    {
      name: 'Antonio Bianchi',
      image: 'assets/Antonio.webp',
      description: 'Now running the pizza shop alone, Antonio mourns the recent disappearance of his wife. Quiet grief lingers behind every order he serves.'
    },
    {
      name: 'Carl Naylor',
      image: 'assets/Carl Naylor - book 1 and 2.webp',
      description: 'A construction worker whose life seems almost too perfect until the police knock on his door while his wife, Josie, is at work. In a matter of minutes, everything he thought he knew about his life is shattered.'
    },
    {
      name: 'Aaron Preston',
      image: 'assets/Aaron - book 1.webp',
      description: 'Kade’s quiet, methodical friend. He hates school but keeps the rest of his life neat and ordered. He was meant to meet Kade the day he vanished, but when Kade didn’t show, Aaron’s mind spiralled with questions he couldn’t shake.'
    },
    {
      name: 'Joe Johnson',
      image: 'assets/Joe - book 1.webp',
      description: 'The laid-back kid who loves conspiracy theories and lounging while everyone else pulls the weight. When Kade failed to turn up at the skatepark, Joe brushed it off, until the truth started creeping in.'
    }
  ]
},


      // Page 3: Reviews
{
  type: 'reviews',
  title: 'Reader Ratings',
  ratings: [
    { platform: 'Amazon', score: '4.7', count: '24 Ratings' },
    { platform: 'Goodreads', score: '4.5', count: '38 Ratings' }
  ],
  reviews: [
    {
      stars: 5,
      author: 'Andy',
      text: `"What a great read, from page one the authors descriptions place you in the story, setting the scene for the action to happen, and when it does it comes thick and fast. Wait for the twists and turns, not everything is what you would expect. Looking forward to future titles, well done William Lee."`
    },
    {
      stars: 4,
      author: 'Samantha Jensen',
      text: `"This was a fantastic debut novel, a supernatural thriller that is well paced with engaging characters and a great take on supernatural abilities and creatures. The story follows Duncan as he searches for his missing friend Kade, as he falls further in the hole of dark truths, secret societies and mystery a whole new world opens up and for him and those around him nothing will ever be the same. I actually loved every second, you can tell the author wrote this book from a place of "I would love to read this exact story" and that drips off the page. Set up for further story, with characters you're introduced to, some the main focus and some side characters with only a small part. I'm so excited to continue in this world. Easy recommendation for me, give it a crack I don't think you will regret it."`
    },
    {
      stars: 5,
      author: 'Mark Jacobs',
      text: `"Gone Before The Moon by William Lee turns dark very quickly, with plenty of twists and turns, great characters and action. A great book."`
    },
    {
      stars: 5,
      author: 'Mr. Peter Dixon',
      text: `"For a new author , his first book kept me on my toes did not want to sleep just wanted to carry on reading the book the twist and turns in the plot kept me mesmerised looking forward to the next book"`
    },
    {
      stars: 5,
      author: 'Tony Karaphannit',
      text: `"Such a good debut book and start of an exciting series. I was immediately gripped the moment I saw a video of the Author explaining the ideas and theme of this book. He mentioned themes of mystery, suspense, horror and supernatural elements and he did not disappoint one bit. I sped through the book as the story just enticed me and I just wanted to keep reading. Full of twists and exciting characters. I didn’t know what would happen next and the many elements of surprise hit the spot. Can’t wait for the next book and the future of the series. So exciting and inspiring!"`
    },
    {
      stars: 5,
      author: 'Unknown Reader',
      text: `"This book is not the usual genre I would read however I genuinely could not put it down! It is very descriptive and really helps you imagine the scenes and the characters and be immersed in it. I love the story line, it’s intriguing and leaves you wanting to keep reading to find out whats going to happen to the different characters and what they might find out the more they dig into the secrets. You find yourself rooting for the different characters as their characters are built really well and with good back stories behind them to help you further understand them. Can’t wait to read the next book in the series when it comes out!"`
    },
    {
      stars: 4,
      author: 'Claire',
      text: `"This book follows Duncan on his journey to find his missing friend Kade, a beautiful story of friendship, highlighting the strength of their bond in how far he will go to get answers / find his friend.

The book has comical one-liners, suspense, supernatural creatures & be prepared to shed a tear!! So expect to 'feel' the words written on the page. Look forward in reading more of the Black Veil Files & will definitely be recommending this book."`
    },
    {
      stars: 5,
      author: 'Amy Maunders',
      text: `"What a fascinating story that William Lee wrote. Incredible characters and rich story that keep you want more and you are on edge of your seat whole time. I never read a book like this before it incredible. I highly recommend everyone read Gone before the moon. It a brilliant story that I will keep you on your toes. Please go and get the stunning book now. You like supernatural thriller than this is for you. Please go and buy the book now!!! Highly recommend everyone to get this book!!!"`
    },
    {
      stars: 4,
      author: 'Wyatt Creed Reads',
      text: `"This was a fantastic debut novel, a supernatural thriller that is well paced with engaging characters and a great take on supernatural abilities and creatures. The story follows Duncan as he searches for his missing friend Kade, as he falls further in the hole of dark truths, secret societies and mystery a whole new world opens up and for him and those around him nothing will ever be the same.

I actually loved every second, you can tell the author wrote this book from a place of "I would love to read this exact story" and that drips of the page. Set up for further story, with characters your introduced to, some the main focus and some side characters with only a small part. I'm so excited to continue in this world.

Easy recommendation for me, give it a crack I don't think you will regret it."`
    }
  ]
},


      // Page 4: CTA
      {
        type: 'cta',
        title: 'Get Your Copy',
        coverSmall: 'assets/book1-cover.webp',
        bookTitle: 'Gone Before The Moon',
        genre: 'Supernatural Thriller / Sci-Fi',
        pagesCount: '249 pages',
        buttons: [
          { label: 'Buy It Here!', className: 'btn btn-amazon', url: 'shop.html' },
          { label: 'TikTok Shop', className: 'btn btn-tiktok', url: 'PASTE TIKTOK LINK' }
        ]
      }
    ]
  },

  // Keep your other book(s) as-is (optional)
  'maw': {
    title: 'Into the Maw',
    pages: [
      { type: 'cover', image: 'assets/books/maw-cover.webp', title: 'Into the Maw' },
      { type: 'excerpt', title: 'The Descent', content: '...' },
      { type: 'image', image: 'assets/concept-art/maw-scene.webp', caption: 'The cave entrance' },
      { type: 'characters', title: 'Characters', characters: [] },
      { type: 'about', title: 'About This Book', content: '...', releaseDate: 'Coming 2025' }
    ]
  }
};

let currentBook = null;
let currentSpread = 0;
let totalSpreads = 0;

function initBookModals() {
  const bookCards = document.querySelectorAll('.book-card[data-book]');
  const modal = document.getElementById('book-modal');

  if (!bookCards.length || !modal) return;

  bookCards.forEach(function(card) {
    card.addEventListener('click', function() {
      const bookId = this.getAttribute('data-book');
      openBook(bookId);
    });
  });

  const backdrop = modal.querySelector('.book-modal-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeBook);

  const closeBtn = modal.querySelector('.book-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeBook);

  const prevBtn = document.getElementById('book-prev');
  const nextBtn = document.getElementById('book-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentSpread > 0) navigateBook(currentSpread - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (currentSpread < totalSpreads - 1) navigateBook(currentSpread + 1);
    });
  }

  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') closeBook();
    else if (e.key === 'ArrowLeft' && currentSpread > 0) navigateBook(currentSpread - 1);
    else if (e.key === 'ArrowRight' && currentSpread < totalSpreads - 1) navigateBook(currentSpread + 1);
  });
}

function openBook(bookId) {
  const modal = document.getElementById('book-modal');
  const bookData = booksData[bookId];

  if (!modal || !bookData) return;

  currentBook = bookData;
  currentSpread = 0;

  const isMobile = window.innerWidth < 768;
  totalSpreads = isMobile
    ? bookData.pages.length
    : Math.ceil(bookData.pages.length / 2);

  renderSpread();
  updateNavigation();

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBook() {
  const modal = document.getElementById('book-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    currentBook = null;
  }
}

function navigateBook(spreadIndex) {
  const pagesContainer = document.querySelector('.book-pages-container');

  if (pagesContainer) {
    pagesContainer.classList.add('flipping');
    setTimeout(function() {
      pagesContainer.classList.remove('flipping');
    }, 400);
  }

  currentSpread = spreadIndex;
  renderSpread();
  updateNavigation();
}

function renderSpread() {
  const container = document.querySelector('.book-pages-container');
  if (!container || !currentBook) return;

  const isMobile = window.innerWidth < 768;
  let html = '';

  if (isMobile) {
    // Mobile: single page per spread
    const page = currentBook.pages[currentSpread];
    html = renderPage(page, currentSpread + 1, 'right-page');
  } else {
    // Desktop: 2 pages per spread, starting immediately with pages 0 + 1
    const leftIndex = currentSpread * 2;
    const rightIndex = currentSpread * 2 + 1;

    if (leftIndex < currentBook.pages.length) {
      html += renderPage(currentBook.pages[leftIndex], leftIndex + 1, 'left-page');
    } else {
      html += '<div class="book-page left-page"><div class="page-number"></div></div>';
    }

    if (rightIndex < currentBook.pages.length) {
      html += renderPage(currentBook.pages[rightIndex], rightIndex + 1, 'right-page');
    } else {
      html += '<div class="book-page right-page"><div class="page-number"></div></div>';
    }
  }

  container.innerHTML = html;

  // Wire CTA buttons (so they open in new tab without inline onclick)
  container.querySelectorAll('[data-open-url]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const url = btn.getAttribute('data-open-url');
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

function renderPage(page, pageNum, pageClass) {
  if (!page) return '';

  let content = '';

  switch (page.type) {
    case 'cover':
      content = `
        <div class="page-image">
          <img src="${page.image}" alt="${page.title}" onerror="this.src='assets/placeholder.svg'">
        </div>
      `;
      break;

    case 'excerpt': {
      const header = page.header || 'Excerpt';
      const italicClass = page.italic ? 'italic' : '';
      const body = (page.content || '').replace(/\n\n/g, `</p><p class="page-text ${italicClass}">`);
      const footer = page.footer
        ? `<div class="page-footer"><p>${page.footer}</p></div>`
        : '';

      content = `
        <div class="page-header">${header}</div>
        <h3 class="page-title">${page.title || ''}</h3>
        <div class="page-text-wrap">
          <p class="page-text ${italicClass}">${body}</p>
        </div>
        ${footer}
      `;
      break;
    }

    case 'characters': {
      const charList = (page.characters || []).map(function(char) {
        const img = char.image
          ? `<img src="${char.image}" class="character-photo" alt="${char.name} character art" onerror="this.style.display='none'">`
          : '';
        return `
          <div class="character-item">
            <div class="character-header">
              ${img}
              <h4>${char.name}</h4>
            </div>
            <p>${char.description || ''}</p>
          </div>
        `;
      }).join('');

      content = `
        <div class="page-header">Cast</div>
        <h3 class="page-title">${page.title || 'Characters'}</h3>
        <div class="characters-list">${charList}</div>
      `;
      break;
    }

    case 'reviews': {
      const ratingsHtml = (page.ratings || []).map(function(r) {
        return `
          <div class="rating-chip">
            <div class="rating-platform">${r.platform}</div>
            <div class="rating-score">${r.score}</div>
            <div class="rating-count">${r.count}</div>
          </div>
        `;
      }).join('');

      const reviewsHtml = (page.reviews || []).map(function(r) {
        const stars = '★★★★★'.slice(0, Math.max(0, Math.min(5, r.stars || 0)));
        const text = (r.text || '').replace(/\n\n/g, '</p><p class="review-text">');
        return `
          <div class="review-item">
            <div class="review-header">
              <span class="review-stars">${stars}</span>
              <span class="review-author">${r.author || 'Reader'}</span>
            </div>
            <p class="review-text">"${text}"</p>
          </div>
        `;
      }).join('');

      content = `
        <div class="page-header">Early Buzz</div>
        <h3 class="page-title">${page.title || 'Reader Reviews'}</h3>
        <div class="rating-summary">${ratingsHtml}</div>
        <div class="reviews-list">${reviewsHtml}</div>
      `;
      break;
    }

    case 'cta': {
      const buttonsHtml = (page.buttons || []).map(function(b) {
        return `
          <button class="${b.className || 'btn'}" type="button" data-open-url="${b.url}">
            ${b.label}
          </button>
        `;
      }).join('');

      content = `
        <div class="page-header">Available Now</div>
        <h3 class="page-title">${page.title || 'Get Your Copy'}</h3>

        <div class="book-info">
          <div class="book-cover-small">
            <img src="${page.coverSmall}" alt="${page.bookTitle} cover" onerror="this.src='assets/placeholder.svg'">
          </div>

          <div class="book-details">
            <h4>${page.bookTitle || ''}</h4>
            <p class="book-genre">${page.genre || ''}</p>
            <p class="book-pages-count">${page.pagesCount || ''}</p>

            <div class="book-purchase-buttons">
              ${buttonsHtml}
            </div>
          </div>
        </div>
      `;
      break;
    }

    case 'image':
      content = `
        <div class="page-header">${page.caption || 'Gallery'}</div>
        <div class="page-image">
          <img src="${page.image}" alt="${page.caption || 'Book artwork'}" onerror="this.src='assets/placeholder.svg'">
        </div>
      `;
      break;

    case 'about':
      content = `
        <div class="page-header">${page.releaseDate || ''}</div>
        <h3 class="page-title">${page.title || ''}</h3>
        <p class="page-text">${(page.content || '').replace(/\n\n/g, '</p><p class="page-text">')}</p>
      `;
      break;

    default:
      content = '<p class="page-text">Page content</p>';
  }

  return `
  <div class="book-page ${pageClass}">
    <div class="page-body">
      ${content}
    </div>
    <div class="page-number" data-page="${pageNum}" aria-hidden="true"></div>
  </div>
`;

}

function updateNavigation() {
  const prevBtn = document.getElementById('book-prev');
  const nextBtn = document.getElementById('book-next');
  const dotsContainer = document.querySelector('.book-nav-dots');

  if (prevBtn) prevBtn.disabled = currentSpread === 0;
  if (nextBtn) nextBtn.disabled = currentSpread >= totalSpreads - 1;

  if (dotsContainer) {
    let dotsHtml = '';
    for (let i = 0; i < totalSpreads; i++) {
      dotsHtml += `<span class="book-nav-dot ${i === currentSpread ? 'active' : ''}"></span>`;
    }
    dotsContainer.innerHTML = dotsHtml;
  }
}

let resizeTimeout;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function() {
    if (currentBook) {
      const isMobile = window.innerWidth < 768;
      totalSpreads = isMobile
        ? currentBook.pages.length
        : Math.ceil(currentBook.pages.length / 2);

      currentSpread = Math.min(currentSpread, totalSpreads - 1);
      renderSpread();
      updateNavigation();
    }
  }, 250);
});

/* =========================================================
   SHOP / BASKET / CHECKOUT (LocalStorage Cart)
   - Works with Lovable's shop.html / basket.html / checkout.html
   - Safe to paste at the bottom of your existing script.js
   ========================================================= */

(() => {
  "use strict";

  const CART_KEY = "wl_cart_v1";

  // ---------- helpers ----------
  const moneyToNumber = (text) => {
    // "£24.99" -> 24.99
    const n = Number(String(text || "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const formatGBP = (amount) => {
    const n = Number(amount);
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
      Number.isFinite(n) ? n : 0
    );
  };

  const clampInt = (val, min, max) => {
    const n = parseInt(val, 10);
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
  };

  const normalizeStock = (value) => {
    const raw = value === null || value === undefined ? "" : value;
    const n = Number.parseInt(String(raw), 10);
    return Number.isFinite(n) && n >= 0 ? n : null;
  };

  const loadCart = () => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") return { items: {} };
      if (!parsed.items || typeof parsed.items !== "object") return { items: {} };
      return parsed;
    } catch {
      return { items: {} };
    }
  };

  const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
  };

  const getCartCount = (cart) =>
    Object.values(cart.items || {}).reduce((sum, item) => sum + (item.qty || 0), 0);

  const getCartSubtotal = (cart) =>
    Object.values(cart.items || {}).reduce((sum, item) => sum + (item.qty || 0) * (item.price || 0), 0);

  const updateBasketBadge = () => {
    const el = document.getElementById("basket-count");
    if (!el) return;
    const cart = loadCart();
    const count = getCartCount(cart);
    el.textContent = String(count);
    el.style.display = count > 0 ? "inline-flex" : "none";
  };

  const toast = (msg) => {
    // Minimal toast without CSS dependency; safe fallback is alert.
    // You can replace later with a styled toast component.
    try {
      const t = document.createElement("div");
      t.textContent = msg;
      t.style.position = "fixed";
      t.style.left = "50%";
      t.style.bottom = "18px";
      t.style.transform = "translateX(-50%)";
      t.style.padding = "10px 12px";
      t.style.borderRadius = "10px";
      t.style.background = "rgba(0,0,0,0.85)";
      t.style.color = "#fff";
      t.style.fontSize = "14px";
      t.style.zIndex = "9999";
      t.style.maxWidth = "90vw";
      t.style.textAlign = "center";
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 1400);
    } catch {
      alert(msg);
    }
  };

  // ---------- cart ops ----------
  const addToCart = (product) => {
    if (!product || !product.id) return;

    const cart = loadCart();
    const existing = cart.items[product.id];
    const incomingStock = normalizeStock(product.stock);
    const existingStock = existing ? normalizeStock(existing.stock) : null;
    const effectiveStock = incomingStock !== null ? incomingStock : existingStock;
    let added = false;

    if (effectiveStock !== null && effectiveStock <= 0) {
      toast("Out of stock.");
      return;
    }

    if (existing) {
      const nextQty = (existing.qty || 0) + 1;
      const maxQty = effectiveStock !== null ? Math.min(999, effectiveStock) : 999;
      if (effectiveStock !== null && nextQty > effectiveStock) {
        toast(`Only ${effectiveStock} left in stock.`);
      } else {
        existing.qty = clampInt(nextQty, 1, maxQty);
        added = true;
      }
      if (!existing.stripePriceId && product.stripePriceId) {
        existing.stripePriceId = product.stripePriceId;
      }
      if (incomingStock !== null) {
        existing.stock = incomingStock;
      }
    } else {
      cart.items[product.id] = {
        id: product.id,
        name: product.name || "Item",
        price: Number(product.price) || 0,
        image: product.image || "",
        stripePriceId: product.stripePriceId || "",
        qty: 1,
        stock: incomingStock
      };
      added = true;
    }

    saveCart(cart);
    updateBasketBadge();
    if (added) {
      toast("Added to basket");
    }
  };

  const setQty = (id, qty) => {
    const cart = loadCart();
    if (!cart.items[id]) return;
    const stock = normalizeStock(cart.items[id].stock);
    const maxQty = stock !== null ? Math.min(999, stock) : 999;
    const newQty = clampInt(qty, 0, maxQty);
    if (stock !== null && qty > stock) {
      toast(`Only ${stock} left in stock.`);
    }
    if (newQty <= 0) {
      delete cart.items[id];
    } else {
      cart.items[id].qty = newQty;
    }
    saveCart(cart);
    updateBasketBadge();
  };

  const removeItem = (id) => {
    const cart = loadCart();
    if (!cart.items[id]) return;
    delete cart.items[id];
    saveCart(cart);
    updateBasketBadge();
  };

  // ---------- SHOP page wiring ----------
  const initShop = () => {
    const buttons = document.querySelectorAll(".btn-add-to-basket[data-product-id]");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const id = btn.getAttribute("data-product-id");
        const card = btn.closest(".product-card");
        if (!id || !card) return;

        const name = card.querySelector(".product-card-name")?.textContent?.trim() || "Item";
        const priceText = card.querySelector(".product-card-price")?.textContent || "£0.00";
        const price = moneyToNumber(priceText);

        const imgEl = card.querySelector(".product-card-image img");
        const image = imgEl?.getAttribute("src") || "";
        const stripePriceId = btn.getAttribute("data-stripe-price-id") || "";
        const stock = btn.getAttribute("data-stock");

        addToCart({ id, name, price, image, stripePriceId, stock });
      });
    });
  };

  // ---------- BASKET page rendering ----------
  const renderBasket = () => {
    const itemsRoot = document.getElementById("basket-items");
    if (!itemsRoot) return;

    const emptyState = document.getElementById("basket-empty");

    // remove template .basket-item nodes (keep empty state node)
    itemsRoot.querySelectorAll(".basket-item").forEach((n) => n.remove());

    const cart = loadCart();
    const items = Object.values(cart.items || {});
    const subtotal = getCartSubtotal(cart);

    // Empty state
    if (!items.length) {
      if (emptyState) emptyState.style.display = "block";
      const subtotalEl = document.getElementById("basket-subtotal");
      const totalEl = document.getElementById("basket-total");
      if (subtotalEl) subtotalEl.textContent = formatGBP(0);
      if (totalEl) totalEl.textContent = formatGBP(0);
      return;
    }
    if (emptyState) emptyState.style.display = "none";

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "basket-item";
      row.setAttribute("data-product-id", item.id);

      row.innerHTML = `
        <div class="basket-item-image">
          <img src="${item.image || "assets/placeholder.svg"}" alt="Product thumbnail">
        </div>
        <div class="basket-item-details">
          <h4 class="basket-item-name"></h4>
          <p class="basket-item-price"></p>
        </div>
        <div class="basket-item-quantity">
          <button class="qty-btn qty-decrease" aria-label="Decrease quantity">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn qty-increase" aria-label="Increase quantity">+</button>
        </div>
        <div class="basket-item-subtotal">${formatGBP(item.qty * item.price)}</div>
        <button class="basket-item-remove" aria-label="Remove item">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      `;

      row.querySelector(".basket-item-name").textContent = item.name;
      row.querySelector(".basket-item-price").textContent = formatGBP(item.price);
      const stock = normalizeStock(item.stock);
      const increaseBtn = row.querySelector(".qty-btn.qty-increase");
      if (increaseBtn && stock !== null && item.qty >= stock) {
        increaseBtn.disabled = true;
        increaseBtn.title = "No more stock available";
      }

      itemsRoot.insertBefore(row, emptyState || null);
    });

    const subtotalEl = document.getElementById("basket-subtotal");
    const totalEl = document.getElementById("basket-total");
    if (subtotalEl) subtotalEl.textContent = formatGBP(subtotal);
    if (totalEl) totalEl.textContent = formatGBP(subtotal); // shipping shown as "calculated at checkout"
  };

  const initBasketInteractions = () => {
    const itemsRoot = document.getElementById("basket-items");
    if (!itemsRoot) return;

    itemsRoot.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;

      const row = target.closest(".basket-item");
      if (!row) return;

      const id = row.getAttribute("data-product-id");
      if (!id) return;

      const cart = loadCart();
      const item = cart.items[id];
      if (!item) return;

      if (target.classList.contains("qty-increase")) {
        setQty(id, (item.qty || 0) + 1);
        renderBasket();
      }

      if (target.classList.contains("qty-decrease")) {
        setQty(id, (item.qty || 0) - 1);
        renderBasket();
      }

      if (target.classList.contains("basket-item-remove")) {
        removeItem(id);
        renderBasket();
      }
    });
  };

  // ---------- CHECKOUT summary rendering ----------
  const renderCheckoutSummary = () => {
    const itemsRoot = document.getElementById("checkout-items");
    if (!itemsRoot) return;

    const cart = loadCart();
    const items = Object.values(cart.items || {});
    const subtotal = getCartSubtotal(cart);

    // Replace template summary items
    itemsRoot.innerHTML = "";

    if (!items.length) {
      itemsRoot.innerHTML = `<p style="opacity:.8">Your basket is empty. <a href="shop.html">Go to shop</a>.</p>`;
      const subtotalEl = document.getElementById("checkout-subtotal");
      const shippingEl = document.getElementById("checkout-shipping");
      const totalEl = document.getElementById("checkout-total");
      if (subtotalEl) subtotalEl.textContent = formatGBP(0);
      if (shippingEl) shippingEl.textContent = formatGBP(0);
      if (totalEl) totalEl.textContent = formatGBP(0);
      return;
    }

    items.forEach((item) => {
      const line = document.createElement("div");
      line.className = "checkout-summary-item";
      line.innerHTML = `
        <span class="checkout-summary-item-name"></span>
        <span class="checkout-summary-item-qty">× ${item.qty}</span>
        <span class="checkout-summary-item-price">${formatGBP(item.qty * item.price)}</span>
      `;
      line.querySelector(".checkout-summary-item-name").textContent = item.name;
      itemsRoot.appendChild(line);
    });

    // Basic shipping placeholder (match your template £4.99 for now)
    const subtotalEl = document.getElementById("checkout-subtotal");
    const shippingEl = document.getElementById("checkout-shipping");
    const totalEl = document.getElementById("checkout-total");

    if (subtotalEl) subtotalEl.textContent = formatGBP(subtotal);
    if (shippingEl) shippingEl.textContent = "Calculated at payment";
    if (totalEl) totalEl.textContent = formatGBP(subtotal);
  };

  const initCheckoutSubmit = () => {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "1") {
      clearCart();
      updateBasketBadge();
      renderCheckoutSummary();
      toast("Payment successful. Thank you for your order.");
      window.history.replaceState({}, "", "checkout.html");
    } else if (params.get("canceled") === "1") {
      toast("Payment canceled. Your basket is unchanged.");
      window.history.replaceState({}, "", "checkout.html");
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const cart = loadCart();
      const items = Object.values(cart.items || {});
      if (!items.length) {
        toast("Your basket is empty.");
        return;
      }

      const missingPriceIds = items.filter((item) => !item.stripePriceId);
      if (missingPriceIds.length) {
        toast("Some products are missing Stripe price IDs.");
        return;
      }

      const submitBtn = form.querySelector(".checkout-submit-btn");
      const defaultSubmitText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Redirecting...";
      }

      const formData = new FormData(form);
      const customer = {
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        firstName: String(formData.get("first_name") || "").trim(),
        lastName: String(formData.get("last_name") || "").trim(),
        address1: String(formData.get("address_line_1") || "").trim(),
        address2: String(formData.get("address_line_2") || "").trim(),
        city: String(formData.get("city") || "").trim(),
        postcode: String(formData.get("postcode") || "").trim(),
        country: String(formData.get("country") || "").trim()
      };

      const payload = {
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.qty,
          stripePriceId: item.stripePriceId
        })),
        customer
      };

      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          let message = "Unable to start Stripe checkout.";
          try {
            const body = await res.json();
            if (body && body.error) message = body.error;
          } catch {}
          throw new Error(message);
        }

        const body = await res.json();
        if (!body || !body.url) {
          throw new Error("Stripe did not return a checkout URL.");
        }

        window.location.href = body.url;
      } catch (err) {
        console.error(err);
        toast(err.message || "Unable to start Stripe checkout.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = defaultSubmitText || "Continue to Secure Payment";
        }
      }
    });
  };
/* =========================================================
   STRIPE -> SHOP PRODUCTS (via Netlify function)
   ========================================================= */

async function fetchProductsFromStripe() {
  const res = await fetch("/api/list-products", { cache: "no-store" });
  if (!res.ok) {
    let message = "Could not load products from Stripe.";
    try {
      const body = await res.json();
      if (body && body.error) message = body.error;
    } catch {}
    throw new Error(message);
  }

  const body = await res.json();
  const products = Array.isArray(body.products) ? body.products : [];
  return products.filter((p) => p && p.id && p.name && p.stripePriceId);
}

  async function renderShopFromStripe() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

  grid.innerHTML = `<p style="opacity:.8">Loading products...</p>`;

  try {
    const products = await fetchProductsFromStripe();

    if (!products.length) {
      grid.innerHTML = `<p style="opacity:.8">No products available right now.</p>`;
      return;
    }

    grid.innerHTML = "";

    for (const p of products) {
      const stock = normalizeStock(p.stock);
      const outOfStock = stock !== null && stock <= 0;
      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute("data-product-id", p.id);

      card.innerHTML = `
        <div class="product-card-image">
          <img src="${escapeAttr(p.image || "assets/placeholder.svg")}" alt="${escapeAttr(p.name)}">
          ${p.badge ? `<span class="product-badge">${escapeHtml(p.badge)}</span>` : ""}
        </div>

        <div class="product-card-body">
          <h3 class="product-card-name">${escapeHtml(p.name)}</h3>
          <p class="product-card-description">${escapeHtml(p.description || "")}</p>

          <div class="product-card-footer">
            <span class="product-card-price">${formatGBP(p.price)}</span>
            <button
              class="btn btn-primary btn-add-to-basket"
              data-product-id="${escapeAttr(p.id)}"
              data-stripe-price-id="${escapeAttr(p.stripePriceId)}"
              data-stock="${stock !== null ? stock : ""}"
              ${outOfStock ? "disabled" : ""}
            >
              ${outOfStock ? "Out of Stock" : "Add to Basket"}
            </button>
          </div>
        </div>
      `;

      grid.appendChild(card);
    }

    initShop();
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p style="opacity:.8">Could not load products. Check Stripe keys and Netlify functions.</p>`;
  }
}
// Tiny escaping helpers (prevent HTML injection)
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/`/g, "&#096;");
}

  // ---------- boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    updateBasketBadge();     // always update badge on any page
    renderShopFromStripe();
    renderBasket();          // only runs if basket elements exist
    initBasketInteractions();// only runs on basket page
    renderCheckoutSummary(); // only runs if checkout elements exist
    initCheckoutSubmit();    // only runs on checkout page
  });
})();

/* =====================================================
   CONTACT FORM
   ===================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formContainer = document.querySelector('.contact-form');
  const successMessage = document.getElementById('contact-success');

  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const isFormspree = (form.getAttribute('action') || '').includes('formspree.io');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Simple validation
    const name = (form.querySelector('[name="name"]')?.value || '').trim();
    const email = (form.querySelector('[name="email"]')?.value || '').trim();
    const message = (form.querySelector('[name="message"]')?.value || '').trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!isFormspree) {
      if (formContainer && successMessage) {
        formContainer.innerHTML = successMessage.innerHTML;
      }
      return;
    }

    const formData = new FormData(form);
    const defaultSubmitText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (!res.ok) {
        throw new Error('Unable to send message. Please try again.');
      }

      if (formContainer && successMessage) {
        formContainer.innerHTML = successMessage.innerHTML;
      }

      form.reset();
    } catch (err) {
      alert(err.message || 'Unable to send message. Please try again.');
    } finally {
      if (submitBtn && document.body.contains(submitBtn)) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultSubmitText || 'Send Message';
      }
    }
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = newsletterForm.querySelector('[name="email"]').value;
      
      if (!email) {
        alert('Please enter your email address.');
        return;
      }

      alert('Thank you for subscribing!');
      newsletterForm.reset();
    });
  }
}

/* =====================================================
   CLOUDFLARE ZARAZ TRACKING
   ===================================================== */
(function initZarazTracking() {
  function track(eventName, props) {
    try {
      if (window.zaraz && typeof zaraz.track === "function") {
        zaraz.track(eventName, props);
      }
    } catch (err) {
      console.warn("Zaraz track failed", err);
    }
  }

  function getZarazDataProps(el) {
    const props = {};
    const dataset = el && el.dataset ? el.dataset : {};

    Object.entries(dataset).forEach(([key, value]) => {
      if (!key.startsWith("zaraz") || key === "zarazEvent") return;
      const raw = key.slice(5); // remove "zaraz"
      if (!raw) return;
      const propName = raw.charAt(0).toLowerCase() + raw.slice(1);
      props[propName] = value;
    });

    return props;
  }

  function getFilenameFromHref(href) {
    if (!href) return "";
    const clean = href.split("#")[0].split("?")[0];
    const parts = clean.split("/");
    return decodeURIComponent(parts[parts.length - 1] || "");
  }

  function getFileTypeFromHref(href) {
    const match = String(href || "").match(/\.([a-z0-9]+)(\?|#|$)/i);
    return match ? match[1].toLowerCase() : "";
  }

  document.addEventListener("click", function (e) {
    const el = e.target.closest("a[href], [data-zaraz-event]");
    if (!el) return;

    const href = el.getAttribute("href") || "";
    const page = window.location.pathname;
    const linkText = (el.textContent || "").trim().slice(0, 120);

    // Track downloads of EPUB/PDF
    const isDownload = /\.(epub|pdf)(\?|#|$)/i.test(href);
    if (isDownload) {
      track("file_download", {
        filename: getFilenameFromHref(href),
        category: "ebook",
        page,
        href,
        filetype: getFileTypeFromHref(href),
        link_text: linkText
      });
    }

    // Track any element with data-zaraz-event
    const customEvent = el.getAttribute("data-zaraz-event");
    if (customEvent) {
      const props = getZarazDataProps(el);
      if (!("page" in props)) props.page = page;
      if (!("href" in props) && href) props.href = href;
      if (!("link_text" in props) && linkText) props.link_text = linkText;
      track(customEvent, props);
    }
  });
})();



