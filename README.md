# PulseBoard 📊

Production-grade SaaS analytics dashboard built to simulate real product environments.

PulseBoard is a system-level frontend engineering showcase designed to demonstrate dashboard architecture, data visualization, and SaaS interface development.

This project is part of the GigDevOS capability lab. Created to replace NDA-protected client dashboards with anonymized product demonstrations.

---

## ✨ Overview

PulseBoard replicates the internal dashboard experience of a modern SaaS platform.

It showcases how product teams monitor metrics, manage users, analyze growth, and operate subscription systems within a unified interface.

The project focuses on:

• Product dashboard design
• Analytics visualization
• User management systems
• Billing interfaces
• Operational reporting UI

---

## 🎯 Purpose

Many production dashboards cannot be publicly shared due to NDAs.

PulseBoard exists to demonstrate:

• Real-world dashboard engineering
• Data-heavy UI architecture
• Component system scalability
• Product-grade interface design

It serves as a flagship demo for freelance and gig capability positioning.

---

## 🧠 Product Modules

---

### Overview Dashboard

• KPI performance cards
• Revenue analytics
• Traffic sources
• Activity feeds
• Product performance tables

---

### Analytics

• Growth charts
• Funnel visualization
• Retention graphs
• Date range filtering
• Comparative analytics

---

### Users Management

• User directory
• Role tagging
• Status badges
• Search & filters
• Pagination systems

---

### Billing Dashboard

• Monthly recurring revenue
• Plan distribution
• Invoice tables
• Payment tracking

---

### Reports

• Exportable datasets
• Download tracking
• Date-based reporting

---

### Settings

• Profile configuration
• Workspace setup
• Notification preferences
• Security controls

---

## 🛠 Tech Stack

### Core

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)

### Visualization

- **Charts**: [Recharts 3.7.0](https://recharts.org/)
- **Export**: [html2canvas 1.4.1](https://html2canvas.hertzen.com/)

### Icons & UI

- **Icons**: [Lucide React](https://lucide.dev/)

### Development

- **Linting**: ESLint with Next.js config
- **Package Manager**: pnpm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: 18.x or higher
- **pnpm**: 8.x or higher ([Install pnpm](https://pnpm.io/installation))

## 🎨 Design System

PulseBoard follows a modern SaaS interface language.

### Visual Traits

• Dark-first UI
• Glassmorphism cards
• Subtle borders
• Grid overlays
• Gradient accents

Built to feel production-ready, not template-based.

---

## 📊 Data Layer

All metrics use realistic mock datasets.

Examples include:

• Revenue growth
• User acquisition
• Subscription tiers
• Engagement metrics

No lorem ipsum or placeholder analytics.

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dchobarkar/pulseboard.git
   cd pulseboard
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Building for Production

### Build the application

```bash
pnpm build
```

### Start the production server

```bash
pnpm start
```

### Run linting

```bash
pnpm lint
```

## 📂 Project Structure

```structure
pulseboard/
├── app/                      # Next.js App Router pages
│   ├── (dashboard)/         # Dashboard routes
│   │   ├── analytics/       # Analytics page
│   │   ├── billing/         # Billing page
│   │   ├── reports/         # Reports page
│   │   ├── settings/        # Settings page
│   │   ├── users/           # Users management
│   │   └── profile/         # User profile
│   ├── logged-out/          # Logged out state
│   └── logout/              # Logout flow
├── components/              # React components
│   ├── charts/              # Chart components
│   ├── layout/              # Layout components
│   └── ui/                  # Reusable UI components
├── data/                    # Data layer
│   ├── analytics.ts         # Analytics data
│   ├── billing.ts           # Billing data
│   ├── constants.ts         # App constants
│   ├── navigation.ts        # Navigation config
│   ├── overview.ts          # Overview data
│   ├── reports.ts           # Reports data
│   ├── settings.ts          # Settings data
│   ├── types.ts             # TypeScript types
│   └── users.ts             # User data
├── hooks/                   # Custom React hooks
│   └── useKeyboardShortcuts.ts
├── lib/                     # Utility functions
│   └── export.ts            # Export utilities
├── LICENSE                  # MIT License
└── README.md               # This file
```

## ⌨️ Keyboard Shortcuts

- **`/`** or **`⌘K`** / **`Ctrl+K`**: Focus search
- **`G + U`**: Navigate to Users
- **`G + A`**: Navigate to Analytics
- **`G + B`**: Navigate to Billing
- **`G + R`**: Navigate to Reports
- **`G + S`**: Navigate to Settings
- **`?`**: Show keyboard shortcuts help

## 📊 Performance

- **Lighthouse Score**: Target 85+ across all metrics
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Charts loaded on demand
- **Optimized Bundles**: Tree-shaking and minification
- **Memoization**: React.memo and useMemo for performance optimization

## 🔧 Configuration

### Environment Variables

Currently, no environment variables are required. The application uses mock data stored in the `data/` directory.

### TypeScript Configuration

The project uses strict TypeScript configuration with path aliases:

- `@/*` maps to the project root

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contributing Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Support

If you found this project helpful, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation

## 🔗 Links

- **Repository**: [GitHub](https://github.com/dchobarkar/pulseboard)
- **Issues**: [GitHub Issues](https://github.com/dchobarkar/pulseboard/issues)
- **License**: [MIT License](LICENSE)

---

_PulseBoard is designed to simulate real-world SaaS product environments without exposing proprietary client data._
