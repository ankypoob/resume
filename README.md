# Resume Website

A beautiful, minimalist resume website ready to be hosted on GitHub Pages.

## 🚀 Quick Start

### Hosting on GitHub Pages

1. **Create a new repository on GitHub**
   - Go to [github.com](https://github.com) and create a new repository
   - Name it `yourusername.github.io` for a personal site, or any name for a project site

2. **Upload the files**
   ```bash
   cd resume-site
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click Save

4. **Visit your site**
   - Your site will be live at `https://yourusername.github.io`

## ✏️ Customization

### Update Your Information

Edit `index.html` to customize:

- **Name and Title**: Update the hero section with your name and job title
- **About Section**: Write your personal bio and update the stats
- **Experience**: Add your work history in the timeline
- **Skills**: Update the skill categories and proficiency levels
- **Education**: Add your educational background and certifications
- **Contact**: Update email, GitHub, and LinkedIn links

### Customize the Theme

Edit `styles.css` to modify:

```css
:root {
    --color-bg: #0a0a0b;           /* Background color */
    --color-accent: #e07c4c;       /* Accent color (orange) */
    --color-text: #f5f5f7;         /* Main text color */
    /* ... more variables */
}
```

### Color Scheme Ideas

**Ocean Blue:**
```css
--color-accent: #4c9ce0;
--color-accent-light: #7cb8f4;
```

**Emerald Green:**
```css
--color-accent: #4ce09c;
--color-accent-light: #7cf4bc;
```

**Purple Violet:**
```css
--color-accent: #9c4ce0;
--color-accent-light: #bc7cf4;
```

## 📁 File Structure

```
resume-site/
├── index.html      # Main HTML structure
├── styles.css      # All styling
├── script.js       # Animations & interactions
└── README.md       # This file
```

## 🎨 Features

- **Dark Mode Design**: Easy on the eyes with a sophisticated dark theme
- **Responsive**: Looks great on all devices
- **Smooth Animations**: Subtle scroll reveals and hover effects
- **Print Friendly**: Optimized for printing
- **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- **Fast Loading**: No external libraries or frameworks

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Feel free to use this template for your personal resume website.



