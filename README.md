# Hamsha N - Portfolio Website

A modern, unique, and fully responsive personal portfolio website with smooth animations and a premium UI/UX feel.

## Features

- 🎨 **Modern Design**: Dark theme with glassmorphism effects and neon highlights
- ✨ **Smooth Animations**: Framer Motion powered animations throughout
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 🚀 **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🎯 **SEO Friendly**: Proper meta tags and semantic HTML
- 💫 **Interactive Elements**: Hover effects, micro-interactions, and smooth scrolling

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── SocialLinks.jsx
│   └── Tools.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/Hero.jsx`
2. **About Section**: Edit `src/components/About.jsx`
3. **Social Links**: Update URLs in `src/components/SocialLinks.jsx` and `src/components/Footer.jsx`
4. **Contact Email**: Update email in `src/components/Contact.jsx`

### Add Your Photo

Replace the placeholder in `src/components/Hero.jsx` with your actual photo.

### Update Projects

Edit the projects array in `src/components/Projects.jsx` to add your project details, images, and demo links.

## Contact Form

The contact form currently uses a mailto link. For production, consider integrating with:
- EmailJS
- Formspree
- A custom backend API

## License

This project is open source and available under the MIT License.

