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
        coverSmall: 'assets/book1-cover.jpg',
        bookTitle: 'Gone Before The Moon',
        genre: 'Supernatural Thriller / Sci-Fi',
        pagesCount: '249 pages',
        buttons: [
          { label: 'Buy on Amazon', className: 'btn btn-amazon', url: 'PASTE AMAZON LINK' },
          { label: 'TikTok Shop', className: 'btn btn-tiktok', url: 'PASTE TIKTOK LINK' }
        ]
      }
    ]
  },

  // Keep your other book(s) as-is (optional)
  'maw': {
    title: 'Into the Maw',
    pages: [
      { type: 'cover', image: 'assets/books/maw-cover.jpg', title: 'Into the Maw' },
      { type: 'excerpt', title: 'The Descent', content: '...' },
      { type: 'image', image: 'assets/concept-art/maw-scene.jpg', caption: 'The cave entrance' },
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


/* =====================================================
   CONTACT FORM
   ===================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formContainer = document.querySelector('.contact-form');
  const successMessage = document.getElementById('contact-success');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Show success message
    if (formContainer && successMessage) {
      formContainer.innerHTML = successMessage.innerHTML;
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
