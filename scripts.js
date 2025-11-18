 // ======================================
        // DOM ELEMENTS
        // ======================================
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const navLinksAll = document.querySelectorAll('.nav-link');
        const pageSections = document.querySelectorAll('.page-section');
        const stickyBanner = document.querySelector('.sticky-banner');
        const backToHomeBtn = document.getElementById('backToHome');
        const heroVideo = document.getElementById('heroVideo');
        const videoFallback = document.getElementById('videoFallback');
        const logoLink = document.getElementById('logoLink');
       
        // ======================================
        // LOGO REDIRECT TO HOME
        // ======================================
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('home');
        });

        // ======================================
        // MOBILE MENU TOGGLE
        // ======================================
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // ======================================
        // PAGE NAVIGATION
        // ======================================
        function navigateToPage(pageId) {
            // Hide all page sections
            pageSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update active nav link
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Show/hide sticky banner and back button based on page
            if (pageId === 'home') {
                stickyBanner.style.display = 'none';
                backToHomeBtn.style.display = 'none';
            } else {
                stickyBanner.style.display = 'flex';
                backToHomeBtn.style.display = 'block';
            }
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        // ======================================
        // NAVIGATION EVENT LISTENERS
        // ======================================
        navLinksAll.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                navigateToPage(pageId);
            });
        });

        // Back to home button
        backToHomeBtn.addEventListener('click', () => {
            navigateToPage('home');
        });

        // ======================================
        // CASSETTE TAPE FILTERING
        // ======================================
        function filterContent(category) {
            const tracks = document.querySelectorAll('.cassette-track');
            const buttons = document.querySelectorAll('.cassette-button');
            
            // Update active button
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Show/hide tracks based on category
            tracks.forEach(track => {
                if (category === 'all' || track.classList.contains(`${category}-content`)) {
                    track.style.display = 'flex';
                } else {
                    track.style.display = 'none';
                }
            });
            
            // Show/hide no content messages
            const noBlogMessage = document.getElementById('noBlogMessage');
            const noProjectsMessage = document.getElementById('noProjectsMessage');
            const noTalksMessage = document.getElementById('noTalksMessage');
            
            // Hide all messages first
            noBlogMessage.style.display = 'none';
            noProjectsMessage.style.display = 'none';
            noTalksMessage.style.display = 'none';
            
            // Show appropriate message if no content for selected category
            if (category === 'blog') {
                const blogTracks = document.querySelectorAll('.blog-content');
                const visibleBlogTracks = Array.from(blogTracks).filter(track => track.style.display !== 'none');
                if (visibleBlogTracks.length === 0) {
                    noBlogMessage.style.display = 'block';
                }
            } else if (category === 'projects') {
                const projectsTracks = document.querySelectorAll('.projects-content');
                const visibleProjectsTracks = Array.from(projectsTracks).filter(track => track.style.display !== 'none');
                if (visibleProjectsTracks.length === 0) {
                    noProjectsMessage.style.display = 'block';
                }
            } else if (category === 'talks') {
                const talksTracks = document.querySelectorAll('.talks-content');
                const visibleTalksTracks = Array.from(talksTracks).filter(track => track.style.display !== 'none');
                if (visibleTalksTracks.length === 0) {
                    noTalksMessage.style.display = 'block';
                }
            }
        }

        // ======================================
        // CONTENT PAGE NAVIGATION
        // ======================================
        function navigateToContentPage(contentType) {
            // Navigate to the content page
            navigateToPage(contentType);
        }

        // ======================================
        // VIDEO CONTROL REMOVAL
        // ======================================
        document.addEventListener('DOMContentLoaded', function() {
            const heroVideo = document.getElementById('heroVideo');
            
            if (heroVideo) {
                // Remove controls attribute completely
                heroVideo.removeAttribute('controls');
                heroVideo.controls = false;
                
                // Force hide any potential controls
                heroVideo.style.setProperty('--media-controls-display', 'none', 'important');
                
                // Ensure video plays automatically and loops
                heroVideo.play().catch(error => {
                    console.log('Video autoplay failed:', error);
                });
                
                // Prevent any right-click context menu
                heroVideo.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    return false;
                });
            }
        });

        // ======================================
        // VIDEO FALLBACK HANDLING
        // ======================================
        // Check if video can play
        if (heroVideo) {
            heroVideo.addEventListener('error', () => {
                // If video fails to load, show fallback
                if (videoFallback) {
                    videoFallback.style.display = 'flex';
                }
            });
        }

        // ======================================
        // INITIALIZATION
        // ======================================
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize the page
            navigateToPage('home');
            
            // Set up initial cassette filter
            filterContent('all');
            
            // Try to play the video
            if (heroVideo) {
                heroVideo.play().catch(error => {
                    console.log('Video autoplay prevented, showing fallback');
                    if (videoFallback) {
                        videoFallback.style.display = 'flex';
                    }
                });
            }
        });

