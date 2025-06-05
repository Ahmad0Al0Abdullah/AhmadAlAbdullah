// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Page Navigation Elements
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroBtnSkills = document.querySelector('.hero-btn-skills');
    const heroBtnContact = document.querySelector('.hero-btn-contact');

    // Mobile Warning Banner Elements
    const mobileWarningBanner = document.getElementById('mobile-warning-banner');
    const closeWarningBtn = document.getElementById('close-warning-btn');
    const warningDismissedKey = 'mobileWarningDismissed_AhmadIT'; // Unique key for localStorage

    // Function to check if warning was dismissed previously
    function wasWarningDismissed() {
        try {
            return localStorage.getItem(warningDismissedKey) === 'true';
        } catch (e) {
            // localStorage might be disabled (e.g., private browsing)
            console.warn('localStorage access denied. Mobile warning may reappear.');
            return false;
        }
    }

    // Function to show the warning
    function showMobileWarning() {
        if (mobileWarningBanner) {
            mobileWarningBanner.classList.add('show-warning');
            // Optional: Add a class to body to adjust padding if needed
            // document.body.classList.add('mobile-warning-active');
        }
    }

    // Function to hide the warning and remember dismissal
    function hideMobileWarning() {
        if (mobileWarningBanner) {
            mobileWarningBanner.classList.remove('show-warning');
            // document.body.classList.remove('mobile-warning-active');
        }
        try {
            localStorage.setItem(warningDismissedKey, 'true');
        } catch (e) {
            // localStorage might be disabled
        }
    }

    // Check screen width to determine if it's likely a mobile device and if warning was dismissed
    if (window.innerWidth < 768 && !wasWarningDismissed()) {
        showMobileWarning();
    }

    // Add event listener for the close button on the warning banner
    if (closeWarningBtn) {
        closeWarningBtn.addEventListener('click', hideMobileWarning);
    }

    // Function to show a page and update active links
    function showPage(pageId, clickedLinkElement) {
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update active link in the navigation
        navLinks.forEach(link => link.classList.remove('active-link'));
        
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
        if (correspondingNavLink) {
            correspondingNavLink.classList.add('active-link');
        }
        
        // If mobile menu is open, close it
        const mainNavUl = document.getElementById('main-nav').querySelector('ul');
        if (mainNavUl && mainNavUl.classList.contains('show')) {
            mainNavUl.classList.remove('show');
        }

        // --- Removed explicit window.scrollTo(0,0) ---
        // Let the browser's default anchor scrolling (modified by CSS scroll-margin-top) handle the scroll position.
        // If the pageId is the target of an anchor link click, the browser will scroll to it.
        // If not (e.g., initial page load without a hash), no specific scroll is forced here,
        // which is usually fine as the page loads at the top.
    }

    // Add click listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // We don't need to preventDefault if the href is an anchor 
            // and we want the browser's native scroll behavior (modified by CSS)
            // e.preventDefault(); 
            const pageId = link.getAttribute('href').substring(1);
            showPage(pageId, link); 
        });
    });

    // Add click listeners to Hero Section buttons
    if (heroBtnSkills) {
        heroBtnSkills.addEventListener('click', (e) => {
            // e.preventDefault();
            const pageId = heroBtnSkills.getAttribute('href').substring(1);
            const targetNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
            showPage(pageId, targetNavLink);
            // Manually trigger scroll for buttons if not handled by href alone after JS page switch
            document.getElementById(pageId)?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (heroBtnContact) {
        heroBtnContact.addEventListener('click', (e) => {
            // e.preventDefault();
            const pageId = heroBtnContact.getAttribute('href').substring(1);
            const targetNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
            showPage(pageId, targetNavLink);
            // Manually trigger scroll for buttons if not handled by href alone after JS page switch
            document.getElementById(pageId)?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavUl = document.getElementById('main-nav').querySelector('ul');

    if (mobileMenuToggle && mainNavUl) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('show');
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Initialize: Show page based on URL hash or default to 'home'
    // Also, handle initial scroll if a hash is present
    function initializePage() {
        const initialPageId = window.location.hash ? window.location.hash.substring(1) : 'home';
        const initialLinkElement = document.querySelector(`.nav-link[href="#${initialPageId}"]`);
        showPage(initialPageId, initialLinkElement);

        // If there's a hash in the URL on initial load, try to scroll to it respecting the offset
        if (window.location.hash && document.getElementById(initialPageId)) {
            // Small timeout to ensure the page structure is fully ready for scrollIntoView
            setTimeout(() => {
                document.getElementById(initialPageId).scrollIntoView({ behavior: 'auto' }); // 'auto' for initial load
            }, 0);
        }
    }
    initializePage();

});
