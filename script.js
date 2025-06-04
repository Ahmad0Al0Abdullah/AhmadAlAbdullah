// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Page Navigation Elements
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroBtnSkills = document.querySelector('.hero-btn-skills');
    const heroBtnContact = document.querySelector('.hero-btn-contact');

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
        
        // Find the actual navigation link corresponding to the pageId and activate it
        // This handles cases where the click might come from a non-nav-link button (like hero buttons)
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
        if (correspondingNavLink) {
            correspondingNavLink.classList.add('active-link');
        }
        
        // If mobile menu is open, close it
        const mainNavUl = document.getElementById('main-nav').querySelector('ul');
        if (mainNavUl.classList.contains('show')) {
            mainNavUl.classList.remove('show');
        }

        // Scroll to top of page content (or to the section itself if it's not the home page)
        if (pageId === 'home') {
            window.scrollTo(0, 0);
        } else if (targetPage) {
            // For other pages, we might want to scroll to the top of the main content area
            // or to the section itself. For single-page apps, scrolling to the section is typical.
            // The current setup with fixed header means scrolling to the section top is fine.
            // If sections were much shorter, you might adjust.
            // For now, default browser anchor behavior + JS page switching should be okay.
            // If specific scroll behavior is needed beyond default anchor, it can be added here.
            // The current `window.scrollTo(0,0)` will take user to top of document,
            // which is fine as the fixed header means the section starts below it.
             window.scrollTo(0, 0); // Or targetPage.offsetTop - headerHeight if more precise scroll needed
        }
    }

    // Add click listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // e.preventDefault(); // Prevent default anchor jump if you want full JS control
                               // But for this setup, default behavior is fine as href matches ID
            const pageId = link.getAttribute('href').substring(1);
            showPage(pageId, link); // 'link' is the clicked navigation link element
        });
    });

    // Add click listeners to Hero Section buttons
    if (heroBtnSkills) {
        heroBtnSkills.addEventListener('click', (e) => {
            // e.preventDefault();
            const pageId = heroBtnSkills.getAttribute('href').substring(1);
            // Pass the corresponding nav link for active state highlighting
            const targetNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
            showPage(pageId, targetNavLink);
        });
    }

    if (heroBtnContact) {
        heroBtnContact.addEventListener('click', (e) => {
            // e.preventDefault();
            const pageId = heroBtnContact.getAttribute('href').substring(1);
            // Pass the corresponding nav link for active state highlighting
            const targetNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
            showPage(pageId, targetNavLink);
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
    const initialPageId = window.location.hash ? window.location.hash.substring(1) : 'home';
    const initialLinkElement = document.querySelector(`.nav-link[href="#${initialPageId}"]`);
    // Ensure the function is called to display the initial page correctly
    showPage(initialPageId, initialLinkElement);
});
