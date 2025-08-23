// Initialize all components when DOM is ready
async function init() {
    await loadContent();
    setCurrentYear();
    initScrollReveal();
    initSmoothAccordions();
    initBoids();
    initInfoModal();
    initRippleEffect();
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Load content from JSON and populate the page
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        populatePage(data);
    } catch (error) {
        console.error('Failed to load content:', error);
    }
}

// Populate page with content from JSON
function populatePage(data) {
    // Profile section
    document.getElementById('profile-name').textContent = data.profile.name;
    document.getElementById('profile-title').textContent = `${data.profile.title} · ${data.profile.location}`;
    document.getElementById('profile-avatar').src = data.profile.avatar;
    document.getElementById('profile-avatar').alt = `Photo of ${data.profile.name}`;
    
    // Sections
    const sectionsContainer = document.getElementById('sections-container');
    sectionsContainer.innerHTML = data.sections.map(section => createSection(section)).join('');
    
    // Links
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = data.links.map(link => createLink(link)).join('');
    
    // Modal content
    populateModal(data.modal);
    
    // Copyright
    const copyrightEl = document.getElementById('copyright');
    if (copyrightEl) {
        copyrightEl.textContent = data.profile.copyright.replace('{year}', new Date().getFullYear());
    }
}

// Create section HTML
function createSection(section) {
    const iconSvg = createIcon(section.icon);
    const layout = section.layout || 'default';
    const itemsHtml = section.items.map(item => createSectionItem(item, layout)).join('');
    
    // Determine grid gap and text size based on layout
    const gridGap = layout === 'simple' ? '2' : '6';
    const textSize = layout === 'education' ? 'text-sm md:text-base' : '';
    
    return `
        <details class="group rounded-lg border border-transparent transition-all duration-200">
            <summary class="flex cursor-pointer list-none items-center justify-between px-6 py-4 rounded-lg">
                <h2 class="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-slate-700">
                    ${iconSvg}
                    ${section.title}
                </h2>
                <svg class="chevron h-5 w-5 text-slate-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
            </summary>
            <div class="smooth-toggle">
                <div class="inner grid gap-${gridGap} text-slate-600 ${textSize} reveal">
                    ${itemsHtml}
                </div>
            </div>
        </details>
    `;
}

// Create section item HTML based on layout type
function createSectionItem(item, layout) {
    // Dynamic item rendering based on available properties
    const parts = [];
    
    // Main content wrapper
    parts.push('<div>');
    
    // Handle different layout patterns
    if (layout === 'skills') {
        // Skills layout: title + description
        if (item.title) {
            parts.push(`<p class="font-semibold text-slate-800">${item.title}</p>`);
        }
        if (item.description) {
            parts.push(`<p class="text-sm text-slate-600 ${item.title ? 'mt-1' : ''}">${item.description}</p>`);
        }
    } else if (layout === 'simple') {
        // Simple layout: flexible content rendering
        if (item.title) {
            parts.push(`<p class="font-semibold text-slate-800">${item.title}</p>`);
        }
        if (item.description) {
            parts.push(`<p class="text-sm text-slate-600 ${item.title ? 'mt-1' : ''}">${item.description}</p>`);
        }
    } else {
        // Flexible layout: render any combination of content
        
        // Header section with title, date, and location
        const hasHeader = item.title || item.jobTitle || item.company || item.date || item.location;
        if (hasHeader) {
            parts.push('<div class="flex items-start justify-between gap-4">');
            
            if (item.jobTitle && item.company) {
                // Separate job title and company fields
                parts.push(`<p class="text-slate-800"><strong class="font-semibold">${item.jobTitle}</strong> - <em class="font-normal">${item.company}</em></p>`);
            } else if (item.title) {
                // Fallback to single title field
                parts.push(`<p class="font-semibold text-slate-800">${item.title}</p>`);
            } else if (item.jobTitle) {
                // Job title only
                parts.push(`<p class="font-normal italic text-slate-800">${item.jobTitle}</p>`);
            } else if (item.company) {
                // Company only
                parts.push(`<p class="font-semibold text-slate-800">${item.company}</p>`);
            }
            
            const metaParts = [];
            if (item.date) metaParts.push(item.date);
            if (item.location) metaParts.push(item.location);
            if (metaParts.length) {
                parts.push(`<p class="text-xs text-slate-500">${metaParts.join(' · ')}</p>`);
            }
            
            parts.push('</div>');
        }
        
        // Subtitle (for education or other sections that need it)
        if (item.subtitle) {
            parts.push(`<p class="${hasHeader ? 'mt-1' : ''} text-sm">${item.subtitle}</p>`);
        }
        
        // Description
        if (item.description) {
            const marginClass = (hasHeader || item.subtitle) ? 'mt-1' : '';
            parts.push(`<p class="${marginClass} text-sm">${item.description}</p>`);
        }
        
        // Bullets (only render if they exist)
        if (item.bullets && Array.isArray(item.bullets) && item.bullets.length > 0) {
            const marginClass = (hasHeader || item.subtitle || item.description) ? 'mt-2' : '';
            parts.push(`
                <ul class="${marginClass} list-disc pl-5 space-y-1 text-sm">
                    ${item.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
            `);
        }
    }
    
    parts.push('</div>');
    return parts.join('');
}

// Create link HTML
function createLink(link) {
    const iconSvg = createIcon(link.icon);
    return `
        <a class="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300 hover:bg-slate-100 transition-all duration-200" href="${link.url}" target="_blank" rel="noopener">
            ${iconSvg}
            <span>${link.title}</span>
        </a>
    `;
}

// Create dynamic SVG icon from JSON data
function createIcon(iconData) {
    if (!iconData) return '';
    
    // If it's a string (Hero icon name), render the Hero icon
    if (typeof iconData === 'string') {
        return getHeroIcon(iconData);
    }
    
    // If it's an object, it's a custom SVG (LinkedIn, GitHub, etc.)
    const attributes = [];
    
    // Always include viewBox
    if (iconData.viewBox) attributes.push(`viewBox="${iconData.viewBox}"`);
    
    // Add class if specified
    if (iconData.className) attributes.push(`class="${iconData.className}"`);
    
    // Build path attributes
    const pathAttributes = [];
    
    // Handle fill vs stroke
    if (iconData.fill) {
        attributes.push('fill="currentColor"');
        if (iconData.fillRule) pathAttributes.push(`fill-rule="${iconData.fillRule}"`);
        if (iconData.clipRule) pathAttributes.push(`clip-rule="${iconData.clipRule}"`);
    } else {
        attributes.push('fill="none"');
        attributes.push('stroke="currentColor"');
        if (iconData.strokeWidth) attributes.push(`stroke-width="${iconData.strokeWidth}"`);
        // Only add stroke attributes for non-filled icons
        pathAttributes.push('stroke-linecap="round"');
        pathAttributes.push('stroke-linejoin="round"');
    }
    
    // Build the complete SVG
    const pathAttrs = pathAttributes.length ? ' ' + pathAttributes.join(' ') : '';
    return `<svg ${attributes.join(' ')}><path${pathAttrs} d="${iconData.path}"/></svg>`;
}

// Get Hero icon by name
function getHeroIcon(iconName) {
    const heroIcons = {
        'beaker': 'M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
        'briefcase': 'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z',
        'academic-cap': 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
        'trophy': 'M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0',
        'book-open': 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
        'sparkles': 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.091 3.091zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z'
    };
    
    const path = heroIcons[iconName];
    if (!path) return '';
    
    return `<svg class="h-4 w-4 text-slate-700 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="${path}"/></svg>`;
}

// Populate modal content
function populateModal(modalData) {
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modalTitle) modalTitle.textContent = modalData.title;
    
    if (modalContent) {
        modalContent.innerHTML = `
            <p>${modalData.content.intro}</p>
            
            <div>
                <h4 class="font-semibold text-slate-800 mb-2">${modalData.content.algorithmTitle}</h4>
                <p>${modalData.content.algorithmIntro}</p>
                <ul class="list-disc list-inside mt-1 space-y-1 text-xs">
                    ${modalData.content.rules.map(rule => 
                        `<li><strong>${rule.name}:</strong> ${rule.description}</li>`
                    ).join('')}
                </ul>
            </div>

            <p>${modalData.content.conclusion}</p>
            
            <div class="pt-3 border-t border-slate-100">
                <p class="text-xs text-slate-500">
                    Learn more about AI and flocking algorithms: 
                    ${modalData.content.links.map(link => 
                        `<a href="${link.url}" target="_blank" rel="noopener" class="text-brand hover:text-emerald-700 underline">${link.text}</a>`
                    ).join(' • ')}
                </p>
            </div>
        `;
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Scroll reveal animation for elements
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-2');
        observer.observe(el);
    });
}

// Smooth accordion animations
function initSmoothAccordions() {
    const detailsNodes = document.querySelectorAll('details');
    
    detailsNodes.forEach(details => {
        const summary = details.querySelector(':scope > summary');
        const contentWrapper = details.querySelector(':scope > .smooth-toggle > .inner');
        if (!summary || !contentWrapper) return;

        // Set initial state
        if (details.hasAttribute('open')) {
            contentWrapper.style.height = 'auto';
            contentWrapper.style.opacity = '1';
            details.classList.add('is-open');
        } else {
            contentWrapper.style.height = '0px';
            contentWrapper.style.opacity = '0';
            details.classList.remove('is-open');
        }

        // Handle click events
        summary.addEventListener('click', e => {
            e.preventDefault();
            
            if (details.classList.contains('is-open')) {
                closeSection(details, contentWrapper);
            } else {
                // Close other sections
                detailsNodes.forEach(otherDetails => {
                    if (otherDetails !== details && otherDetails.classList.contains('is-open')) {
                        const otherWrapper = otherDetails.querySelector(':scope > .smooth-toggle > .inner');
                        if (otherWrapper) closeSection(otherDetails, otherWrapper);
                    }
                });
                openSection(details, contentWrapper);
            }
        });

        // Handle keyboard navigation
        summary.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                summary.click();
            }
        });
    });
}

// Open accordion section
function openSection(details, contentWrapper) {
    details.classList.add('is-open');
    details.setAttribute('open', '');
    contentWrapper.dataset.animating = 'opening';
    
    const height = getAutoHeight(contentWrapper);
    contentWrapper.style.height = '0px';
    contentWrapper.style.opacity = '1';
    
    requestAnimationFrame(() => {
        contentWrapper.style.height = height + 'px';
        contentWrapper.addEventListener('transitionend', function onEnd(e) {
            if (e.propertyName === 'height') {
                contentWrapper.style.height = 'auto';
                contentWrapper.dataset.animating = '';
                contentWrapper.removeEventListener('transitionend', onEnd);
            }
        });
    });
}

// Close accordion section
function closeSection(details, contentWrapper) {
    details.classList.remove('is-open');
    contentWrapper.dataset.animating = 'closing';
    
    const currentHeight = contentWrapper.style.height === 'auto' 
        ? getAutoHeight(contentWrapper) 
        : contentWrapper.getBoundingClientRect().height;
    
    contentWrapper.style.height = currentHeight + 'px';
    
    requestAnimationFrame(() => {
        contentWrapper.style.opacity = '0';
        contentWrapper.style.height = '0px';
        contentWrapper.addEventListener('transitionend', function onEnd(e) {
            if (e.propertyName === 'height') {
                details.removeAttribute('open');
                contentWrapper.dataset.animating = '';
                contentWrapper.removeEventListener('transitionend', onEnd);
            }
        });
    });
}

// Get natural height of element
function getAutoHeight(el) {
    const clone = el.cloneNode(true);
    clone.style.cssText = 'height:auto;opacity:1;position:absolute;visibility:hidden;pointer-events:none';
    el.parentNode.appendChild(clone);
    const height = clone.getBoundingClientRect().height;
    el.parentNode.removeChild(clone);
    return height;
}

// Boids flocking animation
function initBoids() {
    // Skip if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const canvas = document.getElementById('boids-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const boids = [];
    const largeBoids = [];
    
    // Configuration
    const config = {
        numBoids: 26,
        numLargeBoids: 11,
        splitInterval: 8000,
        largeSplitInterval: 12000,
        gridSize: 80, // Spatial partitioning grid cell size
        maxNeighbors: 12 // Limit neighbors for performance
    };
    
    let lastSplitTime = 0;
    let lastLargeSplitTime = 0;
    let grid = new Map(); // Spatial partitioning grid
    
    // Object pools for performance
    const vectorPool = [];
    
    // Performance monitoring
    let frameCount = 0;
    let lastFrameTime = 0;
    let currentFPS = 60;
    let targetFPS = 60;
    let animationPaused = false;
    
    // Device-specific optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    // Adjust settings for mobile/low-end devices
    if (isMobile || isLowEnd) {
        config.numBoids = Math.floor(config.numBoids * 0.6);
        config.numLargeBoids = Math.floor(config.numLargeBoids * 0.6);
        config.maxNeighbors = 8;
        targetFPS = 45;
    }
    
    // Resize canvas to window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        grid.clear();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Object pool for Vectors
    function getPooledVector(x = 0, y = 0) {
        const vector = vectorPool.pop() || new Vector();
        vector.x = x;
        vector.y = y;
        return vector;
    }
    
    function returnVector(vector) {
        if (vectorPool.length < 100) {
            vectorPool.push(vector);
        }
    }
    
    // Spatial partitioning functions
    function getGridKey(x, y) {
        const gx = Math.floor(x / config.gridSize);
        const gy = Math.floor(y / config.gridSize);
        return `${gx},${gy}`;
    }
    
    function updateSpatialGrid(allBoids) {
        grid.clear();
        
        for (let i = 0; i < allBoids.length; i++) {
            const boid = allBoids[i];
            const key = getGridKey(boid.position.x, boid.position.y);
            if (!grid.has(key)) {
                grid.set(key, []);
            }
            grid.get(key).push(boid);
        }
    }
    
    function getNearbyBoids(boid) {
        const neighbors = [];
        const gx = Math.floor(boid.position.x / config.gridSize);
        const gy = Math.floor(boid.position.y / config.gridSize);
        
        // Check 9 surrounding cells (3x3 grid)
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const key = `${gx + dx},${gy + dy}`;
                const cellBoids = grid.get(key);
                if (cellBoids) {
                    // Use concat for better performance than spread
                    for (let i = 0; i < cellBoids.length; i++) {
                        neighbors.push(cellBoids[i]);
                    }
                }
            }
        }
        
        return neighbors;
    }
    
    // Vector class for 2D physics (optimized)
    class Vector {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        
        add(v) { this.x += v.x; this.y += v.y; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; return this; }
        mult(n) { this.x *= n; this.y *= n; return this; }
        div(n) { this.x /= n; this.y /= n; return this; }
        mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }
        magSq() { return this.x * this.x + this.y * this.y; } // Faster than mag() for comparisons
        normalize() { const m = this.mag(); if (m > 0) this.div(m); return this; }
        limit(max) { const magSq = this.magSq(); if (magSq > max * max) { this.div(Math.sqrt(magSq)).mult(max); } return this; }
        dist(v) { const dx = this.x - v.x; const dy = this.y - v.y; return Math.sqrt(dx * dx + dy * dy); }
        distSq(v) { const dx = this.x - v.x; const dy = this.y - v.y; return dx * dx + dy * dy; } // Faster for comparisons
        
        set(x, y) { this.x = x; this.y = y; return this; }
        copy() { return new Vector(this.x, this.y); }
    }
    
    // Boid class
    class Boid {
        constructor(x, y, species = 'small') {
            this.position = new Vector(x, y);
            this.velocity = new Vector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);
            this.acceleration = new Vector(0, 0);
            this.species = species;
            this.maxSpeed = species === 'large' ? 0.9 : 0.9;
            this.maxForce = species === 'large' ? 0.02 : 0.015;
        }
        
        flock(nearbyBoids) {
            // Get neighbors once and reuse for all behaviors
            const neighbors = this.getNeighbors(nearbyBoids);
            
            const sep = this.separate(neighbors).mult(1.2);
            const ali = this.align(neighbors).mult(1.0);
            const coh = this.cohesion(neighbors).mult(1.0);
            
            this.acceleration.set(0, 0).add(sep).add(ali).add(coh);
            
            // Apply split force if present
            if (this.splitForce) {
                this.acceleration.add(this.splitForce);
                this.splitForce.mult(0.95);
                if (this.splitForce.magSq() < 0.0001) this.splitForce = null;
            }
        }
        
        getNeighbors(nearbyBoids) {
            const neighbors = [];
            let count = 0;
            
            for (let i = 0; i < nearbyBoids.length && count < config.maxNeighbors; i++) {
                const boid = nearbyBoids[i];
                if (boid === this || boid.species !== this.species) continue;
                
                const distSq = this.position.distSq(boid.position);
                if (distSq < 3600) { // 60 pixels squared
                    neighbors.push({ boid, distSq, dist: Math.sqrt(distSq) });
                    count++;
                }
            }
            
            return neighbors;
        }
        
        separate(neighbors) {
            const desiredSeparationSq = 400; // 20 squared
            const steer = getPooledVector(0, 0);
            let count = 0;
            
            for (const neighbor of neighbors) {
                if (neighbor.distSq < desiredSeparationSq) {
                    const diff = getPooledVector(this.position.x - neighbor.boid.position.x, this.position.y - neighbor.boid.position.y);
                    diff.normalize().div(neighbor.dist);
                    steer.add(diff);
                    returnVector(diff);
                    count++;
                }
            }
            
            if (count > 0) {
                steer.div(count).normalize().mult(this.maxSpeed);
                steer.sub(this.velocity).limit(this.maxForce);
            }
            
            const result = steer.copy();
            returnVector(steer);
            return result;
        }
        
        align(neighbors) {
            const sum = getPooledVector(0, 0);
            let count = 0;
            
            for (const neighbor of neighbors) {
                sum.add(neighbor.boid.velocity);
                count++;
            }
            
            if (count > 0) {
                sum.div(count).normalize().mult(this.maxSpeed);
                const steer = getPooledVector(sum.x, sum.y);
                steer.sub(this.velocity).limit(this.maxForce);
                const result = steer.copy();
                returnVector(steer);
                returnVector(sum);
                return result;
            }
            
            returnVector(sum);
            return getPooledVector(0, 0);
        }
        
        cohesion(neighbors) {
            const sum = getPooledVector(0, 0);
            let count = 0;
            
            for (const neighbor of neighbors) {
                sum.add(neighbor.boid.position);
                count++;
            }
            
            if (count > 0) {
                sum.div(count);
                const result = this.seek(sum);
                returnVector(sum);
                return result;
            }
            
            returnVector(sum);
            return getPooledVector(0, 0);
        }
        
        seek(target) {
            const desired = getPooledVector(target.x, target.y);
            desired.sub(this.position).normalize().mult(this.maxSpeed);
            const steer = getPooledVector(desired.x, desired.y);
            steer.sub(this.velocity).limit(this.maxForce);
            const result = steer.copy();
            returnVector(desired);
            returnVector(steer);
            return result;
        }
        
        update() {
            this.velocity.add(this.acceleration).limit(this.maxSpeed);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
            
            // Wrap around edges
            if (this.position.x < 0) this.position.x = canvas.width;
            if (this.position.x > canvas.width) this.position.x = 0;
            if (this.position.y < 0) this.position.y = canvas.height;
            if (this.position.y > canvas.height) this.position.y = 0;
        }
        
        draw() {
            const angle = Math.atan2(this.velocity.y, this.velocity.x);
            ctx.save();
            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(angle);
            
            // Shape is set by batch rendering, just draw the path
            ctx.beginPath();
            if (this.species === 'large') {
                ctx.moveTo(13.5, 0);
                ctx.lineTo(-6, -4.5);
                ctx.lineTo(-6, 4.5);
            } else {
                ctx.moveTo(6, 0);
                ctx.lineTo(-3, -2);
                ctx.lineTo(-3, 2);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Initialize boids
    for (let i = 0; i < config.numBoids; i++) {
        boids.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height, 'small'));
    }
    for (let i = 0; i < config.numLargeBoids; i++) {
        largeBoids.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height, 'large'));
    }
    
    // Split flocks periodically
    function splitFlocks(boidsArray, currentTime, lastTime, interval) {
        if (currentTime - lastTime < interval) return lastTime;
        
        // Calculate flock center
        let centerX = 0, centerY = 0;
        for (const boid of boidsArray) {
            centerX += boid.position.x;
            centerY += boid.position.y;
        }
        centerX /= boidsArray.length;
        centerY /= boidsArray.length;
        
        // Create split forces
        const splitAngle = Math.random() * Math.PI * 2;
        const force = boidsArray[0].species === 'large' ? 0.3 : 0.5;
        
        for (const boid of boidsArray) {
            const toCenter = new Vector(centerX - boid.position.x, centerY - boid.position.y);
            const cross = toCenter.x * Math.sin(splitAngle) - toCenter.y * Math.cos(splitAngle);
            const dir = cross > 0 ? 0 : Math.PI;
            boid.splitForce = new Vector(Math.cos(splitAngle + dir) * force, Math.sin(splitAngle + dir) * force);
        }
        
        return currentTime;
    }
    
    // Performance monitoring
    function updatePerformanceStats(currentTime) {
        frameCount++;
        if (currentTime - lastFrameTime >= 1000) {
            currentFPS = frameCount;
            frameCount = 0;
            lastFrameTime = currentTime;
            
            // Adaptive quality based on performance
            if (currentFPS < 45) {
                config.maxNeighbors = Math.max(6, config.maxNeighbors - 1);
                targetFPS = Math.max(30, targetFPS - 5);
            } else if (currentFPS > 55 && config.maxNeighbors < 12) {
                config.maxNeighbors = Math.min(12, config.maxNeighbors + 1);
                targetFPS = Math.min(60, targetFPS + 5);
            }
        }
    }
    
    // Animation loop with performance optimizations
    function animate(currentTime = 0) {
        // Pause animation when tab is not visible
        if (animationPaused) {
            requestAnimationFrame(animate);
            return;
        }
        
        // Skip frames if needed for performance
        const targetFrameTime = 1000 / targetFPS;
        if (currentTime - lastFrameTime < targetFrameTime) {
            requestAnimationFrame(animate);
            return;
        }
        
        updatePerformanceStats(currentTime);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Combine boids arrays once
        const allBoids = boids.concat(largeBoids);
        
        // Update spatial grid
        updateSpatialGrid(allBoids);
        
        // Handle splitting
        lastSplitTime = splitFlocks(boids, currentTime, lastSplitTime, config.splitInterval);
        lastLargeSplitTime = splitFlocks(largeBoids, currentTime, lastLargeSplitTime, config.largeSplitInterval);
        
        // Batch rendering by type for better performance
        const smallBoids = [];
        const largeBoids_render = [];
        
        // Update boids and separate by type
        for (let i = 0; i < allBoids.length; i++) {
            const boid = allBoids[i];
            const nearbyBoids = getNearbyBoids(boid);
            boid.flock(nearbyBoids);
            boid.update();
            
            if (boid.species === 'large') {
                largeBoids_render.push(boid);
            } else {
                smallBoids.push(boid);
            }
        }
        
        // Batch render small boids
        if (smallBoids.length > 0) {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
            for (let i = 0; i < smallBoids.length; i++) {
                smallBoids[i].draw();
            }
        }
        
        // Batch render large boids
        if (largeBoids_render.length > 0) {
            ctx.fillStyle = 'rgba(191, 219, 254, 0.35)';
            for (let i = 0; i < largeBoids_render.length; i++) {
                largeBoids_render[i].draw();
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Page Visibility API to pause animation when tab is not active
    document.addEventListener('visibilitychange', () => {
        animationPaused = document.hidden;
    });
    
    // Handle window focus/blur for older browsers
    window.addEventListener('focus', () => { animationPaused = false; });
    window.addEventListener('blur', () => { animationPaused = true; });
    
    animate();
}

// Info modal functionality
function initInfoModal() {
    const infoBtn = document.getElementById('info-btn');
    const infoModal = document.getElementById('info-modal');
    const closeBtn = document.getElementById('close-modal');
    
    if (!infoBtn || !infoModal || !closeBtn) return;
    
    const modalContent = infoModal.querySelector('div');
    
    function openModal() {
        infoModal.classList.remove('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }
    
    function closeModal() {
        infoModal.classList.add('opacity-0', 'pointer-events-none');
        modalContent.classList.add('scale-95');
        modalContent.classList.remove('scale-100');
    }
    
    // Event listeners
    infoBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    infoModal.addEventListener('click', e => {
        if (e.target === infoModal) closeModal();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !infoModal.classList.contains('opacity-0')) {
            closeModal();
        }
    });
}

// Ripple effect for section headers
function initRippleEffect() {
    document.querySelectorAll('details > summary').forEach(summary => {
        summary.addEventListener('click', e => {
            const rect = summary.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
            summary.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });
}