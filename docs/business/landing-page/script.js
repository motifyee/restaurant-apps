// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ROI Calculator
function updateROI() {
    const orders = parseInt(document.getElementById('orders').value) || 0;
    const avgOrder = parseInt(document.getElementById('avgOrder').value) || 0;

    // Calculate costs
    const deliveryCommission = 0.20; // 20%
    const deliveryCost = orders * avgOrder * deliveryCommission;
    const ourCost = 75; // Standard plan

    const savings = deliveryCost - ourCost;

    // Update display
    document.getElementById('savings').textContent = savings.toLocaleString() + ' EGP/month';
    document.getElementById('deliveryCost').textContent = deliveryCost.toLocaleString() + ' EGP';
}

// Add event listeners
document.getElementById('orders').addEventListener('input', updateROI);
document.getElementById('avgOrder').addEventListener('input', updateROI);

// Form submission
document.getElementById('pilotForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        owner: document.getElementById('owner').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        tables: document.getElementById('tables').value,
        location: document.getElementById('location').value
    };

    // Here you would typically send this to your backend
    // For now, just show a success message
    alert('Thank you for your interest! We\'ll contact you within 48 hours.');
    this.reset();

    // In production, you would do something like:
    // fetch('/api/pilot-signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.problem-card, .feature-card, .pricing-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle (if needed)
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
}

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

console.log('Landing page loaded successfully! 🚀');
