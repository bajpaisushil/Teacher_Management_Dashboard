# Teacher Management System

A modern, responsive teacher management interface built with Next.js, TypeScript, and Tailwind CSS with comprehensive theming support.

## 🚀 Features

- **Modern UI/UX**: Clean, contemporary design with smooth animations
- **Dark/Light Mode**: Complete theme system with system preference detection
- **Color Themes**: Multiple color schemes (Default, Blue, Green, Purple, Orange, Rose)
- **Theme Persistence**: Saves user preferences across sessions
- **Responsive Design**: Mobile-first approach that works on all devices
- **Teacher Management**: Complete CRUD operations for teacher data
- **Advanced Filtering**: Filter by department, status, and experience
- **Search Functionality**: Real-time search across teacher information
- **Multiple View Modes**: Grid and list view options
- **Profile Management**: Detailed teacher profiles with comprehensive information
- **Dashboard Analytics**: Statistics and insights about your teaching staff
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🎨 Theme System

### Theme Modes
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for low-light environments
- **System Mode**: Automatically follows your system preference

### Color Themes
- **Default**: Classic neutral colors
- **Blue**: Professional blue tones
- **Green**: Nature-inspired green palette
- **Purple**: Creative purple scheme
- **Orange**: Energetic orange theme
- **Rose**: Warm rose color palette

### Theme Customization
Access theme settings through the settings icon in the header:
1. Choose between Light, Dark, or System mode
2. Select from 6 different color themes
3. Reset to default settings anytime
4. All preferences are automatically saved

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Theme System**: next-themes
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/teacher-management-system.git
cd teacher-management-system
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx                 # Main dashboard page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── teacher-dashboard.tsx   # Main dashboard component
│   ├── teacher-card.tsx        # Teacher card component
│   ├── teacher-list.tsx        # Teacher list view
│   ├── add-teacher-dialog.tsx  # Add teacher form
│   ├── edit-teacher-dialog.tsx # Edit teacher form
│   ├── teacher-profile-dialog.tsx # Teacher profile view
│   ├── filter-dialog.tsx       # Filter options
│   └── dashboard-skeleton.tsx  # Loading skeleton
├── types/
│   └── teacher.ts              # TypeScript interfaces
└── data/
    └── mock-teachers.ts        # Sample data
\`\`\`

## 🎯 Key Features Explained

### Dashboard Overview
- Real-time statistics showing total teachers, active status, departments, and average experience
- Quick access to add new teachers
- Search and filter functionality

### Teacher Management
- **Add Teachers**: Comprehensive form with validation
- **Edit Teachers**: Update existing teacher information
- **Delete Teachers**: Remove teachers from the system
- **View Profiles**: Detailed teacher information display

### Responsive Design
- Mobile-first approach with breakpoints for tablet and desktop
- Touch-friendly interactions on mobile devices
- Optimized layouts for different screen sizes

### Search & Filtering
- Real-time search across name, email, and department
- Filter by department, status, and experience level
- Clear visual indicators for active filters

### Accessibility Features
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast colors and readable fonts

## 🎯 Theme Implementation

### CSS Variables
The theme system uses CSS custom properties for dynamic theming:

\`\`\`css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --secondary: 217.2 32.6% 17.5%;
  /* ... more variables */
}
\`\`\`

### Theme Provider Setup
\`\`\`tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

### Using Theme in Components
\`\`\`tsx
import { useTheme } from 'next-themes'

function MyComponent() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div className="bg-background text-foreground">
      Current theme: {theme}
    </div>
  )
}
\`\`\`

## 🔧 Customization

### Adding New Departments
Update the \`departments\` array in the dialog components:

\`\`\`typescript
const departments = [
  'Mathematics',
  'Science',
  'English',
  // Add your departments here
]
\`\`\`

### Adding New Subjects
Update the \`availableSubjects\` array:

\`\`\`typescript
const availableSubjects = [
  'Algebra',
  'Physics',
  // Add your subjects here
]
\`\`\`

### Styling Customization
The project uses Tailwind CSS. You can customize:
- Colors in \`tailwind.config.js\`
- Component styles in individual component files
- Global styles in \`globals.css\`

### Adding New Color Themes
1. Update the `colorThemes` array in `components/theme-settings.tsx`
2. Add corresponding CSS variables
3. Test in both light and dark modes

### Custom Theme Colors
\`\`\`tsx
const customTheme = {
  name: "Custom",
  value: "custom",
  primary: "hsl(200 100% 50%)",
  secondary: "hsl(200 20% 95%)",
}
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Main brand color, used for buttons and highlights
- **Secondary**: Supporting color for backgrounds and subtle elements
- **Muted**: Text and icon colors with reduced opacity
- **Accent**: Special highlights and interactive elements
- **Destructive**: Error states and dangerous actions

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable, accessible contrast
- **Captions**: Subtle, informative text

### Spacing
- Consistent 4px grid system
- Responsive spacing that adapts to screen size
- Proper visual hierarchy through spacing

## 🌙 Dark Mode Best Practices

1. **Contrast**: Ensure sufficient contrast in both themes
2. **Colors**: Avoid pure black/white, use near-black/near-white
3. **Images**: Consider different images for light/dark themes
4. **Testing**: Test all components in both modes

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 📱 Responsive Theming

The theme system works seamlessly across all device sizes:
- Mobile-optimized theme switcher
- Touch-friendly color selection
- Consistent theming across breakpoints

## 🧪 Testing

The application includes:
- Form validation for all input fields
- Error handling for edge cases
- Loading states for better UX
- Responsive design testing across devices

## 📱 Mobile Optimization

- Touch-friendly button sizes (minimum 44px)
- Swipe gestures support
- Optimized form layouts for mobile keyboards
- Responsive grid layouts

## 🔒 Security Considerations

- Input validation and sanitization
- XSS protection through React's built-in escaping
- CSRF protection for form submissions
- Secure data handling practices

## 🎨 Design Decisions

### Color Scheme
- Primary: Blue tones for trust and professionalism
- Success: Green for positive actions
- Warning: Yellow for caution states
- Error: Red for destructive actions

### Typography
- Inter font family for excellent readability
- Consistent font sizes and weights
- Proper line heights for accessibility

### Layout
- Card-based design for easy scanning
- Consistent spacing using Tailwind's spacing scale
- Clear visual hierarchy with proper contrast

## 🔄 Future Enhancements

- [ ] Integration with real backend API
- [ ] Advanced reporting and analytics
- [ ] Bulk operations for teachers
- [ ] Export functionality (PDF, CSV)
- [ ] Email notifications
- [ ] Role-based access control
- [ ] Advanced search with filters
- [ ] Teacher scheduling integration
- [ ] Performance analytics
- [ ] Dark mode support

## 🔄 Future Theme Enhancements

- [ ] High contrast mode for accessibility
- [ ] Custom color picker
- [ ] Theme scheduling (auto dark mode at night)
- [ ] More color theme options
- [ ] Theme import/export functionality
- [ ] Per-component theme overrides

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/new-feature\`
3. Commit your changes: \`git commit -am 'Add new feature'\`
4. Push to the branch: \`git push origin feature/new-feature\`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icon library

## 📞 Support

If you have any questions or need help with the project, please:
1. Check the documentation above
2. Search existing issues on GitHub
3. Create a new issue with detailed information
4. Contact the development team

---

**Live Demo**: [Your Vercel/Netlify URL here]
**Repository**: [Your GitHub repository URL here]
**Video Walkthrough**: [Your Loom video URL here]
