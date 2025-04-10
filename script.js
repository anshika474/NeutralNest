// Mobile Navigation
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Project Data (would normally come from an API)
const projects = [
    {
        id: 1,
        title: "Amazon Reforestation",
        location: "Brazil",
        type: "reforestation",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        co2Offset: 5000,
        progress: 65,
        price: 15.99,
        description: "Help restore the Amazon rainforest by supporting local communities in planting native tree species."
    },
    {
        id: 2,
        title: "Wind Farm Project",
        location: "India",
        type: "renewable",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        co2Offset: 12000,
        progress: 85,
        price: 12.50,
        description: "Support the development of clean wind energy to replace coal-fired power plants."
    },
    {
        id: 3,
        title: "Clean Cookstoves",
        location: "Kenya",
        type: "cookstoves",
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        co2Offset: 7500,
        progress: 45,
        price: 9.99,
        description: "Provide efficient cookstoves to reduce deforestation and improve health in rural communities."
    }
];

// Render Projects
function renderProjects(filteredProjects = projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${project.location}</span>
                </div>
                <div class="project-stats">
                    <div class="stat-item">
                        <div class="stat-value">${project.co2Offset.toLocaleString()}</div>
                        <div class="stat-label">Tons CO₂</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${project.progress}%</div>
                        <div class="stat-label">Funded</div>
                    </div>
                </div>
                <div class="project-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                    <div class="progress-text">
                        <span>0%</span>
                        <span>100%</span>
                    </div>
                </div>
                <div class="project-price">
                    $${project.price} per ton
                </div>
                <div class="project-actions">
                    <button class="btn-secondary">Learn More</button>
                    <button class="btn-primary">Invest Now</button>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Filter Projects
document.querySelector('.btn-filter').addEventListener('click', function() {
    const typeFilter = document.getElementById('project-type').value;
    const locationFilter = document.getElementById('location').value;
    
    const filtered = projects.filter(project => {
        return (typeFilter === 'all' || project.type === typeFilter) && 
               (locationFilter === 'all' || project.location.toLowerCase() === locationFilter);
    });
    
    renderProjects(filtered);
});

// Calculator Navigation
const steps = document.querySelectorAll('.step');
const formSteps = document.querySelectorAll('.form-step');

steps.forEach(step => {
    step.addEventListener('click', function() {
        const stepNumber = this.getAttribute('data-step');
        
        // Update step indicators
        steps.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding form step
        formSteps.forEach(step => step.classList.remove('active'));
        document.querySelector(`.step-${stepNumber}`).classList.add('active');
    });
});

// Next Step Button
document.querySelector('.next-step').addEventListener('click', function() {
    const currentStep = document.querySelector('.step.active');
    const nextStep = currentStep.nextElementSibling;
    
    if (nextStep) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        
        const currentFormStep = document.querySelector('.form-step.active');
        const nextFormStep = currentFormStep.nextElementSibling;
        
        currentFormStep.classList.remove('active');
        nextFormStep.classList.add('active');
    }
});

// Animate Impact Stats
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            stat.textContent = Math.floor(current);
            
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, 16);
    });
}

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    // In a real app, you would send this to your backend
    alert(`Thanks for subscribing with ${email}! We'll keep you updated.`);
    this.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    
    // Animate stats when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.impact'));
});