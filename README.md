Skip Selector - React Application

A modern, responsive React application for selecting skip sizes with a completely redesigned user interface. Built with TypeScript, Tailwind CSS, and modern React patterns.

## 🚀 Features

- **Modern Design**: Completely redesigned interface with clean, professional aesthetics
- **Fully Responsive**: Optimized for both mobile and desktop experiences
- **Real-time API Integration**: Fetches skip data from the WeWantWaste API
- **Interactive Progress Stepper**: Visual progress indicator showing current step
- **Advanced Filtering & Sorting**: Filter by size and sort by price or size
- **Smooth Animations**: Hover effects, transitions, and loading states
- **TypeScript**: Full type safety and better developer experience
- **Accessible**: Built with accessibility best practices

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls
- **Modern CSS Grid & Flexbox** for layouts

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd skip-selector
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ProgressStepper.tsx    # Progress indicator component
│   ├── SkipCard.tsx          # Individual skip card component
│   └── SkipSelector.tsx      # Main skip selector component
├── services/
│   └── api.ts               # API service with mock data fallback
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx                  # Main app component
├── index.tsx               # App entry point
└── index.css               # Global styles with Tailwind imports
```

## 🎨 Design Features

### Visual Improvements

- **Card-based Layout**: Modern card design with hover effects and shadows
- **Color Scheme**: Professional blue and yellow color palette
- **Typography**: Inter font for better readability
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Rounded Corners**: Modern rounded corners throughout the interface

### User Experience

- **Loading States**: Spinner animation while fetching data
- **Error Handling**: Graceful error handling with retry functionality
- **Selection Feedback**: Clear visual feedback for selected items
- **Responsive Grid**: Adaptive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
- **Smooth Transitions**: All interactions have smooth animations

### Mobile Optimization

- **Touch-friendly**: Large touch targets for mobile devices
- **Responsive Typography**: Text scales appropriately on different screen sizes
- **Mobile Navigation**: Optimized button placement for mobile use
- **Horizontal Scrolling**: Progress stepper scrolls horizontally on small screens

## 🔧 API Integration

The application integrates with the WeWantWaste API:

- **Endpoint**: `https://app.wewantwaste.co.uk/api/skips/by-location`
- **Parameters**: `postcode=NR32&area=Lowestoft`
- **Fallback**: Mock data is used if the API is unavailable

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px (1 column grid)
- **Tablet**: 768px - 1024px (2 column grid)
- **Desktop**: > 1024px (3 column grid)

## 🎯 Key Components

### SkipSelector

Main component that orchestrates the entire skip selection process:

- Fetches skip data from API
- Manages selection state
- Handles filtering and sorting
- Provides navigation controls

### SkipCard

Individual skip display component featuring:

- Skip image with gradient background
- Price and details display
- Selection state management
- Hover effects and animations

### ProgressStepper

Visual progress indicator showing:

- Current step in the process
- Completed steps with checkmarks
- Responsive horizontal scrolling

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 🎨 Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: { /* Blue shades */ },
  secondary: { /* Yellow shades */ }
}
```

### Animations

Custom animations are defined in the Tailwind config:

- `fade-in`: Smooth fade-in effect
- `slide-up`: Slide up animation

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created for demonstration purposes as part of a job interview submission.

## 👨‍💻 Development Notes

This application was built with modern React best practices:

- Functional components with hooks
- TypeScript for type safety
- Responsive design principles
- Accessibility considerations
- Clean, maintainable code structure

The design completely reimagines the original skip selection interface while maintaining all core functionality and improving the user experience significantly.
