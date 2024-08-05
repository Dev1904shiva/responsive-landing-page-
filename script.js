document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    const fields = [
        { id: 'name', validation: validateName, errorMessage: 'Name must be at least 2 characters long.' },
        { id: 'email', validation: validateEmail, errorMessage: 'Please enter a valid email address.' },
        { id: 'phone', validation: validatePhone, errorMessage: 'Please enter a valid phone number.' },
        { id: 'subject', validation: validateSubject, errorMessage: 'Subject must be at least 5 characters long.' },
        { id: 'message', validation: validateMessage, errorMessage: 'Message must be at least 10 characters long.' },
        { id: 'terms', validation: validateTerms, errorMessage: 'You must agree to the terms and conditions.' }
    ];

    fields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        const errorElement = document.getElementById(field.id + 'Error');
        inputElement.addEventListener('input', () => {
            const error = field.validation(inputElement.value);
            if (error) {
                errorElement.textContent = field.errorMessage;
            } else {
                errorElement.textContent = '';
            }
        });
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const errors = fields.reduce((acc, field) => {
            const inputElement = document.getElementById(field.id);
            const errorElement = document.getElementById(field.id + 'Error');
            const error = field.validation(inputElement.value);
            if (error) {
                errorElement.textContent = field.errorMessage;
                acc.push(field.errorMessage);
            } else {
                errorElement.textContent = '';
            }
            return acc;
        }, []);

        if (errors.length > 0) {
            formResponse.textContent = errors.join(' ');
            formResponse.style.color = 'red';
        } else {
            formResponse.textContent = 'Thank you for your message. We will get back to you soon.';
            formResponse.style.color = 'green';
            contactForm.reset();
        }
    });

    function validateName(name) {
        return name.length < 2;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^\+?[1-9]\d{1,14}$/; // E.164 international phone number format
        return !re.test(String(phone));
    }

    function validateSubject(subject) {
        return subject.length < 5;
    }

    function validateMessage(message) {
        return message.length < 10;
    }

    function validateTerms(terms) {
        return !terms;
    }
});
